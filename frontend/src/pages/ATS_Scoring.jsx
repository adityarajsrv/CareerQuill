import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import jobRoles from "../data/jobroles";

const ATS_Scoring = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [scoringError, setScoringError] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setUploadError(null);
      handleUpload(uploadedFile);
    } else {
      setUploadError("Please upload a valid PDF file.");
      setUploadSuccess(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setUploadError(null);
      handleUpload(droppedFile);
    } else {
      setUploadError("Please upload a valid PDF file.");
      setUploadSuccess(false);
    }
  };

  const handleUpload = async (uploadedFile) => {
    setIsUploading(true);
    setUploadError(null);
    setScoringError(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await fetch("http://localhost:8000/api/ats/parse", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || `Upload failed: ${res.status}`);
      }

      const data = await res.json();
      console.log("Parsed resume data:", data);

      setParsedData(data);
      setUploadSuccess(true);
      setIsUploading(false);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(
        err.message || "Failed to process the file. Please try again."
      );
      setIsUploading(false);
      setUploadSuccess(false);
    }
  };

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
        },
      });
    } catch (err) {
      console.error("Scoring error:", err);
      setScoringError(
        err.message || "Failed to score resume. Please try again."
      );
    } finally {
      setIsScoring(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setUploadSuccess(false);
    setUploadError(null);
    setParsedData(null);
    setSelectedRole("");
    setSelectedExperience("");
    setSearchTerm("");
    setScoringError(null);
  };

  const isFormComplete =
    file && selectedRole && selectedExperience && uploadSuccess;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 lg:px-16 py-12 lg:py-20 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Left Section - Content */}
        <div className="max-w-xl space-y-5">
          <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Resume ATS Scoring
          </h1>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
            Upload your resume and select your target role to get detailed ATS
            compatibility analysis and improvement suggestions.
          </p>

          <ul className="space-y-3 text-base lg:text-lg text-gray-700">
            <li className="flex items-center gap-3">
              <span className="text-blue-500 text-2xl">✔</span>
              Keyword match analysis vs. job description
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-500 text-2xl">✔</span>
              Format and structure checks for ATS parsers
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-500 text-2xl">✔</span>
              Clear, actionable improvement tips
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-500 text-2xl">✔</span>
              Experience-level specific recommendations
            </li>
          </ul>
        </div>

        {/* Right Section - Upload & Job Selection */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-3xl p-6 lg:p-10 w-full max-w-md flex flex-col items-center">
          {/* File Upload Section */}
          <div className="w-full mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Upload Your Resume
            </h3>

            <div
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 transform ${
                isDragging
                  ? "border-blue-500 shadow-lg shadow-blue-400/50 scale-105 animate-pulse"
                  : "border-blue-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-105"
              } ${
                isUploading || uploadSuccess
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading || uploadSuccess}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center"
              >
                <svg
                  className={`w-12 h-12 mb-3 ${
                    isUploading ? "text-gray-400 animate-spin" : "text-blue-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isUploading
                        ? "M12 4v16m8-8H4"
                        : "M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6h.1a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    }
                  />
                </svg>
                <p className="text-base font-medium text-gray-700 text-center">
                  {isUploading ? "Uploading..." : "Upload a PDF resume"}
                </p>
                <p className="text-sm text-gray-500 mt-1 text-center">
                  PDF only. We never store your files.
                </p>
                {!isUploading && !uploadSuccess && (
                  <span className="mt-4 bg-blue-600 text-white px-4 py-2 text-sm rounded-lg shadow cursor-pointer hover:bg-blue-700 transition">
                    Upload PDF
                  </span>
                )}
              </label>
            </div>

            {/* File Status */}
            {file && !isUploading && uploadSuccess && (
              <div className="mt-4 p-3 bg-green-100/70 rounded-xl text-center">
                <p className="text-sm text-green-700">
                  File uploaded successfully!
                </p>
                <p className="text-base font-medium text-gray-900">
                  {file.name}
                </p>
                {parsedData && (
                  <p className="text-xs text-gray-600 mt-1">
                    {parsedData.contact?.name || "Resume"} •{" "}
                    {parsedData.skills?.length || 0} skills detected
                  </p>
                )}
              </div>
            )}

            {file && !isUploading && !uploadSuccess && !uploadError && (
              <div className="mt-4 p-3 bg-white/70 rounded-xl text-center">
                <p className="text-sm text-gray-700">Selected file:</p>
                <p className="text-base font-medium text-gray-900">
                  {file.name}
                </p>
              </div>
            )}

            {uploadError && (
              <div className="mt-4 p-3 bg-red-100/70 rounded-xl text-center">
                <p className="text-sm text-red-700">{uploadError}</p>
                <button
                  onClick={handleClearFile}
                  className="mt-2 bg-gray-500 text-white px-3 py-1 text-sm rounded-lg shadow hover:bg-gray-600 transition"
                >
                  Try Another File
                </button>
              </div>
            )}
          </div>

          {/* Job Selection Section - Only show after successful upload */}
          {uploadSuccess && (
            <div className="w-full space-y-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Target Job Details
              </h3>

              {scoringError && (
                <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm">{scoringError}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Job Role Selection */}
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
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
                  />
                  {isDropdownOpen && (
                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {filteredRoles.length > 0 ? (
                        filteredRoles.map((role, index) => (
                          <li
                            key={index}
                            onClick={() => handleRoleSelect(role)}
                            className="px-3 py-2 text-gray-800 hover:bg-blue-50 cursor-pointer transition-all duration-150 text-sm font-medium"
                          >
                            {role}
                          </li>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500 text-sm">
                          No matching job roles found
                        </div>
                      )}
                    </ul>
                  )}
                </div>
                {/* Experience Level Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level *
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        value: "fresher",
                        label: "Fresher / Entry Level (0-2 years)",
                      },
                      { value: "experienced", label: "Experienced (2+ years)" },
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
                          onChange={(e) =>
                            setSelectedExperience(e.target.value)
                          }
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

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleClearFile}
                  className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-xl font-semibold shadow hover:bg-gray-600 transition cursor-pointer text-sm"
                >
                  Change File
                </button>
                <button
                  onClick={handleScoreResume}
                  disabled={!isFormComplete || isScoring}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm flex items-center justify-center gap-2"
                >
                  {isScoring ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Resume"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Initial Upload Prompt */}
          {!uploadSuccess && !file && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Upload your resume to begin analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATS_Scoring;
