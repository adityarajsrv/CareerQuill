import { useEffect, useRef, useState } from 'react';
import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';
import { Link } from 'react-router-dom';

const Examples = () => {
  const templates = [
    { title: "Professional", description: "Clean and contemporary design perfect for modern professionals" },
    { title: "Modern", description: "Traditional business format ideal for corporate environments" },
    { title: "Creative", description: "Artist-inspired eye-catching design for creative professionals" },
    { title: "Academic", description: "Structured design ideal for research and education" },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.5 } 
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-white"
    >
      <h2 className="text-4xl sm:text-5xl p-2 font-bold text-gray-900 text-center mb-4">
        Choose from <span className='text-blue-500'>Professional Templates</span>
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 text-center mb-10 max-w-3xl mx-auto">
        Recruiter approved designs to make your resume stand out
      </p>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 relative">
          <style>
            {`
              @keyframes rotateIn1 {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(-45deg);
                }
              }
              @keyframes rotateIn2 {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(-25deg);
                }
              }
              @keyframes rotateIn3 {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(0deg);
                }
              }
              @keyframes rotateIn4 {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(25deg);
                }
              }
              .rotate-anim-1.active { animation: rotateIn1 0.9s forwards; transform-origin: bottom; }
              .rotate-anim-2.active { animation: rotateIn2 0.9s forwards; transform-origin: bottom; }
              .rotate-anim-3.active { animation: rotateIn3 0.9s forwards; transform-origin: bottom; }
              .rotate-anim-4.active { animation: rotateIn4 0.9s forwards; transform-origin: bottom; }
            `}
          </style>
          <div className="bg-white">
            <img
              src={template2}
              alt=""
              className={`absolute h-[420px] w-[300px] ml-190 -translate-x-[calc(50%+350px)] rotate-anim-1 ${isVisible ? 'active' : ''} origin-bottom z-0 border border-gray-100 drop-shadow-gray-400 drop-shadow-lg`}
            />
          </div>
          <div className="bg-white">
            <img
              src={template3}
              alt=""
              className={`absolute h-[420px] w-[300px] ml-167 -translate-x-[calc(50%+240px)] rotate-anim-2 ${isVisible ? 'active' : ''} origin-bottom z-0 border border-gray-100 drop-shadow-gray-400 drop-shadow-lg`}
            />
          </div>
          <div className="bg-white">
            <img
              src={template4}
              alt=""
              className={`absolute h-[450px] w-[300px] mt-13 ml-71 rotate-anim-3 ${isVisible ? 'active' : ''} border border-gray-100 drop-shadow-gray-400 drop-shadow-lg`}
            />
          </div>
          <div className="bg-white">
            <img
              src={template1}
              alt=""
              className={`absolute h-[430px] w-[300px] mt-30 ml-1 translate-x-[calc(50%+115px)] rotate-anim-4 ${isVisible ? 'active' : ''} origin-bottom z-0 border border-gray-300  drop-shadow-gray-400 drop-shadow-lg`}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 ml-0 md:ml-8">
          {templates.map((template, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center">
                <span className="text-blue-600 mr-2">●</span>
                <h3 className="text-lg font-semibold">{template.title}</h3>
              </div>
              <p className="text-gray-600 mt-2">{template.description}</p>
              <button className="mt-2 cursor-pointer bg-white text-blue-600 border border-blue-600 rounded px-4 py-2 hover:bg-blue-50">
                Preview
              </button>
            </div>
          ))}
          <Link to="/templates">
            <button className="w-full bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
              Browse All Templates
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Examples;