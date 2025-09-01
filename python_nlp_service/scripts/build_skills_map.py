#!/usr/bin/env python3
"""
Builds a fresh skills_map_master.json from:
 - O*NET Hot Technologies PDF
 - O*NET Distance Learning Excel
 - Curated supplement list (modern tech + non-tech skills)

Outputs variant → canonical mappings with boundary-safe matches.
"""

import re
import json
import unicodedata
from pathlib import Path
from typing import List, Set
import pdfplumber
import pandas as pd

# ==== Paths ====
SCRIPT_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPT_DIR.parent  # python_nlp_service/
DATASETS_DIR = ROOT_DIR / "datasets" / "skills"
CONFIG_PATH = ROOT_DIR / "config" / "skills_map_master.json"

PDF_PATH = DATASETS_DIR / "Hot_Technologies_Demand.pdf"
EXCEL_PATH = DATASETS_DIR / "Distance_Learning_Remote_Training_Skills.xlsx"

# ==== Always-keep acronyms & short forms ====
SHORT_WHITELIST = {
    "c", "c++", "c#", "go", "js", "ts", "py", "r", "php", "sql", "pl/sql",
    "ai", "ml", "dl", "cv", "nlp", "bi", "etl", "db", "dbms", "api",
    "http", "tcp", "udp", "ssh", "dns", "ip", "lan", "wan", "vpn", "tls", "ssl",
    "aws", "gcp", "ci", "cd", "jwt", "ui", "ux", "oop"
}

# ==== Strong blacklist (resume fluff / noise) ====
BLACKLIST = {
    "experience", "address", "phone", "email", "linkedin", "summary", "company",
    "hardworking", "motivated", "dedicated", "organized", "detail oriented",
    "team player", "communication", "multitasking", "works", "project", "tech", "technology"
}

# ==== Aliases for canonicalization ====
ALIASES = {
    "nodejs": "Node.js",
    "node": "Node.js",
    "express": "Express.js",
    "expressjs": "Express.js",
    "reactjs": "React",
    "js": "JavaScript",
    "ts": "TypeScript",
    "py": "Python",
    "postgres": "PostgreSQL",
    "postgre": "PostgreSQL",
    "mongo": "MongoDB",
    "power bi": "Power BI",
    "power-bi": "Power BI",
    "ci cd": "CI/CD",
    "cicd": "CI/CD",
    "natural language processing": "NLP",
    "machine learning": "ML",
    "artificial intelligence": "AI",
}

# ==== Modern tech supplement ====
SUPPLEMENT = {
    # Modern web/dev
    "Tailwind CSS", "ShadCN", "Zustand", "WebRTC", "Socket.IO", "MongoDB Atlas",
    "Next.js", "Vite", "Redux Toolkit", "Axios", "Prisma ORM",
    "OAuth 2.0", "OpenID Connect", "Firebase", "Supabase",
    # Non-tech resume common
    "Project Management", "Stakeholder Management", "Time Management",
    "Business Analysis", "Customer Service", "Inventory Management",
    "Agile Methodologies", "Scrum", "Kanban"
}

# ==== Helpers ====
def normalize(text: str) -> str:
    """Lowercase, remove odd chars, strip versions, collapse spaces."""
    if not isinstance(text, str):
        return ""
    t = unicodedata.normalize("NFKC", text).strip().lower()
    t = re.sub(r"[•·–—]+", "-", t)
    t = re.sub(r"\s+", " ", t)
    # remove version numbers
    t = re.sub(r"\b(v|version)?\s?\d+(\.\d+)*\b", "", t).strip()
    return t

def clean_skill(raw: str) -> str:
    s = normalize(raw)
    if not s:
        return ""
    if s in BLACKLIST:
        return ""
    if len(s) <= 3 and s not in SHORT_WHITELIST:
        return ""
    return s

def canonicalize(s: str) -> str:
    """Map variant to canonical name."""
    if s in ALIASES:
        return ALIASES[s]
    # Title-case multi-word skills except known camelcase
    if " " in s and not any(ch.isupper() for ch in s):
        return " ".join(w.capitalize() if len(w) > 2 else w.upper() for w in s.split())
    return s.capitalize() if s.islower() else s

def add_variant(mapping: dict, variant: str, canonical: str):
    v = normalize(variant)
    c = normalize(canonical)
    if not v or not c:
        return
    mapping[v] = canonicalize(c)

# ==== Extract from Excel ====
def extract_excel(path: Path) -> Set[str]:
    out = set()
    if not path.exists():
        return out
    xls = pd.ExcelFile(path)
    for sheet in xls.sheet_names:
        df = xls.parse(sheet)
        cols = [c for c in df.columns if any(k in str(c).lower() for k in ["skill", "technology", "tool", "software"])]
        if not cols:
            cols = [c for c in df.columns if df[c].dtype == "object"]
        for c in cols:
            for val in df[c].dropna().astype(str):
                for part in re.split(r"[;,/]| and ", val):
                    cs = clean_skill(part)
                    if cs:
                        out.add(cs)
    return out

# ==== Extract from PDF ====
def extract_pdf(path: Path) -> Set[str]:
    out = set()
    if not path.exists():
        return out
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables() or []
            for tbl in tables:
                for row in tbl:
                    for cell in (row or []):
                        if not cell:
                            continue
                        for part in re.split(r"[;,/]", str(cell)):
                            cs = clean_skill(part)
                            if cs:
                                out.add(cs)
            text = page.extract_text() or ""
            for chunk in re.split(r"[\u2022•\-\n\r\t]+", text):
                cs = clean_skill(chunk)
                if cs:
                    out.add(cs)
    return out

# ==== Main build ====
def main():
    onet_excel = extract_excel(EXCEL_PATH)
    onet_pdf = extract_pdf(PDF_PATH)

    onet_skills = onet_excel.union(onet_pdf)
    print(f"✅ O*NET skills loaded: {len(onet_skills)}")

    supplement_added = {normalize(s) for s in SUPPLEMENT} - onet_skills
    all_skills = set(onet_skills)
    for s in SUPPLEMENT:
        all_skills.add(clean_skill(s))

    # Build variant map
    mapping = {}
    for skill in sorted(all_skills):
        canon = canonicalize(skill)
        for v in add_variant(skill):
            mapping[v] = canon
        # add alias variants
        for alias, c in ALIASES.items():
            mapping[normalize(alias)] = c

    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)

    print(f"➕ Added {len(supplement_added)} supplement skills")
    if supplement_added:
        print("   " + ", ".join(sorted(supplement_added)))
    print(f"💾 Wrote {len(mapping):,} variants to {CONFIG_PATH}")

if __name__ == "__main__":
    main()
