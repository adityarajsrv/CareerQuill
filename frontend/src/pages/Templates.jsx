import Navbar from "../components/Navbar";
import { CiSearch } from "react-icons/ci";
import TemplateCard from "../components/TemplateCard";
import template1 from "../assets/template1.png";
import template2 from "../assets/template2.png";
import template3 from "../assets/template3.png";
import template4 from "../assets/template4.png";
import Footer from "../components/Footer";

const Templates = () => {
  const templates = [
    {
      name: "Professional",
      description: "Clean and contemporary design perfect for modern professionals",
      tags: ["Clean", "Professional", "Minimalist"],
      imageSrc: template1,
      recommended: true,
      atsFriendly: true,
      newTemplate: false,
    },
    {
      name: "Modern",
      description: "Traditional business format ideal for corporate environments",
      tags: ["Corporate", "Traditional", "Business"],
      imageSrc: template2,
      recommended: false,
      atsFriendly: true,
      newTemplate: false,
    },
    {
      name: "Creative",
      description: "Artist-inspired eye-catching design for creative professionals",
      tags: ["Artistic", "Colorful", "Creative"],
      imageSrc: template3,
      recommended: false,
      atsFriendly: false,
      newTemplate: true,
    },
    {
      name: "Executive",
      description: "Sophisticated layout tailored for senior-level professionals",
      tags: ["Formal", "Executive", "Elegant"],
      imageSrc: template4,
      recommended: false,
      atsFriendly: true,
      newTemplate: false,
    },
    {
      name: "Academic",
      description: "Structured design ideal for educators and researchers",
      tags: ["Academic", "Detailed", "Structured"],
      imageSrc: template4,
      recommended: false,
      atsFriendly: true,
      newTemplate: true,
    },
    {
      name: "Tech",
      description: "Modern and tech-focused design for IT and engineering roles",
      tags: ["Tech", "Innovative", "Bold"],
      imageSrc: template4,
      recommended: false,
      atsFriendly: true,
      newTemplate: false,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-5xl text-blue-600 font-bold pt-6">
          Choose Your Resume Template
        </h1>
        <p className="p-3 text-center text-lg w-[45%]">
          Select a professionally designed template that fits your style and
          role. All templates are optimized for both ATS systems and human
          recruiters.
        </p>
      </div>
      <div className="flex flex-row items-center justify-between mt-10 px-10">
        <div className="w-full max-w-2xl p-6 ml-14">
          <div className="relative">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-[60%] p-1.5 pl-8 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2 mr-6 text-sm"> 
            <button className="border border-gray-300 bg-gray-100 cursor-pointer px-3 py-1 hover:bg-gray-200 rounded-full">All</button>
            <button className="border border-gray-300 bg-gray-100 cursor-pointer px-3 py-1 hover:bg-gray-200 rounded-full">Professional</button>
            <button className="border border-gray-300 bg-gray-100 cursor-pointer px-3 py-1 hover:bg-gray-200 rounded-full">Minimalist</button>
            <button className="border border-gray-300 bg-gray-100 cursor-pointer px-3 py-1 hover:bg-gray-200 rounded-full">ATS-friendly</button>
            <button className="border border-gray-300 bg-gray-100 cursor-pointer px-3 py-1 hover:bg-gray-200 rounded-full">Formal</button>
            <button className="border border-gray-300 bg-gray-100 cursor-pointer px-3 py-1 hover:bg-gray-200 rounded-full">Corporate</button>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 ml-20 p-6">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              name={template.name}
              description={template.description}
              tags={template.tags}
              imageSrc={template.imageSrc}
              recommended={template.recommended}
              atsFriendly={template.atsFriendly}
              newTemplate={template.newTemplate}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Templates;