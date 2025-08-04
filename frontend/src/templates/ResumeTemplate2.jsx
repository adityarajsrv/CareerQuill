import PropTypes from "prop-types";

const ResumeTemplate2 = ({
  personalInfo,
  summary,
  education,
  experience,
  skills,
  projects,
  achievements,
  certifications,
}) => {
  // Format contact info
  const contactDetails = [
    personalInfo.email,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.phone,
  ]
    .filter(Boolean)
    .join(" | ");

  // Parse skills if provided as a comma-separated string or bullet points
  const skillsCategories = {
    Languages: [],
    "Frameworks & Libraries": [],
    Databases: [],
    "Web Technologies": [],
    Tools: [],
    "CS Core": [],
  };

  if (skills && skills.trim()) {
    const skillList = skills
      .split(/,\s*|\n\s*|- /)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    skillsCategories.Languages = skillList.filter((s) =>
      ["Java", "Python", "JavaScript", "SQL", "HTML", "CSS", "TypeScript"].includes(s)
    );
    skillsCategories["Frameworks & Libraries"] = skillList.filter((s) =>
      ["React.js", "Redux", "Node.js", "Express.js", "Tailwind CSS", "Axios", "Zustand", "ShadCN"].includes(s)
    );
    skillsCategories.Databases = skillList.filter((s) => ["MySQL", "MongoDB"].includes(s));
    skillsCategories["Web Technologies"] = skillList.filter((s) =>
      ["RESTful APIs", "JWT Authentication", "JSON", "Multi-browser Support", "Responsive Design", "WebRTC", "Socket.io"].includes(s)
    );
    skillsCategories.Tools = skillList.filter((s) =>
      ["Git", "GitHub", "Postman", "VS Code", "MongoDB Atlas", "Render", "Vercel"].includes(s)
    );
    skillsCategories["CS Core"] = skillList.filter((s) =>
      ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Networking"].includes(s)
    );

    const uncategorized = skillList.filter((s) =>
      !Object.values(skillsCategories).flat().includes(s)
    );
    if (uncategorized.length > 0) {
      skillsCategories["Other Skills"] = uncategorized;
    }
  }

  // Check if a section has valid content
  const hasValidEducation = education.some(
    (edu) => edu.school.trim() || edu.degree.trim() || edu.field.trim() || edu.gpa.trim() || edu.startDate.trim() || edu.endDate.trim()
  );
  const hasValidExperience = experience.some(
    (exp) => exp.company.trim() || exp.position.trim() || exp.description.trim() || exp.startDate.trim() || exp.endDate.trim()
  );
  const hasValidProjects = projects.some(
    (proj) => proj.name.trim() || proj.description.trim() || proj.technologies.trim() || proj.url.trim() || proj.startDate.trim() || proj.endDate.trim()
  );

  const downloadPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const resumeElement = document.getElementById('resume-content');
    window.html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= doc.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= doc.internal.pageSize.getHeight();
      }

      const fileName = `${personalInfo.firstName}_${personalInfo.lastName}_Resume.pdf`;
      doc.save(fileName);
    }).catch((error) => {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    });
  };

  return (
    <div>
      <button
        id="download-pdf"
        onClick={downloadPDF}
        className="hidden"
      />
      <div id="resume-content" className="max-w-4xl mx-auto p-6 bg-white shadow-lg border border-gray-200 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar (Contact Info & Skills) */}
          <aside className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <header className="text-center mb-4">
              <h1 className="text-xl font-bold text-gray-900">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              {contactDetails && (
                <p className="text-xs text-gray-600 mt-2">{contactDetails}</p>
              )}
            </header>
            {skills && skills.trim() && (
              <section className="mt-6">
                <h2 className="text-sm font-semibold border-b border-gray-300 pb-1">Skills</h2>
                {Object.entries(skillsCategories).map(([category, items]) =>
                  items.length > 0 ? (
                    <div key={category} className="mt-2">
                      <p className="text-xs font-medium text-gray-700">{category}</p>
                      <p className="text-xs text-gray-600">{items.join(", ")}</p>
                    </div>
                  ) : null
                )}
              </section>
            )}
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            {summary && summary.trim() && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold border-b border-gray-300 pb-1">Summary</h2>
                <p className="text-xs mt-2 text-gray-700">{summary}</p>
              </section>
            )}

            {hasValidEducation && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold border-b border-gray-300 pb-1">Education</h2>
                {education
                  .filter((edu) => edu.school.trim() || edu.degree.trim())
                  .map((edu) => (
                    <div key={edu.id} className="mt-4">
                      <h3 className="text-xs font-medium text-gray-900">{edu.school}</h3>
                      <p className="text-xs italic text-gray-600">
                        {edu.degree} {edu.field && (edu.degree ? ", " : "") + edu.field}
                      </p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate || ""}</p>
                      )}
                      {edu.gpa && (
                        <p className="text-xs text-gray-500">{edu.degree.includes("Class") ? "Percentage" : "CGPA"}: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
              </section>
            )}

            {hasValidExperience && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold border-b border-gray-300 pb-1">Experience</h2>
                {experience
                  .filter((exp) => exp.company.trim() || exp.position.trim() || exp.description.trim())
                  .map((exp) => (
                    <div key={exp.id} className="mt-4">
                      <h3 className="text-xs font-medium text-gray-900">{exp.position}</h3>
                      <p className="text-xs italic text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} - {exp.endDate || (exp.current ? "Present" : "")}
                      </p>
                      {exp.description && (
                        <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-gray-700">
                          {exp.description
                            .split("\n")
                            .filter(Boolean)
                            .map((desc, i) => (
                              <li key={i}>{desc.replace(/^- /, "")}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </section>
            )}

            {hasValidProjects && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold border-b border-gray-300 pb-1">Projects</h2>
                {projects
                  .filter((proj) => proj.name.trim() || proj.description.trim() || proj.technologies.trim() || proj.url.trim())
                  .map((proj) => (
                    <div key={proj.id} className="mt-4">
                      <h3 className="text-xs font-medium text-gray-900">{proj.name}</h3>
                      <p className="text-xs text-gray-500">
                        {proj.startDate} - {proj.endDate || ""}
                      </p>
                      {proj.description && (
                        <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-gray-700">
                          {proj.description
                            .split(/(?<=[.!?])\s+/)
                            .filter(Boolean)
                            .map((point, i) => (
                              <li key={i}>{point.trim()}</li>
                            ))}
                        </ul>
                      )}
                      {proj.url && (
                        <p className="text-xs text-blue-600 mt-1">
                          <a href={proj.url} target="_blank" rel="noopener noreferrer">Live Demo</a>
                        </p>
                      )}
                      {proj.technologies && (
                        <p className="text-xs text-gray-600 mt-1">Tech: {proj.technologies}</p>
                      )}
                    </div>
                  ))}
              </section>
            )}

            {achievements && achievements.trim() && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold border-b border-gray-300 pb-1">Achievements</h2>
                <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-gray-700">
                  {achievements
                    .split(/,\s*|\n\s*|- /)
                    .filter(Boolean)
                    .map((ach, index) => (
                      <li key={index}>{ach}</li>
                    ))}
                </ul>
              </section>
            )}

            {certifications && certifications.trim() && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold border-b border-gray-300 pb-1">Certifications</h2>
                <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-gray-700">
                  {certifications
                    .split(/,\s*|\n\s*|- /)
                    .filter(Boolean)
                    .map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

ResumeTemplate2.propTypes = {
  personalInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string,
  }).isRequired,
  summary: PropTypes.string,
  education: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      school: PropTypes.string,
      degree: PropTypes.string,
      field: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      gpa: PropTypes.string,
      current: PropTypes.bool,
    })
  ).isRequired,
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      company: PropTypes.string,
      position: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      description: PropTypes.string,
      current: PropTypes.bool,
    })
  ).isRequired,
  skills: PropTypes.string,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string,
      technologies: PropTypes.string,
      description: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ).isRequired,
  achievements: PropTypes.string,
  certifications: PropTypes.string,
};

export default ResumeTemplate2;