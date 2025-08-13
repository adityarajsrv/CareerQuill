import os
import re
import json
import pandas as pd
from pathlib import Path
from collections import defaultdict
import fitz  # PyMuPDF for PDF reading

# === Paths ===
ROOT_DIR = Path(__file__).resolve().parents[1]  # python_nlp_service/
DATASETS_DIR = ROOT_DIR / "datasets"
SKILLS_DIR = DATASETS_DIR / "skills"
CONFIG_PATH = ROOT_DIR / "config" / "skills_map.json"

# === Stopwords & noise tokens ===
NOISE_WORDS = {
    "experience", "team", "various", "knowledge", "ability", "skills", "skill",
    "span", "div", "class", "company", "job", "city", "state", "description",
    "ul", "li", "tr", "td", "br", "https", "none", "null", "n/a", "etc"
}

# === Regex for skill detection ===
SKILL_REGEX = re.compile(r"[a-zA-Z0-9\+#\.\- ]{2,}")

# === Canonical mapping storage ===
skills_map = {}

def clean_skill(s):
    s = s.strip().lower()
    s = re.sub(r"\s+", " ", s)
    s = re.sub(r"[^a-z0-9\+#\.\- ]", "", s)
    return s

def add_skill(variant, canonical=None):
    variant = clean_skill(variant)
    if not variant or variant in NOISE_WORDS:
        return
    if canonical is None:
        canonical = variant
    canonical = clean_skill(canonical)
    skills_map[variant] = canonical

# === PDF Loader ===
def extract_from_pdf(pdf_path):
    print(f"📄 Extracting from PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    for page in doc:
        text = page.get_text()
        for match in SKILL_REGEX.findall(text):
            add_skill(match)

# === Excel Loader ===
def extract_from_excel(excel_path):
    print(f"📊 Extracting from Excel: {excel_path}")
    df = pd.read_excel(excel_path)
    for col in df.columns:
        for val in df[col].dropna():
            for match in SKILL_REGEX.findall(str(val)):
                add_skill(match)

# === CSV Loader ===
def extract_from_csv(csv_path):
    print(f"📄 Extracting from CSV: {csv_path}")
    try:
        df = pd.read_csv(csv_path, encoding="utf-8", low_memory=False)
    except Exception as e:
        print(f"⚠ Could not read {csv_path}: {e}")
        return
    for col in df.columns:
        if any(k in col.lower() for k in ["skill", "keywords", "tools", "technologies", "requirement"]):
            for val in df[col].dropna():
                for match in SKILL_REGEX.findall(str(val)):
                    add_skill(match)

def main():
    # 1️⃣ Load curated lists
    extract_from_pdf(SKILLS_DIR / "Hot_Technologies_Demand.pdf")
    extract_from_excel(SKILLS_DIR / "Distance_Learning_Remote_Training_Skills.xlsx")

    # 2️⃣ Load dataset-based skills
    dataset_files = [
        DATASETS_DIR / "resumes" / "UpdatedResumeDataSet.csv",
        DATASETS_DIR / "resumes" / "ResumeDataset_SaugataRoyArghya" / "resume_data.csv",
        DATASETS_DIR / "matching" / "Resume_VS_JD_MatchingDataset" / "resume_job_matching_dataset.csv"
    ]
    for file_path in dataset_files:
        if file_path.exists():
            extract_from_csv(file_path)
        else:
            print(f"⚠ Missing: {file_path}")

    # 3️⃣ Save final skills map
    print(f"\n✅ Total unique variants: {len(skills_map)}")
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(dict(sorted(skills_map.items())), f, indent=4)

    print(f"💾 Saved clean skills map to {CONFIG_PATH}")

if __name__ == "__main__":
    main()
