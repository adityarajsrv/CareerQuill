import json
import pandas as pd
from pathlib import Path
from python_nlp_service.modules import jd_parser

# Path to your JD dataset (CSV/JSON)
DATASET_PATH = Path("datasets/job_descriptions.csv")

def load_jds():
    if DATASET_PATH.suffix == ".csv":
        df = pd.read_csv(DATASET_PATH)
        return df.to_dict(orient="records")
    elif DATASET_PATH.suffix == ".json":
        with open(DATASET_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    else:
        raise ValueError("Unsupported dataset format. Use CSV or JSON.")

def main():
    print(f"Evaluating JDs from {DATASET_PATH}...\n")

    jds = load_jds()

    for jd in jds[:10]:  # limit for testing
        title = jd.get("title", "Unknown Role")
        description = jd.get("description", "")

        try:
            parsed = jd_parser.parse_jd(description)
        except Exception as e:
            print(f"[ERROR] Failed to parse JD '{title}': {e}")
            continue

        print("="*80)
        print(f"TITLE: {title}\n")
        print(f"JOB DESCRIPTION:\n{description[:500]} ...\n")  # preview
        print("PARSED OUTPUT:\n", json.dumps(parsed, indent=2))

if __name__ == "__main__":
    main()
