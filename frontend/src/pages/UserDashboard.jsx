import UserNavbar from "../components/UserNavbar";
import { IoMdDownload } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { PiFilesLight } from "react-icons/pi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white min-h-screen">
      <UserNavbar />
      <div className="px-20 py-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name || "User"}! 👋
        </h2>
        <p className="mt-2 text-gray-700 text-xl">
          Let&apos;s build your dream resume!
        </p>
      </div>
      <div className="flex flex-row justify-between items-start px-19 w-[55%]">
        <button className="flex flex-row px-3 py-2 bg-blue-500 text-white border rounded-lg cursor-pointer hover:bg-blue-600 border-white">
          <span className="p-1 mr-1 text-lg">
            <FaPlus />
          </span>
          Create New Resume
        </button>
        <button className="flex flex-row px-4 py-2 bg-gray-100 text-black border rounded-lg cursor-pointer hover:bg-gray-300 hover:border-none border-gray-200">
          <span className="p-1 mr-1 text-lg">
            <FiUpload />
          </span>
          Upload Resume to Score
        </button>
        <button className="flex flex-row px-4 py-2 bg-gray-100 text-black border rounded-lg cursor-pointer hover:bg-gray-300 hover:border-none border-gray-200">
          <span className="p-1 mr-1 text-lg">
            <PiFilesLight />
          </span>
          Explore Templates
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="container mx-auto px-4">
          <h3 className="px-16 mt-5 text-xl font-semibold">Your Resumes</h3>
          <div className="flex flex-row justify-between items-start px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 w-2/3 p-6">
              <div className="bg-white p-4 rounded-lg shadow border flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-medium">
                    Software Engineer Resume
                  </h4>
                  <p className="text-sm text-gray-500">Updated 2 days ago</p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">ATS Score</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      85%
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    View
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    <IoMdDownload />
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-medium">Product Manager CV</h4>
                  <p className="text-sm text-gray-500">Updated 1 week ago</p>
                  <div className="mt-2">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Needs Work
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">ATS Score</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      72%
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    View
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    <IoMdDownload />
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-medium">Frontend Developer</h4>
                  <p className="text-sm text-gray-500">Updated 3 days ago</p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">ATS Score</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "91%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      91%
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    View
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    <IoMdDownload />
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-medium">Data Scientist Resume</h4>
                  <p className="text-sm text-gray-500">Updated 5 days ago</p>
                  <div className="mt-2">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      Draft
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium">ATS Score</span>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      68%
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    View
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm cursor-pointer">
                    <IoMdDownload />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <h3 className="text-xl font-semibold mb-4">Resume Insights</h3>
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex flex-row mb-2">
                  <span className="text-2xl p-1 mr-1">
                    <HiArrowTrendingUp />
                  </span>
                  <h4 className="text-lg font-medium pt-0.5">
                    Overall Performance
                  </h4>
                </div>
                <span className="text-xl font-medium text-blue-600">79%</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "68%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">Average ATS Score</p>
                <div className="flex justify-evenly items-center mt-2">
                  <div className="flex flex-col items-center">
                    <span className="text-green-600 text-xl font-semibold">
                      2
                    </span>
                    <span className="text-black">Ready to Send</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-600 text-xl font-semibold">
                      2
                    </span>
                    <span className="text-black">Need Work</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-2 border-gray-500 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3">
                  ✨ Improvement Tips
                </h4>
                <div className="space-y-5">
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <h5 className="text-md font-medium">Add more keywords</h5>
                    <p className="text-sm text-gray-700">
                      Include industry-specific terms to improve ATS matching
                    </p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h5 className="text-md font-medium">Improve summary</h5>
                    <p className="text-sm text-gray-700">
                      Your professional summary could be more compelling
                    </p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h5 className="text-md font-medium">Great formatting</h5>
                    <p className="text-sm text-gray-700">
                      Your resume is well-structured and easy to read
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
