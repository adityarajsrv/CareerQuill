import PropTypes from "prop-types";

const ResumeTemplate1 = ({
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
    // Categorize skills with enhanced logic
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

    // Handle uncategorized skills
    const uncategorized = skillList.filter((s) =>
      !Object.values(skillsCategories).flat().includes(s)
    );
    if (uncategorized.length > 0) {
      skillsCategories["Other Skills"] = uncategorized;
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md border border-gray-300 text-sm">
      <header className="text-center mb-4">
        <h1 className="text-md font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {contactDetails && (
          <p className="text-[11px] text-black">{contactDetails}</p>
        )}
      </header>

      {summary && (
        <section className="mb-3">
          <h2 className="text-sm font-semibold border-b border-black pb-1">
            Summary
          </h2>
          <p className="text-[11px] mt-2">{summary}</p>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-semibold border-b border-black pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div
              key={edu.id}
              className="mt-2 text-[11px] flex flex-row justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-[11px]">{edu.school}</h3>
                <p className="italic">
                  {edu.degree}
                  {edu.field && (edu.degree ? ", " : "") + edu.field}
                </p>
              </div>
              <div className="flex flex-col items-end">
                {(edu.startDate || edu.endDate) && (
                  <p className="italic">
                    {edu.startDate} {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>
                )}
                {edu.gpa && (
                  <p className="font-medium italic">
                    {edu.degree.includes("Class") ? "Percentage" : "CGPA"}: {edu.gpa}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-semibold border-b border-black pb-1">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-2 text-xs">
              <div className="text-[11px] flex flex-row justify-between items-center">
                <h3 className="font-medium">{exp.position}</h3>
                <p className="font-medium">
                  {exp.startDate} {exp.endDate && !exp.current ? ` - ${exp.endDate}` : " - Present"}
                </p>
              </div>
              <p className="text-[11px] italic pb-1">{exp.company}</p>
              {exp.description && (
                <ul className="list-disc list-inside mt-1 space-y-1 text-[11px]">
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

      {projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-semibold border-b border-black pb-1">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mt-2 text-xs">
              <div className="text-[11px] flex flex-row justify-between items-center">
                <h3 className="font-medium">{proj.name}</h3>
                <p className="font-medium">
                  {proj.startDate} {proj.endDate ? ` - ${proj.endDate}` : ""}
                </p>
              </div>
              <p className="text-[11px] italic pb-1">{proj.name}</p>
              {proj.description && (
                <ul className="list-disc list-inside mt-1 space-y-1 text-[11px]">
                  {proj.description
                    .split(/(?<=[.!?])\s+/)
                    .filter(Boolean)
                    .map((point, i) => (
                      <li key={i}>{point.trim()}</li>
                    ))}
                </ul>
              )}
              {proj.url && (
                <p className="text-[11px] font-semibold pt-1">
                  Live Demo:{" "}
                  <a href={proj.url} className="text-blue-500">
                    {proj.url}
                  </a>
                </p>
              )}
              {proj.technologies && (
                <p className="text-[11px] mb-1">
                  <span className="font-semibold text-[11px]">Tech Stack: </span>
                  {proj.technologies}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {skills && skills.trim() && (
        <section className="mb-3 text-[11px]">
          <h2 className="text-sm font-semibold border-b border-black pb-1">
            Skills
          </h2>
          {Object.entries(skillsCategories).map(([category, items]) =>
            items.length > 0 ? (
              <div key={category} className="mt-1">
                <p className="text-[11px]">
                  <span className="font-medium">{category}: </span>
                  {items.join(", ")}
                </p>
              </div>
            ) : null
          )}
        </section>
      )}

      {achievements && (
        <section className="mb-3">
          <h2 className="text-sm font-semibold border-b border-black pb-1">
            Achievements
          </h2>
          <ul className="list-disc list-inside mt-1 space-y-1 text-[11px]">
            {achievements
              .split(/,\s*|\n\s*|- /)
              .filter(Boolean)
              .map((ach, index) => (
                <li key={index}>{ach}</li>
              ))}
          </ul>
        </section>
      )}

      {certifications && (
        <section className="mb-3">
          <h2 className="text-sm font-semibold border-b border-black pb-1">
            Certifications
          </h2>
          <ul className="list-disc list-inside mt-1 space-y-1 text-[11px]">
            {certifications
              .split(/,\s*|\n\s*|- /)
              .filter(Boolean)
              .map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
};

ResumeTemplate1.propTypes = {
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

export default ResumeTemplate1;