import re, json, unicodedata
from pathlib import Path
from typing import Dict, List, Set, Tuple

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config"

# Config paths
SKILL_MAP_PATH = CONFIG / "skills_map_final.json"
ATS_SUPP_PATH  = CONFIG / "ats_supplement.json"
HEADINGS_PATH  = CONFIG / "jd_headings.json"
NEGATIONS_PATH = CONFIG / "negation_phrases.json"
ROLES_PATH     = CONFIG / "role_titles.json"
SOFT_SKILLS_PATH = CONFIG / "soft_skills.json"
DOMAINS_PATH     = CONFIG / "domains.json"
CERTS_PATH       = CONFIG / "certifications.json"

# --- Load JSON safely ---
def _load_json(p: Path, default):
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return default

# --- Load all assets ---
skill_map = _load_json(SKILL_MAP_PATH, {})
supp_map  = _load_json(ATS_SUPP_PATH, {})
skill_map.update(supp_map)

headings  = _load_json(HEADINGS_PATH, {
    "required": ["requirements","must have","qualifications","experience in","skills in"],
    "preferred": ["preferred","nice to have","bonus","good to have"],
    "neutral": ["responsibilities","what you'll do","about","benefits"]
})
negations = set(_load_json(NEGATIONS_PATH, ["not required","no need","optional","nice to have"]))
roles_map = _load_json(ROLES_PATH, {
    "titles": [
        "software engineer","frontend engineer","backend engineer","full stack developer",
        "data scientist","machine learning engineer","ml engineer","devops engineer",
        "cloud engineer","data analyst","product manager","qa engineer","mobile developer"
    ],
    "seniority": ["junior","mid","senior","lead","principal","staff"]
})
soft_skills_list = _load_json(SOFT_SKILLS_PATH, [])
domains_list     = _load_json(DOMAINS_PATH, [])
certifications_list = _load_json(CERTS_PATH, [])

BOUNDARY = r"(?<![A-Za-z0-9.+#/-]){q}(?![A-Za-z0-9.+#/-])"

# --- Helpers ---
def normalize(text: str) -> str:
    t = unicodedata.normalize("NFKC", text)
    t = t.replace("•","-").replace("–","-").replace("—","-")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\r", "\n", t)
    t = re.sub(r"\n{2,}", "\n\n", t)
    return t.strip()

def sectionize(text: str) -> List[Tuple[str,str]]:
    """Split text into (strength, section_text) tuples"""
    blocks = []
    lines = text.split("\n")
    current_label = None
    current_block = []

    for line in lines:
        low = line.lower()
        found_label = None
        for strength, keys in headings.items():
            if any(k in low for k in keys):
                found_label = strength
                break
        if found_label:
            if current_block:
                blocks.append((current_label or "neutral", "\n".join(current_block).strip()))
                current_block = []
            current_label = found_label
        else:
            current_block.append(line)

    if current_block:
        blocks.append((current_label or "neutral", "\n".join(current_block).strip()))

    # fallback if all neutral
    if all(lbl == "neutral" for lbl, _ in blocks):
        new_blocks = []
        for lbl, txt in blocks:
            if re.search(r"(experience in|with (skills|experience) in|knowledge of)", txt, flags=re.I):
                new_blocks.append(("required", txt))
            else:
                new_blocks.append((lbl, txt))
        return new_blocks
    return blocks

variants = sorted(set(skill_map.keys()), key=len, reverse=True)

def _find_skills(line: str) -> Set[str]:
    found = set()
    for v in variants:
        if re.search(BOUNDARY.format(q=re.escape(v)), line, flags=re.I):
            found.add(skill_map.get(v, v))
    return found

def _extract_years(line: str) -> List[int]:
    nums = []
    for m in re.finditer(r"(\d{1,2})(\+)?\s*(?:years|yrs)", line, flags=re.I):
        nums.append(int(m.group(1)))
    for m in re.finditer(r"(\d{1,2})\s*-\s*(\d{1,2})\s*(?:years|yrs)", line, flags=re.I):
        nums.extend([int(m.group(1)), int(m.group(2))])
    return nums

def _detect_role(text: str) -> Tuple[str,str]:
    role, seniority = None, None
    low = text.lower()
    for s in roles_map["seniority"]:
        if re.search(rf"\b{s}\b", low):
            seniority = s.title()
            break
    for t in roles_map["titles"]:
        if re.search(rf"\b{re.escape(t)}\b", low):
            role = t.title()
            break
    # canonical mapping for ML
    if role is None and "ml engineer" in low:
        role = "Machine Learning Engineer"
    return role, seniority

# --- Main parser ---
def parse_jd(text: str) -> Dict:
    raw = normalize(text)
    buckets = {"required": {"tech": set(), "tools": set(), "soft": set(), "certs": set(), "domains": set()},
               "preferred": {"tech": set(), "tools": set(), "soft": set(), "certs": set(), "domains": set()},
               "neutral": {"tech": set(), "tools": set(), "soft": set(), "certs": set(), "domains": set()}}
    overall_years = []
    by_skill = {}

    role, seniority = _detect_role(raw)

    for strength, block in sectionize(raw):
        for line in re.split(r"\n|[-•*]\s+", block):
            l = line.strip()
            if not l: 
                continue

            neg = any(n in l.lower() for n in negations)
            s = "preferred" if neg and strength == "required" else strength

            tech_hits = _find_skills(l)

            # classify tools
            tool_hits = {x for x in tech_hits if x.lower() in {
                "vs code","visual studio code","pycharm","jupyter notebook","intellij idea",
                "postman","tableau","power bi","git","github","gitlab","jenkins","docker","kubernetes","airflow"
            }}
            tech_hits = tech_hits - tool_hits

            # classify soft
            soft_hits = {x for x in tech_hits if x.lower() in map(str.lower, soft_skills_list)}
            tech_hits = tech_hits - soft_hits

            # certifications
            cert_hits = {x for x in tech_hits if x in certifications_list or "certified" in x.lower() or "foundation" in x.lower()}
            tech_hits = tech_hits - cert_hits

            # domains
            domain_hits = {x for x in tech_hits if x.lower() in map(str.lower, domains_list)}
            tech_hits = tech_hits - domain_hits

            yrs = _extract_years(l)
            overall_years += yrs
            for sk in tech_hits:
                if yrs:
                    by_skill.setdefault(sk, {"min": None})
                    by_skill[sk]["min"] = min(yrs) if by_skill[sk]["min"] is None else min(by_skill[sk]["min"], min(yrs))

            buckets[s]["tech"].update(tech_hits)
            buckets[s]["tools"].update(tool_hits)
            buckets[s]["soft"].update(soft_hits)
            buckets[s]["certs"].update(cert_hits)
            buckets[s]["domains"].update(domain_hits)

    return {
        "role": role,
        "seniority": seniority,
        "locations": [],
        "remote": None,
        "employment_type": None,
        "salary": None,
        "experience": {
            "overall_min_years": min(overall_years) if overall_years else None,
            "by_skill": by_skill
        },
        "skills": {k: {sub: sorted(v) for sub,v in buckets[k].items()} for k in buckets},
        "notes": {"raw_sections": {}, "source": "text"}
    }
