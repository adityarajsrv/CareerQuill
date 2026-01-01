# python_nlp_service/modules/resume_parser.py
import re
import json
import fitz  # PyMuPDF
import docx
from pathlib import Path
from collections import defaultdict
from typing import List, Dict

# ------------------ PATHS & CONFIG LOAD ------------------
BASE_DIR = Path(__file__).resolve().parent.parent  # python_nlp_service/

with open(BASE_DIR / "config/skills_map_final.json", "r", encoding="utf-8") as f:
    SKILLS_MAP = json.load(f)

with open(BASE_DIR / "config/synonym_skills.json", "r", encoding="utf-8") as f:
    SKILL_SYNONYMS = json.load(f)

# optional: canonical certs list (used to normalize certs)
try:
    with open(BASE_DIR / "config/certifications.json", "r", encoding="utf-8") as f:
        CERTIFICATIONS_LIST = [c.lower() for c in json.load(f)]
except Exception:
    CERTIFICATIONS_LIST = []

# ------------------ OPTIONAL: light NLP (spaCy) ------------------
try:
    import spacy  # type: ignore
    _NLP = spacy.load("en_core_web_sm")
    NLP_AVAILABLE = True
except Exception:
    _NLP = None
    NLP_AVAILABLE = False

# ------------------ TEXT + LAYOUT + IMAGE EXTRACTION ------------------
def extract_pdf_data(pdf_path: str, preserve_layout: bool = True) -> Dict:
    """
    Single-pass PDF read that returns:
      { "text": <joined text>, "blocks": [ {page, x0,y0,x1,y1, text} ... ],
        "images": [ {page, xref, ext, w,h} ... ], "page_count": n }
    Uses 'blocks' to preserve spatial ordering (helps 2-column/resume layouts).
    """
    doc = fitz.open(pdf_path)
    blocks_all = []
    pages_text = []
    images_meta = []

    for pno, page in enumerate(doc):
        try:
            blocks = page.get_text("blocks")
        except Exception:
            blocks = []

        # Sort blocks (tolerant to floats + rounding noise)
        if blocks:
            blocks_sorted = sorted(blocks, key=lambda b: (round(b[1], 1), round(b[0], 1)))
            page_text_parts = []
            for b in blocks_sorted:
                txt = b[4] if len(b) > 4 else ""
                if isinstance(txt, str) and txt.strip():
                    page_text_parts.append(txt.strip())
                blocks_all.append({
                    "page": pno + 1,
                    "x0": float(b[0]),
                    "y0": float(b[1]),
                    "x1": float(b[2]),
                    "y1": float(b[3]),
                    "text": txt.strip() if isinstance(txt, str) else str(txt)
                })
            pages_text.append("\n".join(page_text_parts).strip())
        else:
            # fallback plain text
            try:
                t = page.get_text("text") or ""
                pages_text.append(t.strip())
            except Exception:
                pages_text.append("")

        # images metadata (skip heavy extraction)
        try:
            for img in page.get_images(full=True):
                xref = img[0]
                try:
                    img_meta = doc.extract_image(xref)
                    images_meta.append({
                        "page": pno + 1,
                        "xref": xref,
                        "ext": img_meta.get("ext"),
                        "width": img_meta.get("width"),
                        "height": img_meta.get("height")
                    })
                except Exception:
                    images_meta.append({"page": pno + 1, "xref": xref})
        except Exception:
            pass

    text = "\n".join(pages_text).strip()
    return {"text": text, "blocks": blocks_all, "images": images_meta, "page_count": len(doc)}

def extract_text_from_docx(docx_path: str) -> str:
    try:
        doc = docx.Document(docx_path)
        return "\n".join([p.text for p in doc.paragraphs])
    except Exception:
        return ""

# ------------------ CLEANING ------------------
def clean_text(text: str) -> str:
    if not text:
        return ""
    text = text.replace("\u200b", "")
    text = re.sub(r"[ \t]+", " ", text)  # collapse spaces but preserve newlines
    text = re.sub(r'\r\n?', '\n', text)
    text = "\n".join([ln.rstrip() for ln in text.splitlines()])
    # NEW: normalize unicode dashes
    text = text.replace("–", "-").replace("—", "-")
    return text.strip()

