import PropTypes from "prop-types";

const ResumeTemplate4 = ({
  personalInfo,
  summary,
  education,
  experience,
  skills,
  projects,
  achievements,
  certifications,
}) => {
  return (
    <div className="max-w-3xl mx-auto py-4 px-6 bg-white shadow-md border border-gray-300 text-sm">
      <div className="flex flex-row justify-start space-x-2 mb-2">
        {/* Profile image placeholder - you can replace with actual image upload functionality */}
        <div className="h-28 w-28 mr-5 bg-gray-200 flex items-center justify-center text-gray-500">
          Profile Image
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-0.5 text-blue-500">
            {personalInfo.firstName || "First"} {personalInfo.lastName || "Last"}
          </h3>
          <div className="flex flex-col space-x-2 text-gray-500">
            {personalInfo.address && (
              <p>
                <span className="font-semibold">Address: </span>
                {personalInfo.address}
                {personalInfo.city && `, ${personalInfo.city}`}
                {personalInfo.state && `, ${personalInfo.state}`}
                {personalInfo.zipCode && ` ${personalInfo.zipCode}`}
              </p>
            )}
            {personalInfo.phone && (
              <p>
                <span className="font-semibold">Phone: </span>
                {personalInfo.phone}
              </p>
            )}
            {personalInfo.email && (
              <p>
                <span className="font-semibold">Email: </span>
                {personalInfo.email}
              </p>
            )}
            {personalInfo.linkedin && (
              <p>
                <span className="font-semibold">LinkedIn: </span>
                {personalInfo.linkedin}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {summary && (
        <div className="mb-3 text-gray-600">
          <h3 className="font-bold py-1 text-blue-500">Summary</h3>
          <div className="h-0.25 bg-blue-400 w-full"></div>
          <p className="mt-2">{summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-3 text-gray-600">
          <h3 className="font-bold py-1 text-blue-500">Work Experience</h3>
          <div className="h-0.25 bg-blue-400 w-full"></div>
          {experience.map((exp, index) => (
            exp.company && (
              <div key={index} className={`${index > 0 ? 'mt-4' : 'mt-2'}`}>
                <h4 className="font-semibold">{exp.position || "Position"}</h4>
                <div className="flex flex-row justify-between">
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="font-semibold">
                    {exp.startDate && `${exp.startDate} - `}
                    {exp.current ? "Present" : exp.endDate || ""}
                  </p>
                </div>
                {exp.description && (
                  <ul className="list-disc pl-5 mt-1">
                    {exp.description.split(/[.!?]+/).filter(point => point.trim().length > 0).map((point, i) => (
                      <li key={i}>{point.trim()}{point.trim().endsWith('.') ? '' : '.'}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {education && education.length > 0 && education[0].school && (
        <div className="mb-3 text-gray-600">
          <h3 className="font-bold py-1 text-blue-500">Education</h3>
          <div className="h-0.25 bg-blue-400 w-full"></div>
          {education.map((edu, index) => (
            edu.school && (
              <div key={index} className={`${index > 0 ? 'mt-4' : 'mt-2'}`}>
                <div className="flex flex-row justify-between mb-0.5">
                  <h4 className="font-semibold">{edu.school}</h4>
                  <p className="font-semibold">
                    {edu.startDate && `${edu.startDate} - `}
                    {edu.current ? "Present" : edu.endDate || ""}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <p>{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-3 text-gray-600">
          <h3 className="font-bold py-1 text-blue-500">Projects</h3>
          <div className="h-0.25 bg-blue-400 w-full"></div>
          {projects.map((project, index) => (
            project.name && (
              <div key={index} className={`${index > 0 ? 'mt-4' : ''}`}>
                <h4 className="font-semibold">{project.name}</h4>
                {project.technologies && (
                  <p className="text-sm text-gray-500 mt-1">{project.technologies}</p>
                )}
                {project.description && (
                  <ul className="list-disc pl-5 mt-1">
                    {project.description.split(/[.!?]+/).filter(point => point.trim().length > 0).map((point, i) => (
                      <li key={i}>{point.trim()}{point.trim().endsWith('.') ? '' : '.'}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {skills && (
        <div className="mb-3 text-gray-600">
          <h3 className="font-bold py-1 text-blue-500">Skills</h3>
          <div className="h-0.25 bg-blue-400 w-full"></div>
          <ul className="list-disc pl-5 mt-1">
            {skills.split('\n').filter(skill => skill.trim().length > 0).map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {certifications && (
        <div className="mb-3 text-gray-600">
          <h3 className="font-bold py-1 text-blue-500">Certifications</h3>
          <div className="h-0.25 bg-blue-400 w-full"></div>
          <ul className="list-disc pl-5 mt-1">
            {certifications.split('\n').filter(cert => cert.trim().length > 0).map((cert, index) => (
              <li key={index}>{cert.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {achievements && (
        <div className="mb-1 text-gray-600">
          <h3 className="font-bold py-1 text-blue-500">Awards</h3>
          <div className="h-0.25 bg-blue-400 w-full"></div>
          <ul className="list-disc pl-5 mt-1">
            {achievements.split('\n').filter(award => award.trim().length > 0).map((award, index) => (
              <li key={index}>{award.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

ResumeTemplate4.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  summary: PropTypes.string,
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired,
  skills: PropTypes.string,
  projects: PropTypes.array.isRequired,
  achievements: PropTypes.string,
  certifications: PropTypes.string,
};

export default ResumeTemplate4;