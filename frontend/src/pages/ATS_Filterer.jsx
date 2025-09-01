import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import jobRoles from "../data/jobroles";

const ATS_Filterer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredRoles = jobRoles.filter((role) =>
    role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSearchTerm(role);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <div className="flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-16 gap-12 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Score Your Resume
          </h1>
          <h3 className="text-lg sm:text-xl font-medium text-gray-600 max-w-2xl">
            Select your job role and experience level to optimize your resume
          </h3>
        </div>
        <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col items-center space-y-6 transition-all duration-300 hover:shadow-2xl">
          <h4 className="text-lg font-semibold text-gray-800 tracking-wide">
            Target Job Role & Experience
          </h4>
          <div className="w-full space-y-6">
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Search job role..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
              />
              {isDropdownOpen && (
                <ul className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role, index) => (
                      <li
                        key={index}
                        onClick={() => handleRoleSelect(role)}
                        className="px-4 py-2.5 text-gray-800 hover:bg-blue-50 cursor-pointer transition-all duration-150 flex items-center text-sm font-medium"
                      >
                        <span>{role}</span>
                      </li>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No matching job roles found
                    </div>
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-gray-700 tracking-wide">
                Experience Level
              </h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: "entry_level", label: "Entry Level (0-2 years)" },
                  { value: "mid_level", label: "Mid Level (3-5 years)" },
                  { value: "senior_level", label: "Senior Level (5+ years)" },
                ].map((exp) => (
                  <label
                    key={exp.value}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                      selectedExperience === exp.value
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={exp.value}
                      checked={selectedExperience === exp.value}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="hidden"
                    />
                    <span className="text-gray-800 text-sm font-medium">
                      {exp.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button
            className="cursor-pointer w-full px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            disabled={!selectedRole || !selectedExperience}
          >
            Score My Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ATS_Filterer;
