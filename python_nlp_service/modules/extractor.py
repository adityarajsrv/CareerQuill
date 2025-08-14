# Core extraction logic

import re
from collections import Counter
from .utils import load_skills_map, clean_text

skills_map = load_skills_map()

def extract_name(text):
    """Naive name extraction (first line heuristic)."""
    lines = text.strip().split("\n")
    return lines[0] if lines else None

def extract_email(text):
    match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    return match.group(0) if match else None

def extract_phone(text):
    match = re.search(r"\+?\d[\d\s\-]{8,}\d", text)
    return match.group(0) if match else None

def extract_skills(text):
    """Match skills from skills_map.json."""
    text_lower = text.lower()
    found_skills = []

    for skill in skills_map.keys():
        if skill in text_lower:
            found_skills.append(skill)

    return list(set(found_skills))  # unique

def extract_all(text):
    """Run all extractors and return structured data."""
    text = clean_text(text)
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text)
    }
