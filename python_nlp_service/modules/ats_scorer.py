# python_nlp_service/modules/ats_scorer.py
import sys
import os
from pathlib import Path

# Add the project root to Python path - THIS MUST BE AT THE VERY TOP
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

# NOW import your modules
try:
    from python_nlp_service.modules.resume_parser import parse_resume
    print("✅ Successfully imported resume_parser")
except ImportError as e:
    print(f"❌ Failed to import resume_parser: {e}")
    raise

# Rest of your existing imports
import re
import json
import spacy
from collections import Counter
from difflib import SequenceMatcher
from datetime import datetime, timezone

BASE_DIR = Path(__file__).resolve().parent.parent

# Load spaCy model with error handling
try:
    nlp = spacy.load("en_core_web_sm")
    print("✅ spaCy model loaded successfully")
except OSError:
    print("❌ Warning: spaCy model 'en_core_web_sm' not found. Please run: python -m spacy download en_core_web_sm")
    # Create a dummy nlp object to prevent crashes
    nlp = None
except Exception as e:
    print(f"❌ Warning: Could not load spaCy model: {e}")
    nlp = None

# ------------------ Load Configs ------------------
try:
    with open(BASE_DIR / "config/certifications.json", "r", encoding="utf-8") as f:
        CERTIFICATIONS_LIST = [c.lower() for c in json.load(f)]

    with open(BASE_DIR / "config/action_verbs.json", "r", encoding="utf-8") as f:
        ACTION_VERBS_LIST = [v.lower() for v in json.load(f)]

    with open(BASE_DIR / "config/synonym_skills.json", "r", encoding="utf-8") as f:
        SKILL_SYNONYMS = json.load(f)

    with open(BASE_DIR / "datasets/job_descriptions/job_dataset.json", "r", encoding="utf-8") as f:
        JOB_DATASET = json.load(f)
    print("✅ All config files loaded successfully")
except FileNotFoundError as e:
    print(f"❌ Config file not found: {e}")
    # Set defaults to prevent crashes
    CERTIFICATIONS_LIST = []
    ACTION_VERBS_LIST = []
    SKILL_SYNONYMS = {}
    JOB_DATASET = []
except Exception as e:
    print(f"❌ Error loading config files: {e}")
    CERTIFICATIONS_LIST = []
    ACTION_VERBS_LIST = []
    SKILL_SYNONYMS = {}
    JOB_DATASET = []

# ------------------ Helper Functions ------------------

