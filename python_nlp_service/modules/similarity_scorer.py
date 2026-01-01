from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class SimilarityScorer:
    """
    TF-IDF + cosine similarity scorer.
    Compares JD text vs Resume text for overall semantic alignment.
    """

    def __init__(self, resume_data: dict, jd: dict):
        self.resume_data = resume_data
        self.jd = jd

    def _prepare_texts(self):
        """
        Flatten resume + JD dicts into comparable text strings.
        """
        resume_text = " ".join([
            " ".join(self.resume_data.get("skills", [])),
            self.resume_data.get("education", ""),
            self.resume_data.get("experience", ""),
            self.resume_data.get("projects", ""),
        ])

        jd_text = " ".join([
            " ".join(self.jd.get("Skills", [])),
            " ".join(self.jd.get("Education", [])),
            " ".join(map(str, self.jd.get("YearsOfExperience", []))),
            " ".join(self.jd.get("Certifications", [])),
        ])

        return resume_text, jd_text

    def compute_similarity(self) -> float:
        """
        Compute cosine similarity between JD and Resume texts.
        Returns a score between 0-100.
        """
        resume_text, jd_text = self._prepare_texts()

        if not resume_text.strip() or not jd_text.strip():
            return 0.0

        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform([resume_text, jd_text])

        sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return sim * 100


if __name__ == "__main__":
    # Demo
    resume_data = {
        "skills": ["Python", "JavaScript", "SQL"],
        "education": "B.Tech in Computer Science",
        "experience": "2 years working on web development with Python and React",
        "projects": "Built a SQL-backed web app using React",
    }

    jd = {
        "Skills": ["Python", "SQL", "React"],
        "Education": ["B.Tech", "B.Sc"],
        "YearsOfExperience": [1, 3],
        "Certifications": ["AWS Certified Developer"],
    }

    scorer = SimilarityScorer(resume_data, jd)
    print("Similarity Score:", scorer.compute_similarity())
