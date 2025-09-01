import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ATS_Scoring = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

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
    try {
      if (!uploadedFile) {
        throw new Error("No file provided.");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUploadSuccess(true);
      setIsUploading(false);
    } catch {
      setUploadError("Failed to process the file. Please try again.");
      setUploadSuccess(false);
      setIsUploading(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setUploadSuccess(false);
    setUploadError(null);
  };

  const handleProceed = () => {
    if (uploadSuccess && file) {
      navigate("/ats_filter", { state: { file } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-between items-center px-16 py-20 gap-12 max-w-7xl mx-auto">
        <div className="max-w-xl space-y-5">
          <h1 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight">
            Resume ATS Scoring
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            Check how ATS-friendly your resume is. Get insights, keyword coverage,
            and actionable suggestions to improve your chances.
          </p>

          <ul className="space-y-3 text-lg text-gray-700">
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
          </ul>
        </div>

        <div className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
          <div
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 transform ${
              isDragging
                ? "border-blue-500 shadow-lg shadow-blue-400/50 scale-105 animate-pulse"
                : "border-blue-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-105"
            } ${isUploading || uploadSuccess ? "opacity-50 pointer-events-none" : ""}`}
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
            <label htmlFor="file-upload" className="flex flex-col items-center">
              <svg
                className={`w-14 h-14 mb-3 ${
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
              <p className="text-lg font-medium text-gray-700">
                {isUploading ? "Uploading..." : "Upload a PDF resume"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PDF only. We never store your files.
              </p>
              {!isUploading && !uploadSuccess && (
                <span className="mt-5 bg-blue-600 text-white px-6 py-3 text-lg rounded-lg shadow cursor-pointer hover:bg-blue-700 transition">
                  Upload PDF
                </span>
              )}
            </label>
          </div>

          {file && !isUploading && uploadSuccess && (
            <div className="mt-6 p-4 bg-green-100/70 rounded-xl w-full text-center">
              <p className="text-base text-green-700">File uploaded successfully!</p>
              <p className="text-lg font-medium text-gray-900">{file.name}</p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={handleClearFile}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition cursor-pointer"
                >
                  Change File
                </button>
                <button
                  onClick={handleProceed}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                >
                  Proceed to Analysis
                </button>
              </div>
            </div>
          )}

          {file && !isUploading && !uploadSuccess && !uploadError && (
            <div className="mt-6 p-4 bg-white/70 rounded-xl w-full text-center">
              <p className="text-base text-gray-700">Selected file:</p>
              <p className="text-lg font-medium text-gray-900">{file.name}</p>
            </div>
          )}

          {uploadError && (
            <div className="mt-6 p-4 bg-red-100/70 rounded-xl w-full text-center">
              <p className="text-base text-red-700">{uploadError}</p>
              <button
                onClick={handleClearFile}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
              >
                Try Another File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATS_Scoring;