import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const images = [
    "/src/assets/heroImg-1.png",
    "/src/assets/heroImg-2.png",
    "/src/assets/heroImg-3.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((prev) => (prev + 1) % images.length);
        setIsFlipping(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [nextImageIndex, images.length]);

  return (
    <div className="flex flex-row justify-between h-screen bg-white">
      <div className="mr-12">
        <h1 className="text-6xl font-bold text-gray-800 p-2 ml-24 mt-36">
          Career<span className="text-blue-500">Quill</span>
        </h1>
        <h3 className="text-2xl font-semibold text-gray-500 ml-28 mt-2">
          Build Smarter, Stand Out Faster
        </h3>
        <p className="text-xl text-gray-400 ml-28 mt-2 w-[45%]">
          AI-powered resume builder for modern job seekers. Create professional,
          ATS-compatible resumes that get you noticed.
        </p>
        <div className="flex space-x-5 ml-28 mt-5">
          <Link to="/build">
            <button className="px-5 py-2 bg-blue-500 text-white border rounded-lg cursor-pointer hover:bg-blue-600 border-white">
              Build My Resume
            </button>
          </Link>
          <Link to="/templates">
            <button className="px-5 py-2 bg-gray-100 text-black border rounded-lg cursor-pointer hover:bg-gray-300 hover:border-none border-gray-200">
              View Templates
            </button>
          </Link>
          <Link to="/ats_score">
            <button className="px-5 py-2 bg-blue-500 text-white border rounded-lg cursor-pointer hover:bg-blue-600 border-white">
              Score My Resume
            </button>
          </Link>
        </div>
        <ul className="flex flex-row space-x-5">
          <li className="text-gray-500 ml-28 mt-3">
            💳 No credit card required
          </li>
          <li className="text-gray-500 ml-4 mt-3">📄 Free templates</li>
          <li className="text-gray-500 ml-4 mt-3">🚀 AI-powered</li>
        </ul>
      </div>
      <div className="relative w-[470px] h-[500px] mt-18 mr-62 perspective-1000">
        <div
          className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${
            isFlipping ? "rotate-y-180" : "rotate-y-0"
          }`}
        >
          <img
            src={images[currentImageIndex]}
            alt="Hero"
            className="absolute w-full h-full border border-gray-100 drop-shadow-2xl shadow-gray-300 object-cover backface-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
