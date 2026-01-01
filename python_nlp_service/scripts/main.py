# python_nlp_service/scripts/main.py
import sys
import json
import os
from python_nlp_service.modules.resume_parser import parse_resume
from python_nlp_service.modules.ats_scorer import score_resume

def load_job_descriptions(dataset_path, job_title):
    with open(dataset_path, "r", encoding="utf-8") as f:
        jobs = json.load(f)

    # Normalize keys (Title → title, Skills → skills, etc.)
    normalized_jobs = []
    for jd in jobs:
        norm = {}
        for k, v in jd.items():
            norm[k.lower()] = v
        normalized_jobs.append(norm)

    matched_jds = [jd for jd in normalized_jobs if jd.get("title", "").lower() == job_title.lower()]
    return matched_jds

def aggregate_job_descriptions(jds):
    """Merge multiple JDs of same title into one aggregated JD."""
    agg = {
        "title": jds[0]["title"] if jds else "Unknown",
        "skills": set(),
        "experience": set(),
        "education": set(),
        "projects": set(),
        "action_verbs": set(),
        "certifications": set(),
    }
    for jd in jds:
        for key in agg.keys():
            if key != "title":
                agg[key].update(jd.get(key, []))
    # convert sets back to lists
    for key in agg.keys():
        if key != "title":
            agg[key] = list(agg[key])
    return agg

def main():
    if len(sys.argv) < 3:
        print("Usage: python -m python_nlp_service.scripts.main <resume_path> <job_title>")
        sys.exit(1)

    resume_path = sys.argv[1]
    job_title = sys.argv[2]

    dataset_path = "python_nlp_service/datasets/job_descriptions/job_dataset.json"

    # Parse resume
    resume_data = parse_resume(resume_path)

    # Load all JDs with same title
    job_descriptions = load_job_descriptions(dataset_path, job_title)

    if not job_descriptions:
        print(f"No job descriptions found for: {job_title}")
        sys.exit(1)

    # Aggregate multiple JDs
    aggregated_jd = aggregate_job_descriptions(job_descriptions)

    # Score resume vs aggregated JD
    scores = score_resume(resume_data, aggregated_jd)

    print("\n==============================")
    print(f" Resume vs Aggregated JD: {job_title}")
    print("==============================\n")

    for k, v in scores.items():
        print(f"{k:<15}: {v:.2f}%")

if __name__ == "__main__":
    main()
