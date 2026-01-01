# python_nlp_service/modules/skills_standardizer.py
import json
from pathlib import Path

SKILLS_MAP_FILE = Path(__file__).parent.parent / "config/skills_map_final.json"
SYNONYM_SKILLS_FILE = Path(__file__).parent.parent / "config/synonym_skills.json"

with open(SKILLS_MAP_FILE, "r", encoding="utf-8") as f:
    SKILLS_MAP = set(json.load(f))

with open(SYNONYM_SKILLS_FILE, "r", encoding="utf-8") as f:
    SYNONYM_MAP = json.load(f)


def standardize_skills(raw_skills):
    """
    Map resume skills to standardized skills using synonyms.
    """
    normalized = set()
    for skill in raw_skills:
        skill_lower = skill.lower()
        mapped = None
        for key, synonyms in SYNONYM_MAP.items():
            if skill_lower in [s.lower() for s in synonyms]:
                mapped = key
                break
        if mapped:
            normalized.add(mapped)
        elif skill in SKILLS_MAP:
            normalized.add(skill)
    return list(normalized)