# ------------------ CONTACT INFO EXTRACTION ------------------
CONTACT_PATTERNS = {
    "email": re.compile(r'[\w\.-]+@[\w\.-]+\.\w+'),
    "phone": re.compile(r'(\+?\d[\d\s\-\(\)]{7,}\d)'),
    "linkedin": re.compile(r'(linkedin\.com/in/[A-Za-z0-9\-_]+)', re.I),
    "github": re.compile(r'(github\.com/[A-Za-z0-9\-_]+)', re.I),
    "portfolio": re.compile(r'(?:https?:\/\/)?(?:www\.)?[A-Za-z0-9\-]+\.(?:dev|me|io|tech)', re.I)
}

def extract_contact_info(text: str) -> Dict:
    contact = {}
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    header_snippet = "\n".join(lines[:12]) if lines else text

    for k, p in CONTACT_PATTERNS.items():
        m = p.search(header_snippet) or p.search(text)
        if m:
            contact[k] = m.group(0).strip()

    # Name detection
    name = None
    if NLP_AVAILABLE:
        try:
            doc = _NLP(header_snippet)
            for ent in doc.ents:
                if ent.label_ == "PERSON":
                    name = ent.text.strip()
                    break
        except Exception:
            pass
    if not name and lines:
        candidate = lines[0]
        if len(candidate.split()) <= 4 and not re.search(r'\d', candidate):
            if not re.search(r'resume|curriculum|cv', candidate, re.I):
                name = candidate
    if name:
        contact["name"] = name

    return contact

# ------------------ SECTION PARSING (unchanged but more tolerant) ------------------
SECTION_PATTERNS = {
    "summary": re.compile(r"\b(summary|professional summary|profile|about me|overview)\b", re.I),
    "skills": re.compile(r"\b(technical\W*skills|skills|core competencies|technical summary|technical expertise|key skills)\b", re.I),
    "experience": re.compile(r"\b(experience|work experience|professional experience|employment history|employment)\b", re.I),
    "projects": re.compile(r"\b(projects?|academic projects|key projects|personal projects|opensource projects|open-source projects|side projects)\b", re.I),
    "education": re.compile(r"\b(education|academic background|qualifications|educational background|education & qualifications)\b", re.I),
    "certifications": re.compile(r"\b(certifications?|licenses?|certificates|courses)\b", re.I),
    "achievements": re.compile(r"\b(achievements?|awards|honors|accomplishments|notable achievements)\b", re.I),
    "publications": re.compile(r"\b(publications)\b", re.I),
    "experience_alt": re.compile(r"\b(employment|professional profile|professional background)\b", re.I),
}

# common bullets (kept)
BULLET_CHARS = "-\u2022\u2023\u25E6\u2043\u2219\u00B7\u25B8\u25B6\u2192\u27A2*•·▪◦»›"
_LEADING_BULLET_RE = re.compile(rf'^[\s{re.escape(BULLET_CHARS)}\d\.\)\:]+', re.UNICODE)

# ------------------ SECTION PARSING (MODIFIED: robust to headers on same-line) ------------------
def parse_resume_sections(text: str) -> Dict:
    """
    Returns sections dictionary with '__sections_lines' for debugging and downstream use.
    Does not alter content; preserves line ordering produced by layout-aware extraction.
    """
    lines = [ln.rstrip() for ln in text.splitlines()]
    sections_lines = defaultdict(list)
    current = None
    for ln in lines:
        stripped = ln.strip()
        if not stripped:
            continue

        matched = None
        match_obj = None
        for name, pattern in SECTION_PATTERNS.items():
            m = pattern.search(stripped)
            if m:
                matched = name
                match_obj = m
                break

        if matched:
            after = stripped[match_obj.end():].strip(" :\t-–—")
            current = matched
            if after:
                sections_lines[current].append(after)
            else:
                # ensure section exists
                sections_lines[current] = sections_lines.get(current, [])
        elif current:
            sections_lines[current].append(stripped)
        else:
            # preamble lines (header area)
            sections_lines["preamble"].append(stripped)

    sections = {}
    for k, v in sections_lines.items():
        sections[k] = "\n".join(v).strip()
    sections["__sections_lines"] = sections_lines
    return sections

