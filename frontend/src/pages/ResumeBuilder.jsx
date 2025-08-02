import { useState } from "react";
import PropTypes from "prop-types";
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Code,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Summary", icon: FileText },
  { id: 3, name: "Education", icon: GraduationCap },
  { id: 4, name: "Experience", icon: Briefcase },
  { id: 5, name: "Skills", icon: Code },
  { id: 6, name: "Projects", icon: FolderOpen },
];

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      required={required}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  required: false,
};

const TextArea = ({ label, placeholder, value, onChange, rows = 4 }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
    />
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
};

TextArea.defaultProps = {
  rows: 4,
};

const SectionHeader = ({ step, isCollapsed, onToggle }) => {
  const Icon = step.icon;
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-t-lg hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{step.name}</h2>
      </div>
      {isCollapsed ? (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );
};

SectionHeader.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const ResumeBuilder = () => {
  const [collapsedSections, setCollapsedSections] = useState({});

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");

  const [education, setEducation] = useState([
    {
      id: "1",
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      id: "1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  ]);

  const [projects, setProjects] = useState([
    { id: "1", name: "", url: "", technologies: "", description: "" },
  ]);

  const toggleSection = (stepId) => {
    setCollapsedSections((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (id) => {
    if (education.length > 1) {
      setEducation(education.filter((edu) => edu.id !== id));
    }
  };

  const updateEducation = (id, field, value) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      },
    ]);
  };

  const removeExperience = (id) => {
    if (experience.length > 1) {
      setExperience(experience.filter((exp) => exp.id !== id));
    }
  };

  const updateExperience = (id, field, value) => {
    setExperience(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        name: "",
        url: "",
        technologies: "",
        description: "",
      },
    ]);
  };

  const removeProject = (id) => {
    if (projects.length > 1) {
      setProjects(projects.filter((proj) => proj.id !== id));
    }
  };

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <p className="text-gray-600 mt-1">
            Create your professional resume in minutes
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <SectionHeader
              step={steps[0]}
              isCollapsed={collapsedSections[1]}
              onToggle={() => toggleSection(1)}
            />
            {!collapsedSections[1] && (
              <div className="p-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    placeholder="John"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="Last Name"
                    placeholder="Doe"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="Phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="Street Address"
                    placeholder="123 Main Street"
                    value={personalInfo.address}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        address: e.target.value,
                      })
                    }
                    className="md:col-span-2"
                  />
                  <InputField
                    label="City"
                    placeholder="New York"
                    value={personalInfo.city}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, city: e.target.value })
                    }
                  />
                  <InputField
                    label="State"
                    placeholder="NY"
                    value={personalInfo.state}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        state: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <SectionHeader
              step={steps[1]}
              isCollapsed={collapsedSections[2]}
              onToggle={() => toggleSection(2)}
            />
            {!collapsedSections[2] && (
              <div className="p-6 border-t border-gray-200">
                <TextArea
                  label="Professional Summary"
                  placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <SectionHeader
              step={steps[2]}
              isCollapsed={collapsedSections[3]}
              onToggle={() => toggleSection(3)}
            />
            {!collapsedSections[3] && (
              <div className="p-6 border-t border-gray-200">
                {education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className={
                      index > 0 ? "pt-6 mt-6 border-t border-gray-200" : ""
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Education {index + 1}
                      </h3>
                      {education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="School/University"
                        placeholder="University of Example"
                        value={edu.school}
                        onChange={(e) =>
                          updateEducation(edu.id, "school", e.target.value)
                        }
                      />
                      <InputField
                        label="Degree"
                        placeholder="Bachelor of Science"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                      />
                      <InputField
                        label="Field of Study"
                        placeholder="Computer Science"
                        value={edu.field}
                        onChange={(e) =>
                          updateEducation(edu.id, "field", e.target.value)
                        }
                      />
                      <InputField
                        label="GPA (Optional)"
                        placeholder="3.8"
                        value={edu.gpa}
                        onChange={(e) =>
                          updateEducation(edu.id, "gpa", e.target.value)
                        }
                      />
                      <InputField
                        label="Start Date"
                        type="date"
                        placeholder="dd-mm-yyyy"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateEducation(edu.id, "startDate", e.target.value)
                        }
                      />
                      <InputField
                        label="End Date"
                        type="date"
                        placeholder="dd-mm-yyyy"
                        value={edu.endDate}
                        onChange={(e) =>
                          updateEducation(edu.id, "endDate", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Education</span>
                </button>
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <SectionHeader
              step={steps[3]}
              isCollapsed={collapsedSections[4]}
              onToggle={() => toggleSection(4)}
            />
            {!collapsedSections[4] && (
              <div className="p-6 border-t border-gray-200">
                {experience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={
                      index > 0 ? "pt-6 mt-6 border-t border-gray-200" : ""
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Experience {index + 1}
                      </h3>
                      {experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Company"
                        placeholder="Tech Company Inc."
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                      />
                      <InputField
                        label="Position"
                        placeholder="Software Developer"
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(exp.id, "position", e.target.value)
                        }
                      />
                      <InputField
                        label="Start Date"
                        type="date"
                        placeholder="dd-mm-yyyy"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
                        }
                      />
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          disabled={exp.current}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "current",
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">
                            I currently work here
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <TextArea
                        label="Job Description"
                        placeholder="Describe your responsibilities, achievements, and impact in this role..."
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Experience</span>
                </button>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <SectionHeader
              step={steps[4]}
              isCollapsed={collapsedSections[5]}
              onToggle={() => toggleSection(5)}
            />
            {!collapsedSections[5] && (
              <div className="p-6 border-t border-gray-200">
                <TextArea
                  label="Skills"
                  placeholder="List your technical skills, programming languages, frameworks, tools, etc. Separate with commas or use bullet points..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tip: Include both technical and soft skills relevant to your
                  target position.
                </p>
              </div>
            )}
          </div>

          {/* Projects */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <SectionHeader
              step={steps[5]}
              isCollapsed={collapsedSections[6]}
              onToggle={() => toggleSection(6)}
            />
            {!collapsedSections[6] && (
              <div className="p-6 border-t border-gray-200">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={
                      index > 0 ? "pt-6 mt-6 border-t border-gray-200" : ""
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Project {index + 1}
                      </h3>
                      {projects.length > 1 && (
                        <button
                          onClick={() => removeProject(project.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Project Name"
                        placeholder="E-commerce Platform"
                        value={project.name}
                        onChange={(e) =>
                          updateProject(project.id, "name", e.target.value)
                        }
                      />
                      <InputField
                        label="Project URL (Optional)"
                        placeholder="https://github.com/username/project"
                        value={project.url}
                        onChange={(e) =>
                          updateProject(project.id, "url", e.target.value)
                        }
                      />
                      <InputField
                        label="Technologies Used"
                        placeholder="React, Node.js, MongoDB, AWS"
                        value={project.technologies}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            "technologies",
                            e.target.value
                          )
                        }
                        className="md:col-span-2"
                      />
                    </div>
                    <div className="mt-4">
                      <TextArea
                        label="Project Description"
                        placeholder="Describe the project, your role, key features, and achievements..."
                        value={project.description}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProject}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Project</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="cursor-pointer flex items-center space-x-3 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Generate Resume
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

ResumeBuilder.propTypes = {
  // No props are passed to ResumeBuilder, so no validation needed
};

export default ResumeBuilder;
