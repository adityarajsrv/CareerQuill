import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";

export default function ATSUploadHero({ onAnalyze }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handlePick = () => fileInputRef.current?.click();

  function reset() {
    setFile(null);
    setError("");
    setProcessing(false);
    setResult(null);
  }

  const validateAndSet = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      // optional size limit (5MB)
      setError("File is too large. Please use a PDF under 5MB.");
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    validateAndSet(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    validateAndSet(f);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  async function handleAnalyze() {
    if (!file) {
      setError("Select a PDF to analyze.");
      return;
    }

    setError("");
    setProcessing(true);
    setResult(null);

    // If parent passed onAnalyze, call it (allowing server analysis).
    if (onAnalyze) {
      try {
        const remoteResult = await onAnalyze(file);
        setResult(remoteResult);
      } catch (err) {
        setError(err?.message || "Analysis failed. Try again.");
      } finally {
        setProcessing(false);
      }
      return;
    }

    // Otherwise simulate analysis locally (fake results)
    setTimeout(() => {
      const fakeScore = Math.max(30, Math.round(80 - Math.random() * 40));
      const keywords = Math.round(Math.random() * 10 + 3);
      setResult({ score: fakeScore, keywordsFound: keywords });
      setProcessing(false);
    }, 1200);
  }

  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-b from-sky-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Pass the ATS. Get seen.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Upload your resume for an instant ATS check — keyword matching,
              format issues, and clear fixes you can apply in minutes.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-6 h-6 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9 12.5l1.8 1.8L15 10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm">Job-specific keyword matching</span>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-6 h-6 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 10h8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-sm">
                  ATS-friendly format and structure checks
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  <svg
                    className="w-6 h-6 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5v6l4 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <span className="text-sm">
                  Clear, prioritized improvement tips
                </span>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handlePick}
                className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3v12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 7l4-4 4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Upload Resume
              </button>

              <button
                onClick={() =>
                  window.scrollTo({ top: 700, behavior: "smooth" })
                }
                className="text-sm text-slate-600 hover:underline"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Right panel - Upload card */}
          <div className="w-full lg:w-[420px]">
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={`rounded-lg border-2 ${
                  file ? "border-sky-200" : "border-dashed border-slate-200"
                } p-6 text-center cursor-pointer`}
                onClick={handlePick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handlePick();
                }}
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5v10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="mt-4 text-sm text-slate-600">
                  Upload a PDF resume
                </p>

                <div className="mt-5 flex items-center justify-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="sr-only"
                    onChange={handleFileChange}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePick();
                    }}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    Choose PDF
                  </button>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  PDF only. We never store your files.
                </p>
              </div>

              {/* selected file / actions */}
              <div className="mt-4">
                {error && <p className="text-sm text-rose-600">{error}</p>}

                {file && (
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-8 h-8 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2v6h6"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-sm">
                        <div className="font-medium text-slate-800">
                          {file.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {(file.size / 1024).toFixed(0)} KB
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={reset}
                        className="text-sm text-slate-600 hover:underline"
                      >
                        Remove
                      </button>

                      <button
                        onClick={handleAnalyze}
                        disabled={processing}
                        className={`inline-flex items-center gap-2 bg-sky-600 text-white px-3 py-1.5 rounded-md font-medium disabled:opacity-60 disabled:cursor-not-allowed`}
                      >
                        {processing ? (
                          <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="opacity-20"
                            />
                            <path
                              d="M22 12a10 10 0 0 0-10-10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5v14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 12h14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <span>{processing ? "Analyzing..." : "Analyze"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* result */}
                {result && (
                  <div className="mt-4 border border-slate-100 rounded-md p-3 bg-sky-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-600">ATS Score</div>
                        <div className="text-2xl font-semibold text-slate-900">
                          {result.score} / 100
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-600">
                          Keywords found
                        </div>
                        <div className="text-lg font-medium text-slate-800">
                          {result.keywordsFound}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-slate-700">
                      <p className="mb-1">Suggested next steps:</p>
                      <ol className="list-decimal list-inside text-slate-600">
                        <li>
                          Compare found keywords with the job description.
                        </li>
                        <li>
                          Fix any complex formatting (tables, images) that may
                          break parsers.
                        </li>
                        <li>Apply suggested wording from the full report.</li>
                      </ol>
                    </div>
                  </div>
                )}

                <p className="sr-only" aria-live="polite">
                  {processing
                    ? "Analyzing resume"
                    : result
                    ? "Analysis complete"
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

ATSUploadHero.propTypes = {
  onAnalyze: PropTypes.func,
};
