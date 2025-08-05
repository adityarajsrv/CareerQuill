import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { PiUserCircleDuotone } from "react-icons/pi";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-5 text-gray-300 border-b-1">
      <div className="text-2xl font-bold text-gray-800 ml-12 cursor-pointer">
        Career<span className="text-blue-500">Quill</span>
      </div>
      
      <div className="flex space-x-5">
        <Link to="/" className="text-gray-500 hover:text-blue-600 hover:underline">Home</Link>
        <Link to="/dashboard" className="text-gray-500 hover:text-blue-600 hover:underline">Dashboard</Link>
        <Link to="/templates" className="text-gray-500 hover:text-blue-600 hover:underline">Templates</Link>
        <Link to="/profile" className="text-gray-500 hover:text-blue-600 hover:underline">Profile</Link>
        <Link to="/contact" className="text-gray-500 hover:text-blue-600 hover:underline">Contact</Link>
      </div>
      
      <div className="flex items-center space-x-5 mr-12" ref={dropdownRef}>
        <div className="relative">
          <button 
            className="flex items-center space-x-2 p-2 bg-grey-200 text-black rounded-2xl cursor-pointer border border-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <PiUserCircleDuotone className="w-7 h-7 text-gray-500" />
            <span>UserName</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;