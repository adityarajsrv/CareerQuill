/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall, IoMailSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const ResumeTemplate5 = ({
  personalInfo,
  summary,
  education,
  experience,
  skills,
  projects,
  achievements,
}) => {
  // For Template5, we need to handle additional fields
  const [languages, setLanguages] = useState("");
  const [hobbies, setHobbies] = useState("");

  return (
    <div className="max-w-3xl mx-auto py-6 px-8 bg-white shadow-md border border-gray-300 text-sm">
      <div className="flex flex-row justify-between mb-5">
        <div className="flex flex-row space-x-3">
          <div className="h-28 w-28 mr-5 bg-gray-200 flex items-center justify-center text-gray-500">
            Profile
          </div>
          <div className="mt-3">
            <h2 className="text-4xl font-extrabold tracking-wide">
              {personalInfo.firstName?.toUpperCase() || "FIRST"}
            </h2>
            <h2 className="text-4xl font-bold">
              {personalInfo.lastName?.toUpperCase() || "LAST"}
            </h2>
            <p className="text-md tracking-wider">
              {/* This could be a new field or derived from experience */}
              {experience?.[0]?.position || "Professional Title"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1 mt-4">
          {personalInfo.phone && (
            <div className="flex flex-row justify-center items-center space-x-1.5">
              <p>{personalInfo.phone}</p>
              <IoCall />
            </div>
          )}
          {personalInfo.email && (
            <div className="flex flex-row justify-center items-center space-x-1.5">
              <p>{personalInfo.email}</p>
              <IoMailSharp />
            </div>
          )}
          {(personalInfo.address || personalInfo.city || personalInfo.state) && (
            <div className="flex flex-row justify-center items-center space-x-1.5">
              <p>
                {personalInfo.address || ""}
                {personalInfo.city && `, ${personalInfo.city}`}
                {personalInfo.state && `, ${personalInfo.state}`}
              </p>
              <FaLocationDot />
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex flex-row justify-center items-center space-x-1.5">
              <p>{personalInfo.linkedin}</p>
              <FaLinkedin />
            </div>
          )}
        </div>
      </div>
      <div className="h-0.25 w-full bg-black mb-3"></div>
      <div className="flex flex-row">
        <div className="w-1/3 pr-4">
          <div className="grid grid-cols-1 gap-6">
            {summary && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  PROFILE
                </h3>
                <p className="text-gray-600">{summary}</p>
              </div>
            )}
            
            {summary && <div className="h-0.25 w-full bg-black"></div>}
            
            {skills && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  SKILLS
                </h3>
                <ul className="list-disc list-inside space-y-1.5">
                  {skills.split('\n').filter(skill => skill.trim().length > 0).map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {skills && <div className="h-0.25 w-full bg-black"></div>}
            
            {/* Languages section - would need to be added to form */}
            {languages && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  LANGUAGE
                </h3>
                <ul className="list-disc list-inside space-y-1.5">
                  {languages.split('\n').filter(lang => lang.trim().length > 0).map((lang, index) => (
                    <li key={index}>{lang.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {languages && <div className="h-0.25 w-full bg-black"></div>}
            
            {achievements && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  ACHIEVEMENTS
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {achievements.split('\n').filter(ach => ach.trim().length > 0).map((ach, index) => (
                    <li key={index}>{ach.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {achievements && <div className="h-0.25 w-full bg-black"></div>}
            
            {/* Hobbies section - would need to be added to form */}
            {hobbies && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  HOBBIES/INTERESTS
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {hobbies.split('\n').filter(hobby => hobby.trim().length > 0).map((hobby, index) => (
                    <li key={index}>{hobby.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-0.25 bg-black mx-4"></div>
        
        <div className="w-2/3 pl-3">
          <div className="grid grid-cols-1 gap-6">
            {education && education.length > 0 && education[0].school && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  EDUCATION
                </h3>
                {education.map((edu, index) => (
                  edu.school && (
                    <div key={index} className={`${index > 0 ? 'mt-4' : 'mb-4'}`}>
                      <div className="flex flex-row justify-between">
                        <p className="font-medium">
                          • {edu.degree}{edu.field && `, ${edu.field}`}
                        </p>
                        <p className="text-gray-600">
                          {edu.startDate && `${edu.startDate} - `}
                          {edu.current ? "Present" : edu.endDate || ""}
                        </p>
                      </div>
                      <p className="text-gray-600">
                        {edu.school}
                        {edu.gpa && <><br />GPA: {edu.gpa}</>}
                      </p>
                    </div>
                  )
                ))}
              </div>
            )}
            
            {education && education.length > 0 && education[0].school && (
              <div className="h-0.25 w-full bg-black"></div>
            )}
            
            {experience && experience.length > 0 && experience[0].company && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  WORK EXPERIENCE
                </h3>
                {experience.map((exp, index) => (
                  exp.company && (
                    <div key={index} className="mb-4">
                      <div className="flex flex-row justify-between">
                        <p className="font-medium">{exp.company}</p>
                        <p className="text-gray-600">
                          {exp.startDate && `${exp.startDate} - `}
                          {exp.current ? "Present" : exp.endDate || ""}
                        </p>
                      </div>
                      <p className="text-gray-600">{exp.position}</p>
                      {exp.description && (
                        <ul className="list-disc list-inside space-y-1 ml-5">
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
            
            {experience && experience.length > 0 && experience[0].company && (
              <div className="h-0.25 w-full bg-black"></div>
            )}
            
            {projects && projects.length > 0 && projects[0].name && (
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                  PROJECTS
                </h3>
                {projects.map((project, index) => (
                  project.name && (
                    <div key={index} className={`${index > 0 ? 'mt-4' : 'mb-4'}`}>
                      <div className="flex flex-row justify-between">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-gray-600">
                          {project.startDate && `${project.startDate} - `}
                          {project.endDate || ""}
                        </p>
                      </div>
                      {project.technologies && (
                        <p className="text-sm text-gray-500 mb-2">{project.technologies}</p>
                      )}
                      {project.description && (
                        <ul className="list-disc list-inside space-y-1 ml-5">
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
          </div>
        </div>
      </div>
    </div>
  );
};

ResumeTemplate5.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  summary: PropTypes.string,
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired,
  skills: PropTypes.string,
  projects: PropTypes.array.isRequired,
  achievements: PropTypes.string,
  certifications: PropTypes.string,
};

export default ResumeTemplate5;