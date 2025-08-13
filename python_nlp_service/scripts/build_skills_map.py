import json
import re
from collections import defaultdict
from pathlib import Path

import pandas as pd
import pdfplumber
from rapidfuzz import fuzz
from unidecode import unidecode

# --------------------------------------------
# Locate important folders no matter where we run from
# --------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
# If script is in /scripts, python_nlp_service is parent; otherwise it's itself
if (SCRIPT_DIR / "datasets").exists():
    PNS_DIR = SCRIPT_DIR
elif (SCRIPT_DIR.parent / "datasets").exists():
    PNS_DIR = SCRIPT_DIR.parent
else:
    PNS_DIR = SCRIPT_DIR  # fallback

DATASETS_DIR = PNS_DIR / "datasets" / "skills"
CONFIG_DIR = PNS_DIR / "config"
OUT_PATH = CONFIG_DIR / "skills_map.json"

EXCEL_PATH = next(DATASETS_DIR.glob("*.xls*"), None)
PDF_PATH = next(DATASETS_DIR.glob("*.pdf"), None)

print(f"📂 DATASETS_DIR: {DATASETS_DIR}")
print(f"📄 EXCEL: {EXCEL_PATH}")
print(f"📄 PDF:   {PDF_PATH}")
print(f"🧾 OUTPUT: {OUT_PATH}")

# --------------------------------------------
# Helpers
# --------------------------------------------
STOPWORDS = {
    "and", "or", "of", "for", "to", "with", "the", "in", "on", "a", "an",
    "by", "via", "at", "as", "using"
}

# Words we accept as single tokens (even if short)
WHITELIST_SINGLE_TOKENS = {
    "c", "r", "go", "sap", "git", "aws", "gcp", "c++", "c#", ".net", "sql",
    "nlp", "ml", "ai", "ui", "ux", "fpga", "cad", "crm", "erp", "etl", "api"
}

# Basic characters allowed in skills
ALLOWED_CHARS = set("abcdefghijklmnopqrstuvwxyz0123456789+.#/- &")

def normalize(text: str) -> str:
    """Lowercase, strip, remove strange unicode, collapse spaces, strip versions."""
    if not isinstance(text, str):
        return ""
    t = unidecode(text).strip().lower()
    # keep only reasonable characters
    t = "".join(ch for ch in t if ch in ALLOWED_CHARS)
    # remove common version tails like 'python 3.10' -> 'python'
    t = re.sub(r"\b(v?|version)?\s?\d+(\.\d+)*\b", "", t).strip()
    # collapse multiple spaces
    t = re.sub(r"\s{2,}", " ", t)
    return t

def looks_like_skill(s: str) -> bool:
    """Heuristic:  keep short tech tokens (C, R), multiword phrases, and obvious tools."""
    s = s.strip()
    if not s:
        return False
    norm = normalize(s)
    if not norm:
        return False
    # ignore stopword-only entries
    if all(tok in STOPWORDS for tok in norm.split()):
        return False
    # allow explicit whitelisted singles
    if norm in WHITELIST_SINGLE_TOKENS:
        return True
    # at least 2 characters and contains a letter
    return len(norm) >= 2 and re.search(r"[a-z]", norm) is not None

# A small curated alias table (expand as you like)
ALIASES = {
    # programming & data
    "js": "javascript",
    "nodejs": "node.js",
    "node": "node.js",
    "expressjs": "express.js",
    "ts": "typescript",
    "py": "python",
    "postgres": "postgresql",
    "postgre": "postgresql",
    "mongo": "mongodb",
    "tf": "tensorflow",
    "scikit learn": "scikit-learn",
    "sklearn": "scikit-learn",
    "np": "numpy",
    "pandas library": "pandas",
    "matplotlib library": "matplotlib",
    "power bi": "powerbi",
    "power-bi": "powerbi",
    "ms excel": "microsoft excel",
    "excel": "microsoft excel",
    "ms word": "microsoft word",
    "powerpoint": "microsoft powerpoint",
    # cloud & devops
    "amazon web services": "aws",
    "gcp": "google cloud",
    "ci cd": "ci/cd",
    "cicd": "ci/cd",
    # general
    "natural language processing": "nlp",
    "machine learning": "ml",
    "artificial intelligence": "ai",
}

def canonicalize(s: str) -> str:
    n = normalize(s)
    if not n:
        return ""
    # direct alias hit
    if n in ALIASES:
        return ALIASES[n]
    return n

def add_variant(mapping: dict, variant: str, canonical: str):
    v = normalize(variant)
    c = normalize(canonical)
    if not v or not c:
        return
    mapping[v] = c

