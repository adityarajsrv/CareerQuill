#!/usr/bin/env python3
import json
from pathlib import Path
from collections import defaultdict

# --- Paths ---
ROOT = Path(__file__).resolve().parents[1]
DATASET_PATH = ROOT / "datasets/job_descriptions/job_dataset.json"
SOFT_SKILLS_PATH = ROOT / "config/soft_skills.json"
OUTPUT_SKILLS_MAP = ROOT / "config/skills_map_final.json"

# --- Load dataset ---
def load_dataset():
    if not DATASET_PATH.exists():
        raise FileNotFoundError(f"{DATASET_PATH} not found")
    with open(DATASET_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

# --- Load soft skills ---
def load_soft_skills():
    with open(SOFT_SKILLS_PATH, "r", encoding="utf-8") as f:
        soft_skills = json.load(f)
    flattened = set()
    for vals in soft_skills.values():
        flattened.update(val.lower() for val in vals)
    return flattened

# --- Build skills map ---
def build_skills_map(dataset, soft_skills_set):
    skills_map = {}
    for jd in dataset:
        # Collect skills
        for s in jd.get("Skills", []):
            skills_map[s.lower()] = s
        # Collect keywords
        for k in jd.get("Keywords", []):
            skills_map[k.lower()] = k
    # Merge soft skills
    for s in soft_skills_set:
        skills_map[s] = s
    return skills_map

# --- Main ---
def main():
    dataset = load_dataset()
    soft_skills_set = load_soft_skills()
    skills_map = build_skills_map(dataset, soft_skills_set)

    # Save
    with open(OUTPUT_SKILLS_MAP, "w", encoding="utf-8") as f:
        json.dump(skills_map, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Generated {OUTPUT_SKILLS_MAP} with {len(skills_map)} skills/keywords")

if __name__ == "__main__":
    main()
