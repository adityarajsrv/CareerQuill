import PropTypes from 'prop-types';
import template1 from '../assets/template1.png';

const TemplateCard = ({
  name = "Default Template",
  description = "Default description for the template",
  tags = ["Default"],
  imageSrc = template1,
  recommended = false,
  atsFriendly = false,
  newTemplate = false,
}) => {
  return (
    <div className="w-[400px] h-auto bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-xl ">
      <div>
        <div className="relative mb-4">
          <img
            src={imageSrc}
            alt={`${name} Template`}
            className="w-full h-48 object-cover rounded border-b-1 border-gray-100 shadow-sm"
            loading="lazy" 
          />
          <div className="flex items-center mt-4 flex-wrap gap-1">
            {recommended && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2">
                Recommended
              </span>
            )}
            {atsFriendly && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                ATS-Friendly
              </span>
            )}
            {newTemplate && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                New
              </span>
            )}
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-2 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        <div className="flex space-x-2 mt-2 flex-wrap">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button
        className="w-full mt-4 mb-1 cursor-pointer bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        disabled={!name || !description}
      >
        Use Template
      </button>
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
};

export default TemplateCard;