# ------------------ BULLET / POINT HANDLING (kept & improved) ------------------
def split_to_points(section_text: str) -> List[str]:
    """
    Robust bullet splitting: removes leading bullet chars, numbering, and joins
    multi-segment lines. Returns list of cleaned points.
    """
    if not section_text:
        return []
    pts = []
    for ln in section_text.splitlines():
        s = ln.strip()
        if not s:
            continue
        # remove leading bullets/nums: "1.", "a)", "-", "•", etc.
        s = _LEADING_BULLET_RE.sub("", s).strip()
        # if the line contains multiple bullets inline (e.g., "• A  • B"), split them
        # split by repeated bullet characters sequences
        inline_parts = re.split(rf'[{re.escape(BULLET_CHARS)}]\s*', s)
        for part in inline_parts:
            p = part.strip()
            if p:
                pts.append(p)
    return pts

# ------------------ PROJECT-LIKE LINE DETECTION (kept & extended) ------------------
_PROJECT_VERB_RE = re.compile(
    r'\b(built|developed|implemented|designed|trained|deployed|created|engineer(?:ed)?|optimi[sz]ed|reduced|increased|achieved|evaluated|predicted|extracted|parsed|recognized|improved|built|constructed)\b',
    re.I
)
_PROJECT_TECH_RE = re.compile(
    r'\b(python|tensorflow|pytorch|keras|opencv|scikit|sklearn|dataset|accuracy|precision|recall|model|github|repo|api|docker|flask|django|react|node|aws|gcp|azure|sql|mongodb|opencv)\b',
    re.I
)
_PROJECT_NUMBER_RE = re.compile(r'\d+%?|\d+\.\d+')

def is_project_like(line: str) -> bool:
    ln = line or ""
    if 'project' in ln.lower():
        return True
    has_verb = bool(_PROJECT_VERB_RE.search(ln))
    has_tech = bool(_PROJECT_TECH_RE.search(ln))
    has_number = bool(_PROJECT_NUMBER_RE.search(ln))
    if has_verb and (has_tech or has_number):
        return True
    if has_tech and has_number:
        return True
    if re.search(r'github\.com\/[A-Za-z0-9\-_]+', ln, re.I):
        return True
    return False

# ------------------ DATE / TIMELINE EXTRACTION (NEW & improved) ------------------
# months mapping for flexible matching
_MONTHS = r"(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
DATE_RANGE_RE = re.compile(
    rf'(?P<start>(?:{_MONTHS}\s*\d{{4}}|\d{{4}}))\s*(?:-|–|—|to|until)\s*(?P<end>(?:Present|Current|Now|{_MONTHS}\s*\d{{4}}|\d{{4}}))',
    re.I
)
YEAR_RANGE_RE = re.compile(r'(?P<start>\d{4})\s*[-–—]\s*(?P<end>\d{4}|Present|Current)', re.I)

def extract_experience_timeline(text: str) -> List[Dict]:
    """
    Returns list of date-range dicts found in the text.
    """
    if not text:
        return []
    ranges = []
    for m in DATE_RANGE_RE.finditer(text):
        ranges.append({"start": m.group("start"), "end": m.group("end"), "raw": m.group(0)})
    for m in YEAR_RANGE_RE.finditer(text):
        ranges.append({"start": m.group("start"), "end": m.group("end"), "raw": m.group(0)})
    # de-duplicate by raw
    uniq = []
    seen = set()
    for r in ranges:
        if r["raw"] not in seen:
            uniq.append(r)
            seen.add(r["raw"])
    return uniq

