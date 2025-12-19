import PropTypes from "prop-types";
import template1 from "../assets/template1.png";
import { Link } from "react-router-dom";
import { FaCrown, FaCheckCircle, FaStar } from "react-icons/fa";

const TemplateCard = ({
  name = "Default Template",
  description = "Default description for the template",
  tags = ["Default"],
  imageSrc = template1,
  recommended = false,
  atsFriendly = false,
  newTemplate = false,
  link = "/",
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 transform hover:-translate-y-1">
      <div className="relative">
        <div className="h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={imageSrc}
            alt={`${name} Template`}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {recommended && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              <FaCrown className="text-xs" />
              <span>Recommended</span>
            </div>
          )}
          {atsFriendly && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-blue-400 to-blue-300 text-blue-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              <FaCheckCircle className="text-xs" />
              <span>ATS-Friendly</span>
            </div>
          )}
          {newTemplate && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-green-400 to-green-300 text-green-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              <FaStar className="text-xs" />
              <span>New</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{name}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={link}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl text-center font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg block"
        >
          Use Template
        </Link>
      </div>
    </div>
  );
};

TemplateCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  imageSrc: PropTypes.string,
  recommended: PropTypes.bool,
  atsFriendly: PropTypes.bool,
  newTemplate: PropTypes.bool,
  link: PropTypes.string,
};

export default TemplateCard;