def fuzzy_match(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio() > 0.75

def normalize_skill(skill):
    """Map skill to canonical form if in synonyms list"""
    s_lower = skill.lower()
    for canonical, variants in SKILL_SYNONYMS.items():
        if s_lower == canonical.lower() or s_lower in [v.lower() for v in variants]:
            return canonical
    return skill

# ------------------ Action verbs extraction ------------------
def extract_action_verbs(text, strict=False):
    """Return action verbs from text (matched against configured list)"""
    if nlp is None:
        return []  # Return empty list if spaCy not available
    
    doc = nlp(text or "")
    verbs_in_text = set()
    for token in doc:
        if token.pos_ == "VERB":
            lemma = token.lemma_.lower()
            if strict:
                # Strict match: only lemma exactly matches configured verb
                if lemma in [v.lower() for v in ACTION_VERBS_LIST]:
                    verbs_in_text.add(lemma)
            else:
                # Original behavior: lemma in v or v in lemma
                for v in ACTION_VERBS_LIST:
                    if lemma in v or v in lemma:
                        verbs_in_text.add(v.lower())
    return sorted(verbs_in_text)

# ------------------ Buzzword / skills matching ------------------
def extract_buzzwords(text, skills_list):
    """Return canonical skills present in text using synonyms mapping."""
    words = re.findall(r'\b\w[\w\+\.\#]*\b', text or "")
    matched = set()
    skills_lower = [s.lower() for s in skills_list]

    # single-word matching (original logic)
    for w in words:
        norm = normalize_skill(w)
        if norm.lower() in skills_lower:
            matched.add(norm)

    # multi-word skills detection
    for skill in skills_list:
        if len(skill.split()) > 1:
            if skill.lower() in text.lower():
                matched.add(skill)

    return sorted(matched)

# ------------------ Repeated words ------------------
def repeated_words(text, only_words=None):
    words = [w.lower() for w in re.findall(r'\b\w+\b', text or "")]
    exclude_patterns = [r'^\d{4}$', r'^\d{1,2}/\d{1,2}/\d{2,4}$', r'^\d+$']
    filtered_words = [w for w in words if not any(re.match(p, w) for p in exclude_patterns)]
    if only_words:
        filtered_words = [w for w in filtered_words if w in only_words]
    counter = Counter(filtered_words)
    return {w: c for w, c in counter.items() if c > 1}

# ------------------ Project analysis ------------------
def analyze_projects(project_text):
    """
    Score each project bullet for:
      - action verb present
      - skill keyword present
      - numeric/metric present
      - detect links (live demos)
    """
    points = [p.strip() for p in re.split(r'\u27a2|[\n•]', project_text or "") if p.strip()]
    total_score = 0.0
    contextual_matches = 0
    quantified_counts = 0
    for p in points:
        score = 0
        verbs = extract_action_verbs(p)
        skills_here = extract_buzzwords(p, SKILL_SYNONYMS.keys())
        has_number = bool(re.search(r'\d+%?|\d+\.\d+', p))
        # +1 each
        if verbs: score += 1
        if skills_here: score += 1
        if has_number: score += 1
        total_score += score / 3.0
        if verbs and skills_here:
            contextual_matches += 1
        if has_number:
            quantified_counts += 1
    avg_score = total_score / len(points) if points else 0.0
    contains_numbers = any(re.search(r'\d+', p) for p in points)
    contains_links = any(re.search(r'https?://\S+', p) for p in points)
    return {
        "num_points": len(points),
        "avg_point_score": avg_score,
        "contains_numbers": contains_numbers,
        "contains_links": contains_links,
        "contextual_matches": contextual_matches,
        "quantified_counts": quantified_counts,
        "raw_points": points
    }

# ------------------ Resume stats ------------------
def resume_stats(text):
    num_words = len((text or "").split())
    num_chars = len(text or "")
    contains_numbers = bool(re.search(r'\d+', text or ""))
    # density: ratio of action verbs & skills / total words
    action_verbs_count = len(extract_action_verbs(text))
    buzzwords_count = len(extract_buzzwords(text, SKILL_SYNONYMS.keys()))
    density = (action_verbs_count + buzzwords_count) / num_words if num_words else 0.0
    return {"num_words": num_words, "num_chars": num_chars, "contains_numbers": contains_numbers, "density": density}

# ------------------ Contact detection ------------------
def detect_contacts(text):
    """Detect presence of email, phone, github, linkedin (regex-based)."""
    text = text or ""
    contacts = {
        "email": bool(re.search(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', text)),
        "phone": bool(re.search(r'\+?\d[\d\s\-\(\)]{7,}\d', text)),
        "linkedin": bool(re.search(r'(linkedin\.com/in/[A-Za-z0-9\-_]+)', text, re.I)),
        "github": bool(re.search(r'(github\.com/[A-Za-z0-9\-_]+)', text, re.I))
    }
    return contacts

# ------------------ Skill matching ------------------
def match_skills(resume_skills, jd_skills):
    norm_resume = [normalize_skill(s) for s in (resume_skills or [])]
    norm_jd = [normalize_skill(s) for s in (jd_skills or [])]

    matched, unmatched = set(), set(norm_jd)
    for jd_skill in norm_jd:
        for rs in norm_resume:
            if jd_skill.lower() == rs.lower() or fuzzy_match(jd_skill, rs):
                matched.add(jd_skill)
                unmatched.discard(jd_skill)
                break
    score = len(matched) / len(norm_jd) * 100 if norm_jd else 0
    return {"matched": sorted(matched), "unmatched": sorted(unmatched), "score_percent": round(score, 2)}

# ------------------ Certifications evaluation ------------------
def evaluate_certifications(resume_certs, jd_specific_certs=None):
    """
    Returns score and list of matched certifications.
    jd_specific_certs: if provided, score is weighted by JD relevance
    """
    if not resume_certs:
        return 0.0, []

    resume_certs_lower = [c.lower() for c in resume_certs]

    # Match against JD-specific if provided
    if jd_specific_certs:
        present = [c for c in resume_certs_lower if c in [d.lower() for d in jd_specific_certs]]
        score = len(present) / len(jd_specific_certs) if jd_specific_certs else 0
    else:
        present = [c for c in resume_certs_lower if c in CERTIFICATIONS_LIST]
        score = len(present) / len(CERTIFICATIONS_LIST) if CERTIFICATIONS_LIST else 0

    return min(score, 1.0), present

# ------------------ New bonus functions (kept original logic + enhanced) ------------------

def recency_bonus(project_analysis, years_window=2):
    now_year = datetime.now(timezone.utc).year
    years_found = []
    for p in project_analysis.get("raw_points", []):
        matches = re.findall(r'\b(19|20)\d{2}\b', p)
        for m in matches:
            years_found.append(int(m))
    if not years_found:
        return 0.0
    most_recent = max(years_found)
    delta = now_year - most_recent
    if delta <= 0:
        return 1.0
    if delta <= years_window:
        return max(0.5, 1.0 - (delta / (years_window * 2)))
    return 0.0

def seniority_match_bonus(jd_title, resume_text):
    senior_keywords = ["senior", "lead", "manager", "principal", "sr.", "staff"]
    leadership_verbs = ["lead", "led", "manage", "managed", "mentored", "mentor", "supervise", "supervised", "coached"]
    jd_lower = (jd_title or "").lower()
    if not any(k in jd_lower for k in senior_keywords):
        return 0.0
    text = (resume_text or "").lower()
    count = sum(1 for v in leadership_verbs if re.search(r'\b' + re.escape(v) + r'\b', text))
    if count >= 2:
        return 1.0
    if count == 1:
        return 0.5
    return 0.0

def quantified_impact_bonus(project_analysis):
    n_points = project_analysis.get("num_points", 0)
    if n_points == 0:
        return 0.0
    quantified = project_analysis.get("quantified_counts", 0)
    return min(1.0, quantified / n_points)

def formatting_check_bonus(project_text, achievements_text, resume_text):
    score = 0.0
    # bullet detection: original + numbers + * + indentation
    bullets = bool(re.search(r'[\u27a2•\-*]\s+\w+', project_text or ""))
    if bullets:
        score += 0.4
    # section headers
    headers = 0
    for sec in ["project", "projects", "achievement", "achievements", "skill", "skills", "education"]:
        if re.search(rf'^\s*{sec}\b[:\-]?', (resume_text or ""), re.I | re.M):
            headers += 1
    if headers >= 2:
        score += 0.06  # enhanced from 0.04
    # reasonable bullet count
    pts = [p.strip() for p in re.split(r'\u27a2|[\n•\-*]', project_text or "") if p.strip()]
    if len(pts) >= 3:
        score += 0.2
    return min(1.0, score)

# ------------------ Resume length scoring ------------------
def bell_curve_length_score(num_words):
    if num_words <= 300:
        return 0.6 + 0.4 * num_words / 300
    elif num_words >= 700:
        return max(0.0, 1.0 - (num_words - 700) / 300)
    else:
        return 1.0

# ------------------ ATS score calculation ------------------
def calculate_ats_score(metrics, weights=None, bonus_weights=None):
    if weights is None:
        weights = {
            "skills": 0.35,
            "action_verbs": 0.15,
            "buzzwords": 0.10,
            "projects": 0.10,
            "education": 0.10,
            "certifications": 0.10,
            "resume_length": 0.08,
            "summary": 0.02
        }
    repetition_factor = 1 - min(metrics.get("repetition_ratio", 0), 0.15)
    core_total = sum([
        metrics.get("skills_score", 0) * weights["skills"],
        metrics.get("action_verbs_score", 0) * weights["action_verbs"],
        metrics.get("buzzwords_score", 0) * weights["buzzwords"],
        metrics.get("projects_score", 0) * weights["projects"],
        metrics.get("education_score", 0) * weights["education"],
        metrics.get("certifications_score", 0) * weights["certifications"],
        metrics.get("resume_length_score", 0) * weights["resume_length"],
        metrics.get("summary_score", 0) * weights["summary"]
    ]) * repetition_factor

    section_bonus = 0.0
    for sec in ["projects", "achievements", "skills"]:
        if metrics.get(f"{sec}_present", False):
            section_bonus += 0.05  # enhanced from 0.02
    if metrics.get("project_links_present", False):
        section_bonus += 0.03

    contextual_bonus = metrics.get("contextual_score", 0) * 0.05
    recency_bonus_v = metrics.get("recency_score", 0) * 0.03
    seniority_bonus = metrics.get("seniority_score", 0) * 0.03
    quantified_bonus = metrics.get("quantified_score", 0) * 0.04
    formatting_bonus = metrics.get("formatting_score", 0) * 0.02
    contacts_bonus = metrics.get("contacts_score", 0) * 0.02

    total = core_total + section_bonus + contextual_bonus + recency_bonus_v + seniority_bonus + quantified_bonus + formatting_bonus + contacts_bonus
    total_pct = min(total * 100, 100)
    return round(total_pct)

# ------------------ Suggestions ------------------
def generate_suggestions(resume_data, jd_skills=[]):
    suggestions = []
    skills_missing = set(jd_skills) - set(resume_data.get("skills", []))
    if skills_missing:
        suggestions.append(f"Consider adding missing skills from JD: {', '.join(skills_missing)}")
    verbs_in_resume = set(extract_action_verbs(resume_data.get("projects", "") + "\n" + resume_data.get("achievements", "")))
    verbs_missing = set(ACTION_VERBS_LIST) - verbs_in_resume
    if verbs_missing:
        suggestions.append(f"Use more varied action verbs like: {', '.join(list(verbs_missing)[:10])}...")
    resume_certs = [c.lower() for c in resume_data.get("certifications", [])]
    missing_certs = [c for c in CERTIFICATIONS_LIST if c.lower() not in resume_certs]
    if missing_certs:
        suggestions.append(f"Add relevant certifications: {', '.join(missing_certs[:5])}...")
    project_analysis = analyze_projects(resume_data.get("projects", ""))
    if project_analysis["num_points"] < 3:
        suggestions.append("Add more points in projects section (less than 3 detected)")
    if project_analysis["avg_point_score"] < 0.5:
        suggestions.append("Enhance project bullets with numbers, skills, and action verbs")
    stats = resume_stats(resume_data.get("projects", "") + "\n" + resume_data.get("achievements", ""))
    if stats["num_words"] < 300:
        suggestions.append("Consider adding more details; resume is quite short (<300 words)")
    repetitions = repeated_words(resume_data.get("projects", "") + "\n" + resume_data.get("achievements", ""), only_words=verbs_in_resume)
    if repetitions:
        suggestions.append(f"Reduce repeated action verbs: {', '.join(list(repetitions.keys())[:10])}...")
    if project_analysis.get("contains_links") is False:
        suggestions.append("Add live demo / project links if available (GitHub, Vercel, Netlify) to increase credibility")
    return suggestions

def normalize_text(s):
    """
    Normalize text for loose matching:
    - lowercase
    - remove spaces, hyphens, symbols
    """
    return re.sub(r'[^a-z0-9]', '', (s or '').lower())

# ------------------ Main ATS verbose scorer ------------------
def ats_score_verbose(resume_file_path, job_title="", experience_level=""):
    print(f"Starting ATS scoring for: {resume_file_path}")
    print(f"Job Title: {job_title}, Experience Level: {experience_level}")
    
    resume_data = parse_resume(resume_file_path)
    text_combined = (resume_data.get("projects", "") or "") + "\n" + (resume_data.get("achievements", "") or "")
    raw_text = resume_data.get("raw_text", "") or ""

    input_title = normalize_text(job_title)
    input_exp = normalize_text(experience_level)

    relevant_jds = [
        jd for jd in JOB_DATASET
        if input_title in normalize_text(jd.get("Title", ""))
        and input_exp in normalize_text(jd.get("ExperienceLevel", ""))
    ]

    print(f"Matched JDs: {len(relevant_jds)}")

    # JD fallback if no match
    if not relevant_jds:
        relevant_jds = [{"Title": job_title, "ExperienceLevel": experience_level, "Skills": []}]

    action_verbs = extract_action_verbs(text_combined)
    buzzwords = extract_buzzwords(text_combined, resume_data.get("skills", []))
    project_analysis = analyze_projects(resume_data.get("projects", ""))
    all_reps = repeated_words(text_combined, only_words=action_verbs)
    repetition_ratio = sum([all_reps[w] - 1 for w in all_reps]) / len(text_combined.split()) if text_combined.split() else 0
    stats = resume_stats(text_combined)
    contacts = detect_contacts(raw_text)
    contacts_score = sum(1 for v in contacts.values() if v) / len(contacts) if contacts else 0

    all_scores = []
    all_skills_matched = []
    all_action_verbs = []
    all_buzzwords = []
    all_project_analysis = []
    all_valid_certs = []

    for jd in relevant_jds:
        jd_skills = jd.get("Skills", [])
        skills_match = match_skills(resume_data.get("skills", []), jd_skills)
        skills_score = skills_match["score_percent"] / 100.0
        action_verbs_score = min(len(set(action_verbs)) / 10.0, 1.0)
        buzzwords_score = min(len(buzzwords) / len(jd_skills), 1.0) if jd_skills else 1.0
        project_score = min(project_analysis["avg_point_score"], 1.0)
        resume_length_score = bell_curve_length_score(stats["num_words"])
        education_score = 1.0 if resume_data.get("education") else 0.0
        certifications_score, valid_certs = evaluate_certifications(resume_data.get("certifications", []), jd_specific_certs=jd_skills)
        summary_score = 1.0 if resume_data.get("summary") else 0.0

        contextual_score = (project_analysis.get("contextual_matches", 0) / project_analysis.get("num_points", 1)) if project_analysis.get("num_points", 0) else 0.0
        recency_score = recency_bonus(project_analysis)
        seniority_score = seniority_match_bonus(jd.get("Title", ""), raw_text)
        quantified_score = quantified_impact_bonus(project_analysis)
        formatting_score = formatting_check_bonus(resume_data.get("projects", ""), resume_data.get("achievements", ""), raw_text)

        metrics = {
            "skills_score": skills_score,
            "action_verbs_score": action_verbs_score,
            "buzzwords_score": buzzwords_score,
            "projects_score": project_score,
            "education_score": education_score,
            "certifications_score": certifications_score,
            "repetition_ratio": repetition_ratio,
            "resume_length_score": resume_length_score,
            "summary_score": summary_score,
            "contextual_score": contextual_score,
            "recency_score": recency_score,
            "seniority_score": seniority_score,
            "quantified_score": quantified_score,
            "formatting_score": formatting_score,
            "contacts_score": contacts_score,
            "projects_present": bool(resume_data.get("projects", "")),
            "achievements_present": bool(resume_data.get("achievements", "")),
            "skills_present": bool(resume_data.get("skills", [])),
            "project_links_present": project_analysis.get("contains_links", False)
        }

        score = calculate_ats_score(metrics)
        all_scores.append(score)

        all_skills_matched.append(skills_match)
        all_action_verbs.extend(action_verbs)
        all_buzzwords.extend(buzzwords)
        all_project_analysis.append(project_analysis)
        all_valid_certs.extend(valid_certs)

    avg_score = round(sum(all_scores) / len(all_scores)) if all_scores else 0
    best_score = max(all_scores) if all_scores else 0
    worst_score = min(all_scores) if all_scores else 0

    suggestions = generate_suggestions(resume_data, jd_skills=jd_skills)

    result = {
        "ats_score": avg_score,
        "best_score": best_score,
        "worst_score": worst_score,
        "all_scores": all_scores,
        "resume_data": resume_data,
        "skills_matched": all_skills_matched,
        "action_verbs": sorted(set(all_action_verbs)),
        "buzzwords": sorted(set(all_buzzwords)),
        "repetitions": all_reps,
        "project_analysis": all_project_analysis,
        "valid_certifications": sorted(set(all_valid_certs)),
        "education_present": bool(resume_data.get("education")),
        "improvement_suggestions": suggestions,
        "num_relevant_jds": len(relevant_jds)
    }
    
    print(f"ATS scoring completed. Score: {avg_score}")
    return result

# ------------------ Debug Run ------------------
if __name__ == "__main__":
    resume_path = "python_nlp_service/ResumeTests/Resume.pdf"
    job_title = "Software Developer - Entry Level"
    experience_level = "Fresher"

    import json
    result = ats_score_verbose(resume_path, job_title, experience_level)
    print(json.dumps(result, indent=2))