# ------------------ EXPERIENCE ENTRY PARSING (NEW) ------------------
def extract_experience_entries(exp_text: str) -> List[Dict]:
    """
    Heuristic grouping of experience into entries.
    - Splits by bullet/points, uses date tokens to start new entry.
    - Tries to extract title/company from header lines.
    """
    if not exp_text:
        return []
    pts = split_to_points(exp_text) or [ln.strip() for ln in exp_text.splitlines() if ln.strip()]
    entries = []
    current = None

    for ln in pts:
        # if line contains date-range -> start new entry
        date_m = DATE_RANGE_RE.search(ln) or YEAR_RANGE_RE.search(ln)
        if date_m:
            # start new entry
            if current:
                entries.append(current)
            start = date_m.group("start")
            end = date_m.group("end") if date_m.groups() >= 2 else ""
            header = ln
            # header could include role/company before date; split before date token
            before_date = ln[:date_m.start()].strip()
            current = {"header": header, "start": start, "end": end, "details": []}
            if before_date:
                current["title_company_hint"] = before_date
            else:
                current["title_company_hint"] = ""
        else:
            # if this line looks like a role/company (e.g., "Software Engineer — Company"), treat as header
            if re.search(r'—|-|@|\|', ln) and len(ln.split()) <= 8:
                # start new entry
                if current:
                    entries.append(current)
                current = {"header": ln, "start": "", "end": "", "details": [], "title_company_hint": ln}
            else:
                if not current:
                    # create a loose entry
                    current = {"header": "", "start": "", "end": "", "details": [ln], "title_company_hint": ""}
                else:
                    current["details"].append(ln)
    if current:
        entries.append(current)

    # postprocess: join details into strings
    for e in entries:
        e["details"] = "\n".join(e.get("details", [])).strip() if e.get("details") else ""
    return entries

# ------------------ SKILLS / EDUCATION / CERTS (kept & robust) ------------------
def extract_skills_from_text(text: str) -> List[str]:
    """
    Use SKILL_SYNONYMS and SKILLS_MAP for canonical extraction (unchanged approach).
    Uses word-boundary tolerant matching to capture C++, Node.js, etc.
    """
    text_lower = (text or "").lower()
    found = set()
    for canonical, variants in SKILL_SYNONYMS.items():
        for v in variants:
            if re.search(rf'(?<!\w){re.escape(v.lower())}(?!\w)', text_lower):
                found.add(canonical)
    for raw, canonical in SKILLS_MAP.items():
        if re.search(rf'(?<!\w){re.escape(raw.lower())}(?!\w)', text_lower):
            found.add(canonical)
    return sorted(found)

def extract_experience_years(text: str) -> int:
    if not text:
        return 0
    years = re.findall(r"(\d+)\+?\s*years?", text.lower())
    return max([int(y) for y in years], default=0)

def extract_education(text: str) -> List[str]:
    if not text:
        return []
    pts = split_to_points(text)
    return pts or [text.strip()]

def extract_certifications_from_text(text: str) -> List[str]:
    if not text:
        return []
    pts = split_to_points(text)
    normalized = []
    for p in pts:
        p_clean = p.strip()
        matched = None
        for c in CERTIFICATIONS_LIST:
            if c and (c in p_clean.lower() or p_clean.lower() in c):
                matched = c
                break
        normalized.append(matched or p_clean)
    return normalized