# --------------------------------------------
# 1) Parse Excel (O*NET skills)
# --------------------------------------------
def skills_from_excel(path: Path) -> set:
    out = set()
    if not path or not path.exists():
        print("⚠️  Excel not found; skipping.")
        return out

    xls = pd.ExcelFile(path)
    for sheet in xls.sheet_names:
        try:
            df = xls.parse(sheet)
        except Exception:
            continue

        # prefer columns that look like skill names
        cols = [c for c in df.columns if
                any(k in str(c).lower() for k in ["skill", "technology", "competenc", "tool", "software", "tech"])]

        if not cols:
            # If we can't guess, scan all textual columns
            cols = [c for c in df.columns if df[c].dtype == "object"]

        for c in cols:
            for val in df[c].dropna().astype(str).tolist():
                # split on commas / semicolons / slashes
                parts = re.split(r"[;,/]| and ", val)
                for p in parts:
                    p = p.strip()
                    if looks_like_skill(p):
                        out.add(canonicalize(p))

    print(f"✅ Excel skills: {len(out)}")
    return out

# --------------------------------------------
# 2) Parse PDF (O*NET Hot Technologies)
# --------------------------------------------
def skills_from_pdf(path: Path) -> set:
    out = set()
    if not path or not path.exists():
        print("⚠️  PDF not found; skipping.")
        return out

    try:
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                # try to extract tables first (tech lists often are tabular)
                tables = page.extract_tables() or []
                for tbl in tables:
                    for row in tbl:
                        for cell in (row or []):
                            if not cell:
                                continue
                            # table cells might contain multiple comma-separated skills
                            for piece in re.split(r"[;,/]", str(cell)):
                                piece = piece.strip()
                                if looks_like_skill(piece):
                                    out.add(canonicalize(piece))

                # then fallback to raw text
                text = page.extract_text() or ""
                # split by punctuation or bullets
                for chunk in re.split(r"[\u2022•\-\n\r\t]+", text):
                    chunk = chunk.strip()
                    if looks_like_skill(chunk):
                        out.add(canonicalize(chunk))

    except Exception as e:
        print(f"⚠️  PDF parse error: {e}")

    print(f"✅ PDF skills: {len(out)}")
    return out

# --------------------------------------------
# 3) Merge, dedupe, and create variant map
# --------------------------------------------
def build_skills_map(skills: set) -> dict:
    """
    Create a variant->canonical map:
    - Each canonical maps to itself.
    - Add common punctuation/case variants.
    - Add curated ALIASES.
    """
    mapping = {}

    # 3a) canonical -> itself
    for s in sorted(skills):
        add_variant(mapping, s, s)

    # 3b) generate punctuation variants (e.g., node.js <-> nodejs)
    def variants(s: str):
        v = {s}
        v.add(s.replace(" ", ""))           # 'power bi' -> 'powerbi'
        v.add(s.replace(".", ""))           # 'node.js' -> 'nodejs'
        v.add(s.replace("-", " "))          # 'power-bi' -> 'power bi'
        v.add(s.replace("/", ""))           # 'ci/cd' -> 'cicd'
        v.add(s.replace("/", " "))          # 'ci/cd' -> 'ci cd'
        v.add(s.replace("+", "++"))         # 'c+' variants (lighthearted safeguard)
        return {normalize(x) for x in v}

    for s in list(skills):
        c = canonicalize(s)
        for v in variants(s):
            add_variant(mapping, v, c)

    # 3c) add curated aliases
    for k, v in ALIASES.items():
        add_variant(mapping, k, v)
        # enrich with simple variants of alias key too
        add_variant(mapping, k.replace(".", ""), v)
        add_variant(mapping, k.replace(" ", ""), v)

    return mapping

# --------------------------------------------
# Run
# --------------------------------------------
if __name__ == "__main__":
    excel_skills = skills_from_excel(EXCEL_PATH)
    pdf_skills = skills_from_pdf(PDF_PATH)

    seed = set()
    seed.update(excel_skills)
    seed.update(pdf_skills)

    # A small fallback if PDFs/Excel were sparse (tweak as needed)
    if len(seed) < 50:
        seed.update({
            "python", "javascript", "java", "c++", "c#", ".net", "typescript", "react",
            "node.js", "express.js", "mongodb", "postgresql", "mysql", "redis",
            "aws", "azure", "google cloud", "docker", "kubernetes", "git",
            "html", "css", "sass", "tailwind css", "next.js", "django", "flask",
            "fastapi", "tensorflow", "pytorch", "scikit-learn", "numpy", "pandas",
            "matplotlib", "seaborn", "powerbi", "tableau", "excel", "microsoft excel",
            "jira", "confluence", "figma", "adobe xd", "salesforce", "crm",
            "nlp", "ml", "ai", "etl", "airflow", "ci/cd"
        })
        print("ℹ️ Added a small fallback seed list to ensure coverage.")

    # Build variant map
    skills_map = build_skills_map(seed)

    # Save
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(skills_map, indent=2), encoding="utf-8")
    print(f"✅ Wrote {len(skills_map):,} variants to {OUT_PATH}")
