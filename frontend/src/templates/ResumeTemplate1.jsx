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
  Award,
  Scroll,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeTemplate1 from "../templates/ResumeTemplate1";

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Summary", icon: FileText },
  { id: 3, name: "Education", icon: GraduationCap },
  { id: 4, name: "Experience", icon: Briefcase },
  { id: 5, name: "Skills", icon: Code },
  { id: 6, name: "Projects", icon: FolderOpen },
  { id: 7, name: "Achievements", icon: Award },
  { id: 8, name: "Certifications", icon: Scroll },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error = false,
  ...props
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
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      required={required}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-500 mt-1">
        {type === "email"
          ? "Please enter a valid email address"
          : type === "number"
          ? "Please enter a valid year (e.g., 2023)"
          : "This field is required"}
      </p>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  required: false,
  error: false,
};

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  error = false,
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value ?? ""}
      onChange={onChange}
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      required={required}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-xs text-red-500 mt-1">Please select a month</p>
    )}
  </div>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
};

SelectField.defaultProps = {
  required: false,
  error: false,
};

const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false,
  error = false,
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical`}
      required={required}
    />
    {error && (
      <p className="text-xs text-red-500 mt-1">This field is required</p>
    )}
  </div>
);

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.bool,
};

TextArea.defaultProps = {
  rows: 4,
  required: false,
  error: false,
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
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    linkedin: "",
    github: "",
  });

  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [achievements, setAchievements] = useState("");
  const [certifications, setCertifications] = useState("");

  const [education, setEducation] = useState([
    {
      id: "1",
      school: "",
      degree: "",
      field: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      gpa: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      id: "1",
      company: "",
      position: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
      current: false,
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "",
      url: "",
      technologies: "",
      description: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    },
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
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (id) => {
    if (education.length > 1) {
      setEducation(education.filter((edu) => edu.id !== id));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`education-${id}-school`];
        delete newErrors[`education-${id}-degree`];
        return newErrors;
      });
    }
  };

  const updateEducation = (id, field, value) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`education-${id}-${field}`];
      return newErrors;
    });
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        description: "",
        current: false,
      },
    ]);
  };

  const removeExperience = (id) => {
    if (experience.length > 1) {
      setExperience(experience.filter((exp) => exp.id !== id));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`experience-${id}-company`];
        delete newErrors[`experience-${id}-position`];
        return newErrors;
      });
    }
  };

  const updateExperience = (id, field, value) => {
    setExperience(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`experience-${id}-${field}`];
      return newErrors;
    });
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
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
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

  const validateForm = () => {
    const newErrors = {};

    // Personal Info Validation
    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = true;
    }
    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = true;
    }

    // At least one contact method required
    if (!personalInfo.email.trim() && !personalInfo.phone.trim()) {
      newErrors.contact = true;
    } else if (
      personalInfo.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
    ) {
      newErrors.email = true;
    }

    // Education Validation - at least one education with school and degree
    let hasValidEducation = false;
    education.forEach((edu) => {
      if (!edu.school.trim() && edu.degree.trim()) {
        newErrors[`education-${edu.id}-school`] = true;
      }
      if (edu.school.trim() && !edu.degree.trim()) {
        newErrors[`education-${edu.id}-degree`] = true;
      }
      if (edu.school.trim() && edu.degree.trim()) {
        hasValidEducation = true;
      }

      // Date validation only if at least one date field is filled
      if (edu.startMonth || edu.startYear) {
        if (!edu.startMonth) newErrors[`education-${edu.id}-startMonth`] = true;
        if (!edu.startYear) newErrors[`education-${edu.id}-startYear`] = true;
      }
      if (edu.endMonth || edu.endYear) {
        if (!edu.endMonth) newErrors[`education-${edu.id}-endMonth`] = true;
        if (!edu.endYear) newErrors[`education-${edu.id}-endYear`] = true;
      }
    });

    if (!hasValidEducation) {
      newErrors.education = true;
    }

    // Skills Validation
    if (!skills.trim()) {
      newErrors.skills = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleGenerateResume = () => {
    if (validateForm()) {
      // Convert month/year to "Month YYYY" format for ResumeTemplate1
      const formattedEducation = education.map((edu) => ({
        ...edu,
        startDate:
          edu.startMonth && edu.startYear
            ? `${edu.startMonth} ${edu.startYear}`
            : "",
        endDate:
          edu.endMonth && edu.endYear ? `${edu.endMonth} ${edu.endYear}` : "",
      }));
      const formattedExperience = experience.map((exp) => ({
        ...exp,
        startDate:
          exp.startMonth && exp.startYear
            ? `${exp.startMonth} ${exp.startYear}`
            : "",
        endDate: exp.current
          ? ""
          : exp.endMonth && exp.endYear
          ? `${exp.endMonth} ${exp.endYear}`
          : "",
      }));
      const formattedProjects = projects.map((proj) => ({
        ...proj,
        startDate:
          proj.startMonth && proj.startYear
            ? `${proj.startMonth} ${proj.startYear}`
            : "",
        endDate:
          proj.endMonth && proj.endYear
            ? `${proj.endMonth} ${proj.endYear}`
            : "",
      }));

      setShowPreview(true);
      // Pass formatted data to ResumeTemplate1
      setEducation(formattedEducation);
      setExperience(formattedExperience);
      setProjects(formattedProjects);
    }
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
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Please fix the following errors:
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.firstName && <li>First name is required</li>}
                      {errors.lastName && <li>Last name is required</li>}
                      {errors.contact && (
                        <li>Either email or phone number is required</li>
                      )}
                      {errors.email && (
                        <li>Please enter a valid email address</li>
                      )}
                      {errors.education && (
                        <li>
                          At least one education entry with school and degree is
                          required
                        </li>
                      )}
                      {errors.skills && <li>Skills are required</li>}
                      {/* Add more specific error messages as needed */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!showPreview ? (
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
                      error={errors.firstName}
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
                      error={errors.lastName}
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
                      required={personalInfo.phone.trim() === ""}
                      error={errors.email}
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
                      required={personalInfo.email.trim() === ""}
                      error={errors.phone}
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
                    />
                    <InputField
                      label="City"
                      placeholder="New York"
                      value={personalInfo.city}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          city: e.target.value,
                        })
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
                    <InputField
                      label="Zip Code"
                      type="text"
                      placeholder="10001"
                      value={personalInfo.zipCode}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          zipCode: e.target.value,
                        })
                      }
                    />
                    <InputField
                      label="LinkedIn Profile"
                      type="url"
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      value={personalInfo.linkedin || ""}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          linkedin: e.target.value,
                        })
                      }
                    />
                    <InputField
                      label="GitHub Profile"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={personalInfo.github || ""}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          github: e.target.value,
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Provide at least one contact method (email or phone).
                  </p>
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
                    placeholder="Write a brief summary of your professional background, key skills, and career objectives (optional)..."
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
                          required
                          error={errors[`education-${edu.id}-school`]}
                        />
                        <InputField
                          label="Degree"
                          placeholder="Bachelor of Science"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, "degree", e.target.value)
                          }
                          required
                          error={errors[`education-${edu.id}-degree`]}
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
                        <div className="grid grid-cols-2 gap-2">
                          <SelectField
                            label="Start Month"
                            placeholder="Select month"
                            value={edu.startMonth}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "startMonth",
                                e.target.value
                              )
                            }
                            options={months}
                            error={errors[`education-${edu.id}-startMonth`]}
                          />
                          <InputField
                            label="Start Year"
                            type="number"
                            placeholder="2020"
                            value={edu.startYear}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "startYear",
                                e.target.value
                              )
                            }
                            min="1900"
                            max="2030"
                            error={errors[`education-${edu.id}-startYear`]}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <SelectField
                            label="End Month (or Expected)"
                            placeholder="Select month"
                            value={edu.endMonth}
                            onChange={(e) =>
                              updateEducation(
                                edu.id,
                                "endMonth",
                                e.target.value
                              )
                            }
                            options={months}
                            error={errors[`education-${edu.id}-endMonth`]}
                          />
                          <InputField
                            label="End Year (or Expected)"
                            type="number"
                            placeholder="2023"
                            value={edu.endYear}
                            onChange={(e) =>
                              updateEducation(edu.id, "endYear", e.target.value)
                            }
                            min="1900"
                            max="2030"
                            error={errors[`education-${edu.id}-endYear`]}
                          />
                        </div>
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
                          required={false}
                          error={errors[`experience-${exp.id}-company`]}
                        />
                        <InputField
                          label="Position"
                          placeholder="Software Developer"
                          value={exp.position}
                          onChange={(e) =>
                            updateExperience(exp.id, "position", e.target.value)
                          }
                          required={false}
                          error={errors[`experience-${exp.id}-position`]}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <SelectField
                            label="Start Month"
                            placeholder="Select month"
                            value={exp.startMonth}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "startMonth",
                                e.target.value
                              )
                            }
                            options={months}
                            error={errors[`experience-${exp.id}-startMonth`]}
                          />
                          <InputField
                            label="Start Year"
                            type="number"
                            placeholder="2020"
                            value={exp.startYear}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "startYear",
                                e.target.value
                              )
                            }
                            min="1900"
                            max="2030"
                            error={errors[`experience-${exp.id}-startYear`]}
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-2">
                            <SelectField
                              label="End Month (Optional)"
                              placeholder="Select month"
                              value={exp.endMonth}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "endMonth",
                                  e.target.value
                                )
                              }
                              options={months}
                              disabled={exp.current}
                              error={errors[`experience-${exp.id}-endMonth`]}
                            />
                            <InputField
                              label="End Year (Optional)"
                              type="number"
                              placeholder="2023"
                              value={exp.endYear}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "endYear",
                                  e.target.value
                                )
                              }
                              min="1900"
                              max="2030"
                              disabled={exp.current}
                              error={errors[`experience-${exp.id}-endYear`]}
                            />
                          </div>
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
                          label="Job Description (Optional)"
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
                    placeholder="List your technical and soft skills (e.g., JavaScript, Teamwork, React, Problem Solving)..."
                    value={skills}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setSkills(newValue);
                      setErrors((prev) => {
                        const updatedErrors = { ...prev };
                        delete updatedErrors.skills; // Clear skills error on change
                        return updatedErrors;
                      });
                    }}
                    rows={4}
                    required
                    error={errors.skills}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Separate skills with commas or bullet points (e.g., -
                    JavaScript, - Teamwork).
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
                          label="Project URL"
                          type="url"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm break-words focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2 min-h-[38px]"
                          error={false}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <SelectField
                            label="Start Month"
                            placeholder="Select month"
                            value={project.startMonth}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "startMonth",
                                e.target.value
                              )
                            }
                            options={months}
                            error={errors[`project-${project.id}-startMonth`]}
                          />
                          <InputField
                            label="Start Year"
                            type="number"
                            placeholder="2020"
                            value={project.startYear}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "startYear",
                                e.target.value
                              )
                            }
                            min="1900"
                            max="2030"
                            error={errors[`project-${project.id}-startYear`]}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <SelectField
                            label="End Month (or Expected)"
                            placeholder="Select month"
                            value={project.endMonth}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "endMonth",
                                e.target.value
                              )
                            }
                            options={months}
                            error={errors[`project-${project.id}-endMonth`]}
                          />
                          <InputField
                            label="End Year (or Expected)"
                            type="number"
                            placeholder="2023"
                            value={project.endYear}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "endYear",
                                e.target.value
                              )
                            }
                            min="1900"
                            max="2030"
                            error={errors[`project-${project.id}-endYear`]}
                          />
                        </div>
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

            {/* Achievements Section */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <SectionHeader
                step={steps[6]}
                isCollapsed={collapsedSections[7]}
                onToggle={() => toggleSection(7)}
              />
              {!collapsedSections[7] && (
                <div className="p-6 border-t border-gray-200">
                  <TextArea
                    label="Achievements"
                    placeholder="List your achievements (e.g., Won Hackathon, Published Research Paper)..."
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </div>

            {/* Certifications Section */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <SectionHeader
                step={steps[7]}
                isCollapsed={collapsedSections[8]}
                onToggle={() => toggleSection(8)}
              />
              {!collapsedSections[8] && (
                <div className="p-6 border-t border-gray-200">
                  <TextArea
                    label="Certifications"
                    placeholder="List your certifications (e.g., AWS Certified Developer, PMP)..."
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </div>

            {/* Generate Resume Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleGenerateResume}
                className="cursor-pointer flex items-center space-x-3 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Generate Resume
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => setShowPreview(false)}
            className="mb-4 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
          >
            Back to Editor
          </button>
          <ResumeTemplate1
            personalInfo={personalInfo}
            summary={summary}
            education={education}
            experience={experience}
            skills={skills}
            projects={projects}
            achievements={achievements}
            certifications={certifications}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

ResumeBuilder.propTypes = {
  // No props are passed to ResumeBuilder, so no validation needed
};

export default ResumeBuilder;

