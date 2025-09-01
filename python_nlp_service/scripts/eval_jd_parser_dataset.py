import json
from python_nlp_service.modules.jd_parser import parse_jd

# --- Sample job descriptions ---
sample_jds = [
    {
        "title": "Senior Data Scientist",
        "job_description": """
        We are looking for a Senior Data Scientist with 5+ years of experience in Python, R, and SQL. 
        Must have expertise in machine learning, deep learning, and natural language processing.
        Experience with TensorFlow, PyTorch, and Scikit-learn required. 
        Strong analytical thinking, problem-solving, and communication skills.
        Certification in AWS Machine Learning Specialty or TensorFlow Developer Certificate is a plus.
        Domain experience in finance or healthcare preferred.
        """
    },
    {
        "title": "Frontend Engineer",
        "job_description": """
        Responsibilities:
        - Develop responsive web applications using React, Vue.js, or Angular.
        - Collaborate with UX designers and backend engineers.
        - Tools: VS Code, Git, Jira.
        - 3-5 years of experience in frontend development required.
        - Strong teamwork, creativity, and adaptability skills.
        """
    },
    {
        "title": "Product Manager",
        "job_description": """
        Required: Experience in product roadmap planning, stakeholder management, and agile methodologies.
        Certifications: Certified Scrum Master or PMP preferred.
        Soft skills: leadership, strategic thinking, time management.
        Tools: Jira, Confluence, Trello.
        Minimum 4 years of experience in tech or e-commerce domain.
        """
    },
    {
        "title": "DevOps Engineer",
        "job_description": """
        Must have: Docker, Kubernetes, Jenkins, CI/CD pipelines, cloud platforms (AWS, GCP, Azure).
        Experience: 3+ years in DevOps or cloud engineering.
        Soft skills: problem solving, collaboration, adaptability.
        Certifications: Certified Kubernetes Administrator or AWS Solutions Architect.
        """
    },
    {
        "title": "UX Designer",
        "job_description": """
        Responsibilities:
        - Design wireframes, prototypes, and visual designs using Figma, Adobe XD, and Sketch.
        - Strong creativity, presentation skills, and attention to detail required.
        - Experience in UI/UX design for mobile and web platforms (2-4 years).
        - Knowledge of user research, usability testing, and design systems is a plus.
        """
    }
]

def main():
    print(f"Evaluating {len(sample_jds)} sample job descriptions...\n")
    
    for jd in sample_jds:
        print("="*80)
        print(f"TITLE: {jd['title']}\n")
        print("JOB DESCRIPTION:\n", jd["job_description"][:500], "...\n")
        parsed = parse_jd(jd["job_description"])
        print("PARSED OUTPUT:\n", json.dumps(parsed, indent=2, ensure_ascii=False))
        print("="*80)

if __name__ == "__main__":
    main()
