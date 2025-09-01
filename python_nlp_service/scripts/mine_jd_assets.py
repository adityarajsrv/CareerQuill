#!/usr/bin/env python3
import re, json, unicodedata
from pathlib import Path
from collections import Counter, defaultdict
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config"
DATASET_PATHS = [
    ROOT / "datasets" / "matching" / "resume_job_matching_dataset.csv",
    Path("/mnt/data/resume_job_matching_dataset.csv")  # fallback
]

# Inputs
SKILL_MAP_PATH = CONFIG / "skills_map_final.json"
ATS_SUPP_PATH  = CONFIG / "ats_supplement.json"
HEADINGS_PATH  = CONFIG / "jd_headings.json"
NEG_PATH       = CONFIG / "negation_phrases.json"

# Outputs
AUTO_SUPP_PATH   = CONFIG / "ats_supplement_auto.json"
UNKNOWN_TERMS    = CONFIG / "jd_unknown_terms.json"
PHRASE_STATS_OUT = CONFIG / "jd_phrase_stats.json"

# Heuristics
MIN_JD_FREQ   = 30
MIN_COOC_FREQ = 20
LIFT_THRESH   = 1.8
MAX_WORDS     = 5

# Basic filters
BLACKLIST = {
    "experience","knowledge","familiarity","proficient","months","month","years","year",
    "tools","technology","technologies","project","projects","responsibilities","requirements",
    "about","benefits","company","candidate","role","position","stack","semester","cgpa"
}
SHORT_WHITELIST = {
    "c","c++","c#","go","js","ts","py","r","php","sql","nlp","ml","cv","ai",
    "ui","ux","jwt","etl","db","dbms","api","http","tcp","udp","ssh","dns",
    "ip","vpn","tls","ssl","aws","gcp","oci","ci","cd","oop"
}
TOKEN_OK = re.compile(r"^[A-Za-z0-9.+#/\- ]+$")

def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", s).lower().strip()
    s = s.replace("•","-").replace("–","-").replace("—","-")
    s = re.sub(r"\s+"," ", s)
    return s

def is_good_ngram(g):
    if not g: return False
    if not TOKEN_OK.match(g): return False
    if g in BLACKLIST: return False
    if len(g) <= 3 and g not in SHORT_WHITELIST: return False
    if len(g.split()) > MAX_WORDS: return False
    if g.isdigit(): return False
    return True

def gen_ngrams(text, nmax=4):
    toks = [t for t in re.findall(r"[A-Za-z0-9.+#/\-]+", text)]
    toks = [t for t in toks if t.lower() not in BLACKLIST]
    out = []
    for n in range(1, nmax+1):
        for i in range(0, len(toks)-n+1):
            g = " ".join(toks[i:i+n])
            g = norm(g)
            if is_good_ngram(g):
                out.append(g)
    return out

def load_dataset():
    for p in DATASET_PATHS:
        if p.exists():
            return pd.read_csv(p, encoding="utf-8", low_memory=False)
    raise FileNotFoundError("resume_job_matching_dataset.csv not found")

