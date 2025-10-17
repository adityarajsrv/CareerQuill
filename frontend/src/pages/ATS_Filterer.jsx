import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import jobRoles from "../data/jobroles";

const ATS_Filterer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [scoringError, setScoringError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the file and parsed data from navigation state
  const { file, parsedData } = location.state || {};

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

  // Redirect if no file data
  useEffect(() => {
    if (!file || !parsedData) {
      navigate("/ats_scoring");
    }
  }, [file, parsedData, navigate]);

  const handleScoreResume = async () => {
    if (!selectedRole || !selectedExperience || !file) return;

    setIsScoring(true);
    setScoringError(null);

    try {
      // Re-upload the file with job parameters for scoring
      const formData = new FormData();
      formData.append("file", file);
      
      // Add job parameters as query parameters
      const url = new URL("http://localhost:8000/api/ats/score");
      url.searchParams.append("job_title", selectedRole);
      url.searchParams.append("experience_level", selectedExperience);

      const res = await fetch(url.toString(), {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || `Scoring failed: ${res.status}`);
      }

      const scoreResult = await res.json();
      console.log("Scoring result:", scoreResult);

      // Navigate to result page with all data
      navigate("/ats_result", {
        state: {
          file,
          parsedData,
          scoreResult,
          jobTitle: selectedRole,
          experienceLevel: selectedExperience,
        }
      });

    } catch (err) {
      console.error("Scoring error:", err);
      setScoringError(err.message || "Failed to score resume. Please try again.");
    } finally {
      setIsScoring(false);
    }
  };

  // If no file data, show loading
  if (!file || !parsedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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
          
          {/* Resume Preview */}
          <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200 max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {parsedData.contact?.name || "Resume"} • {parsedData.skills?.length || 0} skills detected
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col items-center space-y-6 transition-all duration-300 hover:shadow-2xl">
          <h4 className="text-lg font-semibold text-gray-800 tracking-wide">
            Target Job Role & Experience
          </h4>
          
          {scoringError && (
            <div className="w-full p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{scoringError}</p>
            </div>
          )}

          <div className="w-full space-y-6">
            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Role *
              </label>
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
                <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level *
              </label>
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
            onClick={handleScoreResume}
            disabled={!selectedRole || !selectedExperience || isScoring}
            className="cursor-pointer w-full px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            {isScoring ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Scoring Resume...
              </>
            ) : (
              "Score My Resume"
            )}
          </button>

          <button
            onClick={() => navigate("/ats_scoring")}
            className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            ← Upload different resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ATS_Filterer;