# ------------------ LAYOUT DIAGNOSTICS (NEW) ------------------
def detect_multicolumn(blocks: List[Dict]) -> Dict:
    """
    Heuristic: check how many distinct x0 clusters exist.
    Returns {"multicolumn": bool, "num_columns_est": int}
    """
    if not blocks:
        return {"multicolumn": False, "num_columns_est": 1}
    x0s = [int(round(b["x0"])) for b in blocks]
    # cluster by rounding to nearest 50 pixels
    clusters = {}
    for x in x0s:
        key = (x // 50) * 50
        clusters.setdefault(key, 0)
        clusters[key] += 1
    num_clusters = len([k for k, v in clusters.items() if v >= 2])
    multi = num_clusters >= 2
    return {"multicolumn": multi, "num_columns_est": num_clusters if multi else 1}

# ------------------ MAIN PARSER (MODIFIED: integrates all new features, keeps old return shape) ------------------
def parse_resume(file_path: str):
    """
    Returns dict with keys expected by ats_scorer plus extras:
      - skills, experience, education, projects, achievements, certifications, years_experience, raw_text, sections
    New extras:
      - contact (dict), experience_timeline (list), experience_entries (list),
      - graphics (list image meta), layout (diagnostics), warnings (list)
    """
    warnings = []
    # 1) read file with layout + image awareness
    if file_path.lower().endswith(".pdf"):
        pdf_data = extract_pdf_data(file_path, preserve_layout=True)  # --- MODIFIED/NEW
        raw = pdf_data.get("text", "")
        blocks = pdf_data.get("blocks", [])
        images = pdf_data.get("images", [])
        page_count = pdf_data.get("page_count", 0)
        layout_info = detect_multicolumn(blocks)
        if images and len(images) > 6:
            warnings.append("resume_contains_many_images")
    elif file_path.lower().endswith(".docx"):
        raw = extract_text_from_docx(file_path)
        blocks = []
        images = []
        page_count = 0
        layout_info = {"multicolumn": False, "num_columns_est": 1}
    else:
        raise ValueError("Unsupported file format: PDF/DOCX only")

    text = clean_text(raw)

    # 2) sections parsing (preserves order from extract_pdf_data)
    sections = parse_resume_sections(text)
    sections_lines = sections.get("__sections_lines", defaultdict(list))

    # 3) Move project-like bullets from experience -> projects (keep original logic)
    exp_lines = list(sections_lines.get("experience", []))
    proj_lines = list(sections_lines.get("projects", []))
    remaining_exp = []
    for ln in exp_lines:
        if is_project_like(ln):
            proj_lines.append(ln)
        else:
            remaining_exp.append(ln)

    # also scan preamble/achievements for orphan project-like lines
    if not proj_lines:
        for secname in ("preamble", "achievements"):
            for ln in sections_lines.get(secname, []):
                if is_project_like(ln):
                    proj_lines.append(ln)

    # if still empty, attempt to collect longest block of potential project-like lines
    if not proj_lines:
        all_lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
        blocks_candidates = []
        current_block = []
        for ln in all_lines:
            if is_project_like(ln) or _LEADING_BULLET_RE.match(ln):
                current_block.append(ln)
            else:
                if current_block:
                    blocks_candidates.append(list(current_block))
                    current_block = []
        if current_block:
            blocks_candidates.append(list(current_block))
        if blocks_candidates:
            blocks_candidates.sort(key=lambda b: len(b), reverse=True)
            top = blocks_candidates[0]
            if any(is_project_like(l) for l in top):
                proj_lines.extend(top)

    sections_lines["experience"] = remaining_exp
    sections_lines["projects"] = proj_lines

    # 4) finalize section strings
    experience_text = "\n".join(remaining_exp).strip()
    projects_text = "\n".join(proj_lines).strip()
    achievements_text = "\n".join(sections_lines.get("achievements", [])).strip()
    certifications_text = "\n".join(sections_lines.get("certifications", [])).strip()
    education_text = "\n".join(sections_lines.get("education", [])).strip()

    # 5) canonical extraction (keeps old SKILLS_MAP logic)
    skills = extract_skills_from_text(sections.get("skills", "") or text)
    years_exp = extract_experience_years(sections.get("experience", "") or text)
    timeline = extract_experience_timeline(sections.get("experience", "") or text)
    experience_entries = extract_experience_entries(sections.get("experience", "") or experience_text)
    education = extract_education(education_text)
    certifications = extract_certifications_from_text(certifications_text)
    achievements = split_to_points(achievements_text) if achievements_text else []
    contact = extract_contact_info(text)

    # warnings: low text (likely image-only PDF)
    if len(text.split()) < 60 and images:
        warnings.append("low_extracted_text_might_be_scanned_image")

    result = {
        # kept previous output keys (compatible)
        "skills": skills,
        "experience": experience_text,
        "education": education,
        "projects": projects_text,
        "achievements": "\n".join(achievements) if achievements else "",
        "certifications": certifications,
        "years_experience": years_exp,
        "raw_text": text,
        "sections": {k: v for k, v in sections.items() if k != "__sections_lines"},
        # --- NEW additions (non-breaking extras)
        "contact": contact,
        "experience_timeline": timeline,
        "experience_entries": experience_entries,
        "graphics": images,
        "layout": layout_info,
        "page_count": page_count,
        "warnings": warnings,
    }
    return result

# ------------------ DEBUG RUN ------------------
if __name__ == "__main__":
    import json, sys
    if len(sys.argv) < 2:
        print("Usage: python resume_parser.py /path/to/Resume.pdf")
        sys.exit(1)
    data = parse_resume(sys.argv[1])
    print(json.dumps(data, indent=2, ensure_ascii=False))
