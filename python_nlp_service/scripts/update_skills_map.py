import json
from pathlib import Path
from build_skills_map import canonicalize, add_variant, normalize

# Paths
CONFIG_DIR = Path(__file__).resolve().parent.parent / "config"
FINAL_PATH = CONFIG_DIR / "skills_map_final.json"
SUPPLEMENT_PATH = CONFIG_DIR / "ats_supplement.json"

# Load existing skills map
if FINAL_PATH.exists():
    with open(FINAL_PATH, "r", encoding="utf-8") as f:
        skills_map = json.load(f)
else:
    skills_map = {}

# Load supplement
with open(SUPPLEMENT_PATH, "r", encoding="utf-8") as f:
    supplement_data = json.load(f)

# Flatten supplement into a set of canonical skills
supplement_skills = set()
for category, skills in supplement_data.items():
    for skill in skills:
        supplement_skills.add(canonicalize(skill))

# Add variants and merge
added_skills = []
for skill in sorted(supplement_skills):
    if skill not in skills_map.values():
        # add canonical mapping
        add_variant(skills_map, skill, skill)
        added_skills.append(skill)

# Save updated map
with open(FINAL_PATH, "w", encoding="utf-8") as f:
    json.dump(skills_map, f, indent=2, ensure_ascii=False)

print(f"✅ Added {len(added_skills)} new skills to skills_map_final.json")
if added_skills:
    print("New Skills Added:")
    for s in added_skills:
        print("-", s)
