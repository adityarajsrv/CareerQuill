import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Download,
  Target,
  TrendingUp,
  FileText,
  User,
  Briefcase,
  Award,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import Footer from "../components/Footer";
import UserNavbar from "../components/Navbar";

const ATS_Result = () => {
  const atsScore = 78;
  const jdMatchScore = 65;
  const maxScore = 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const atsStrokeDashoffset =
    circumference - (atsScore / maxScore) * circumference;
  const jdStrokeDashoffset =
    circumference - (jdMatchScore / maxScore) * circumference;

  const categories = [
    { name: "Contact Info", score: 95, status: "good", icon: User },
    { name: "Experience", score: 90, status: "good", icon: Briefcase },
    { name: "Formatting", score: 85, status: "good", icon: FileText },
    { name: "Keywords", score: 72, status: "warning", icon: Target },
    { name: "Skills", score: 68, status: "warning", icon: Award },
    { name: "Length", score: 60, status: "critical", icon: TrendingUp },
  ].sort((a, b) => b.score - a.score);

  const improvements = [
    {
      priority: "high",
      category: "Keywords",
      title: "Add industry-specific keywords",
      description:
        'Include 5-7 more relevant keywords from the job description, particularly "cloud computing", "agile methodology", and "data analysis".',
      impact: "+8 points",
      time: "5 min",
    },
    {
      priority: "high",
      category: "Length",
      title: "Optimize resume length",
      description:
        "Your resume is too lengthy. Reduce to 1-2 pages by removing redundant information and focusing on recent, relevant experience.",
      impact: "+12 points",
      time: "15 min",
    },
    {
      priority: "medium",
      category: "Skills",
      title: "Quantify achievements",
      description:
        'Add specific metrics and numbers to your accomplishments. Replace "improved efficiency" with "improved efficiency by 25%".',
      impact: "+6 points",
      time: "10 min",
    },
    {
      priority: "low",
      category: "Formatting",
      title: "Enhance section headers",
      description:
        "Use consistent formatting for all section headers and ensure proper spacing between sections.",
      impact: "+3 points",
      time: "5 min",
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "critical":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "low":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <UserNavbar />
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-blue-100 font-medium">Resume Analysis Complete</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold">Resume ATS Analysis</h1>
              <p className="text-blue-100 mt-2 text-lg max-w-2xl">
                Your resume scored <span className="font-semibold text-white">{atsScore}/100</span> for ATS compatibility. 
                Follow the suggestions below to improve your score.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="bg-white text-[#1E40AF] cursor-pointer hover:bg-blue-50 px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <Upload className="w-5 h-5" />
                Upload New Resume
              </button>
              <button className="bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600 px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ATS Compatibility Score */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-transform hover:scale-[1.01] duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">ATS Compatibility Score</h3>
                <div className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                  Industry Standard: 75+
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-40 h-40">
                  <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="atsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#1E40AF" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#E5E7EB"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="url(#atsGradient)"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={atsStrokeDashoffset}
                      strokeLinecap="round"
                      className="transition-[stroke-dashoffset] duration-1000 ease-out drop-shadow-md"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-extrabold text-[#1E40AF]">{atsScore}</div>
                    <div className="text-sm text-gray-500">out of {maxScore}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 mb-4">
                    Measures how well your resume is parsed and understood by Applicant Tracking Systems.
                  </p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(atsScore)}`}>
                    {atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Good" : "Needs Improvement"}
                    {getStatusIcon(atsScore >= 80 ? "good" : atsScore >= 60 ? "warning" : "critical")}
                  </div>
                </div>
              </div>
            </div>

            {/* JD Match Percentage Score */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-transform hover:scale-[1.01] duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Job Description Match</h3>
                <div className="text-sm px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                  Target: 70+
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-40 h-40">
                  <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="jdGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#86EFAC" />
                        <stop offset="100%" stopColor="#22C55E" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#E5E7EB"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="url(#jdGradient)"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={jdStrokeDashoffset}
                      strokeLinecap="round"
                      className="transition-[stroke-dashoffset] duration-1000 ease-out drop-shadow-md"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-extrabold text-[#22C55E]">{jdMatchScore}</div>
                    <div className="text-sm text-gray-500">out of {maxScore}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 mb-4">
                    Indicates how well your resume aligns with the specific job description requirements.
                  </p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getScoreColor(jdMatchScore)}`}>
                    {jdMatchScore >= 80 ? "Excellent" : jdMatchScore >= 60 ? "Good" : "Needs Improvement"}
                    {getStatusIcon(jdMatchScore >= 80 ? "good" : jdMatchScore >= 60 ? "warning" : "critical")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown and Improvement Suggestions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Category Breakdown</h3>
                <div className="text-sm text-gray-500">Sorted by performance</div>
              </div>
              <div className="space-y-4">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const progress = (category.score / 100) * 100;
                  const colorClass = getScoreColor(category.score).split(" ")[0];
                  
                  return (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                          <Icon className="w-5 h-5 text-[#3B82F6]" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 block">{category.name}</span>
                          <span className="text-xs text-gray-500">Weight: {index === 0 ? 'High' : index < 3 ? 'Medium' : 'Low'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${colorClass}`}
                            style={{
                              width: `${progress}%`,
                              transition: "width 0.5s ease-in-out",
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 w-12 justify-end">
                          <span className={`font-bold ${colorClass}`}>
                            {category.score}%
                          </span>
                          {getStatusIcon(category.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Improvement Suggestions</h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  Potential: +29 points
                </span>
              </div>
              <div className="space-y-4">
                {improvements.map((improvement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                            improvement.priority
                          )}`}
                        >
                          {improvement.priority.toUpperCase()} PRIORITY
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {improvement.time}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        {improvement.impact}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      {improvement.title}
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {improvement.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-right text-sm text-gray-500 flex justify-between items-center">
                <div className="text-xs text-gray-400">Apply these changes to significantly improve your resume performance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ATS_Result;