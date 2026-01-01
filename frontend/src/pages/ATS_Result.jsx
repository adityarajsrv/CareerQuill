/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Target,
  Sparkles,
  User,
  Briefcase,
  Award,
  TrendingUp,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import UserNavbar from "../components/Navbar";

const ATS_Result = () => {
  const { state } = useLocation();
  const scoreResult = state?.scoreResult;
  const atsScore = scoreResult?.best_score ?? 0;
  const jdMatchScore = scoreResult?.ats_score ?? 0;

  const categories = [
    { name: "Contact Info", score: 95, icon: User },
    { name: "Experience", score: 90, icon: Briefcase },
    { name: "Formatting", score: 85, icon: FileText },
    { name: "Keywords", score: 72, icon: Target },
    { name: "Skills", score: 68, icon: Award },
    { name: "Length", score: 60, icon: TrendingUp },
  ];
  const improvements =
    scoreResult?.improvement_suggestions?.map((text, index) => ({
      priority: index < 2 ? "High" : index < 4 ? "Medium" : "Low",
      title: text.split(".")[0],
      description: text,
    })) ?? [];

  const getStatus = (score) => {
    if (score >= 80)
      return { label: "Excellent", icon: CheckCircle, color: "text-green-600" };
    if (score >= 60)
      return { label: "Good", icon: AlertCircle, color: "text-yellow-600" };
    return { label: "Needs Improvement", icon: XCircle, color: "text-red-600" };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserNavbar />
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-blue-100 font-medium">
              Resume Analysis Complete
            </span>
          </div>
          <h1 className="text-3xl font-extrabold">
            ATS Resume Evaluation Report
          </h1>
          <p className="text-blue-100 mt-2">
            Review how well your resume performs in automated screening systems.
          </p>
        </div>
      </div>
      <div className="flex-grow py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SimpleScoreCard
              title="ATS Compatibility Score"
              subtitle="Resume readability for ATS software"
              score={atsScore}
              icon={FileText}
            />
            <SimpleScoreCard
              title="Job Description Match Score"
              subtitle="Relevance to the selected job role"
              score={jdMatchScore}
              icon={Target}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">
                Resume Section Overview
              </h3>
              <div className="space-y-3">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        {cat.score}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">
                Recommended Improvements
              </h3>
              <div className="space-y-4">
                {improvements.map((imp, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="text-xs font-semibold text-blue-600">
                      {imp.priority} Priority
                    </span>
                    <h4 className="font-semibold mt-1 text-sm">
                      {imp.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {imp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const SimpleScoreCard = ({ title, subtitle, score, icon: Icon }) => {
  const status = getScoreMeta(score);

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="text-5xl font-extrabold">{score}</div>
        <div className={`flex items-center gap-2 ${status.color}`}>
          <status.icon className="w-4 h-4" />
          <span className="font-semibold">{status.label}</span>
        </div>
      </div>
    </div>
  );
};

const getScoreMeta = (score) => {
  if (score >= 80)
    return { label: "Excellent", icon: CheckCircle, color: "text-green-600" };
  if (score >= 60)
    return { label: "Good", icon: AlertCircle, color: "text-yellow-600" };
  return { label: "Needs Improvement", icon: XCircle, color: "text-red-600" };
};

export default ATS_Result;
