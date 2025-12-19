import { useState } from "react";
import Navbar from "../components/Navbar";
import { CiSearch } from "react-icons/ci";
import TemplateCard from "../components/TemplateCard";
import template1 from "../assets/template-1.png";
import template2 from "../assets/template-2.png";
import template3 from "../assets/template-3.png";
import template4 from "../assets/template-4.png";
import template5 from "../assets/template-5.png";
import template6 from "../assets/template-6.png";
import Footer from "../components/Footer";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "Clean and contemporary design perfect for modern professionals",
      tags: ["Clean", "Professional", "Minimalist"],
      imageSrc: template1,
      recommended: true,
      atsFriendly: true,
      newTemplate: false,
      link: "/build?template=template1",
    },
    {
      id: 2,
      name: "Modern",
      description: "Traditional business format ideal for corporate environments",
      tags: ["Corporate", "Traditional", "Business"],
      imageSrc: template2,
      recommended: false,
      atsFriendly: true,
      newTemplate: false,
      link: "/build?template=template2",
    },
    {
      id: 3,
      name: "Creative",
      description: "Artist-inspired eye-catching design for creative professionals",
      tags: ["Artistic", "Colorful", "Creative"],
      imageSrc: template3,
      recommended: false,
      atsFriendly: false,
      newTemplate: true,
      link: "/build?template=template3",
    },
    {
      id: 4,
      name: "Executive",
      description: "Sophisticated layout tailored for senior-level professionals",
      tags: ["Formal", "Executive", "Elegant"],
      imageSrc: template4,
      recommended: false,
      atsFriendly: true,
      newTemplate: false,
      link: "/build?template=template4",
    },
    {
      id: 5,
      name: "Academic",
      description: "Structured design ideal for educators and researchers",
      tags: ["Academic", "Detailed", "Structured"],
      imageSrc: template5,
      recommended: false,
      atsFriendly: true,
      newTemplate: true,
      link: "/build?template=template5",
    },
    {
      id: 6,
      name: "Tech",
      description: "Modern and tech-focused design for IT and engineering roles",
      tags: ["Tech", "Innovative", "Bold"],
      imageSrc: template6,
      recommended: false,
      atsFriendly: true,
      newTemplate: false,
      link: "/build?template=template6",
    },
  ];

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filterTags = ["All", "Professional", "ATS-friendly", "Creative", "Academic", "Tech"];

  const filteredTemplates = templates.filter((template) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (filter === "All") return true;
    if (filter === "Professional") return template.tags.includes("Professional");
    if (filter === "ATS-friendly") return template.atsFriendly;
    if (filter === "Creative") return template.tags.includes("Creative");
    if (filter === "Academic") return template.tags.includes("Academic");
    if (filter === "Tech") return template.tags.includes("Tech");

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 pt-10 pb-6">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
          Choose Your <span className="text-blue-600">Resume Template</span>
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600 max-w-3xl">
          Select a professionally designed template that fits your style and role.
          All templates are optimized for both ATS systems and human recruiters.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 mt-8 gap-6">
        <div className="w-full lg:w-1/2">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search templates by name, tag or description..."
              className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setFilter(tag);
                setSearchQuery("");
              }}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === tag
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              name={template.name}
              description={template.description}
              tags={template.tags}
              imageSrc={template.imageSrc}
              recommended={template.recommended}
              atsFriendly={template.atsFriendly}
              newTemplate={template.newTemplate}
              link={template.link}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Templates;