def main():
    df = load_dataset().dropna(subset=["job_description","resume","match_score"])
    df["match_score"] = df["match_score"].astype(float)

    # Load known skills
    skill_map = json.loads(SKILL_MAP_PATH.read_text(encoding="utf-8")) if SKILL_MAP_PATH.exists() else {}
    ats_supp  = json.loads(ATS_SUPP_PATH.read_text(encoding="utf-8")) if ATS_SUPP_PATH.exists() else {}
    known_all = {k.lower() for k in skill_map.keys()} | {k.lower() for k in skill_map.values()}
    for cat in ats_supp.values():
        known_all |= {norm(k) for k in cat}

    hi = df[df["match_score"] >= 4.0]
    lo = df[df["match_score"] <= 2.0]

    jd_freq, jd_hi, jd_lo, resume_hi_freq = Counter(), Counter(), Counter(), Counter()

    for _, row in df.iterrows():
        jd = norm(str(row["job_description"]))
        res = norm(str(row["resume"]))
        score = row["match_score"]

        jd_terms = set(gen_ngrams(jd))
        for g in jd_terms:
            jd_freq[g] += 1
            (jd_hi if score >= 4 else jd_lo)[g] += 1

        if score >= 4:
            for g in set(gen_ngrams(res)):
                resume_hi_freq[g] += 1

    phrase_stats, candidates = [], []
    for g, f in jd_freq.items():
        if f < MIN_JD_FREQ:
            continue
        p_hi = jd_hi[g] / f
        p_lo = jd_lo[g] / f if f else 0.0001
        lift = (p_hi + 1e-6) / (p_lo + 1e-6)
        cooc = resume_hi_freq[g]
        phrase_stats.append({"term": g, "jd_freq": int(f), "hi": int(jd_hi[g]),
                             "lo": int(jd_lo[g]), "lift": float(lift), "res_hi_cooc": int(cooc)})
        if lift >= LIFT_THRESH and cooc >= MIN_COOC_FREQ and g not in known_all:
            candidates.append(g)

    TOOLS_HINT = {"studio","code","notebook","postman","jenkins","tableau","figma","intellij","pycharm","jupyter","vscode","visual studio","matlab","excel","power bi","jira","confluence"}
    CERT_HINT  = {"aws certified","azure fundamentals","gcp","pmp","itil","scrum master","ceh","ccna","oca","oci","cka","ckad"}
    SOFT_HINT  = {"communication","problem solving","stakeholder","leadership","collaboration","ownership","mentoring","time management","attention to detail","analytical","adaptability","negotiation","presentation","documentation"}

    supplement = defaultdict(list)
    for term in sorted(candidates, key=lambda x: (-resume_hi_freq[x], -jd_hi[x], x)):
        if any(h in term for h in CERT_HINT):
            supplement["certs"].append(term)
        elif any(h in term for h in TOOLS_HINT):
            supplement["tools"].append(term)
        elif any(h in term for h in SOFT_HINT):
            supplement["soft"].append(term.title())
        else:
            supplement["tech"].append(term)

    AUTO_SUPP_PATH.write_text(json.dumps(supplement, indent=2, ensure_ascii=False), encoding="utf-8")
    UNKNOWN_TERMS.write_text(json.dumps(sorted(set(candidates)), indent=2, ensure_ascii=False), encoding="utf-8")
    PHRASE_STATS_OUT.write_text(json.dumps(sorted(phrase_stats, key=lambda x: (-x["lift"], -x["jd_freq"]))[:2000], indent=2), encoding="utf-8")

    # Expand JD headings & negations
    expanded_headings = {
        "required": ["requirements","must have","qualifications","what you'll need","what you will need","skills required","necessary skills","mandatory skills","essential skills"],
        "preferred": ["preferred","nice to have","good to have","bonus","desirable","pluses","advantageous","preferred qualifications"],
        "neutral": ["responsibilities","what you'll do","about","benefits","role","position","about us","day to day","tasks","key responsibilities"]
    }
    expanded_negations = ["not required","no need","optional","nice to have","good to have","preferred but not required","not mandatory","not essential"]

    HEADINGS_PATH.write_text(json.dumps(expanded_headings, indent=2), encoding="utf-8")
    NEG_PATH.write_text(json.dumps(expanded_negations, indent=2), encoding="utf-8")

    print(f"✅ Wrote {AUTO_SUPP_PATH.name} (tech={len(supplement['tech'])}, tools={len(supplement['tools'])}, soft={len(supplement['soft'])}, certs={len(supplement['certs'])})")
    print(f"📈 Wrote top phrase stats → {PHRASE_STATS_OUT.name}")
    print(f"🔎 Review unknowns → {UNKNOWN_TERMS.name}")
    print(f"📝 Updated {HEADINGS_PATH.name} & {NEG_PATH.name}")

if __name__ == "__main__":
    main()
