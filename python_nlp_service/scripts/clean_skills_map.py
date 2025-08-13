import json
import re
from pathlib import Path

# Paths
SKILLS_JSON = Path("python_nlp_service/config/skills_map.json")
OUTPUT_JSON = Path("python_nlp_service/config/skills_map_cleaned.json")

# Load existing skills
with open(SKILLS_JSON, "r", encoding="utf-8") as f:
    skills_map = json.load(f)

# Stopwords & irrelevant words to drop
STOPWORDS = {
    "address", "phone", "email", "name", "city", "state", "country", "zip",
    "work", "job", "resume", "linkedin", "experience", "summary", "company",
    "years", "month", "day"
}

def is_valid_skill(skill):
    s = skill.lower().strip()
    
    # Remove if too short
    if len(s) < 2:
        return False
    
    # Remove numbers only
    if s.isdigit():
        return False
    
    # Remove if mostly digits
    if sum(c.isdigit() for c in s) / len(s) > 0.5:
        return False
    
    # Remove if more than 5 words (likely sentence)
    if len(s.split()) > 5:
        return False
    
    # Remove if contains only stopwords
    if s in STOPWORDS:
        return False
    
    return True

# Clean skills
cleaned_map = {k: v for k, v in skills_map.items() if is_valid_skill(k)}

# Save cleaned skills map
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(cleaned_map, f, indent=4)

print(f"✅ Cleaned skills map saved to {OUTPUT_JSON} with {len(cleaned_map)} entries.")
