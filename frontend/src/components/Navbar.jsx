import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 text-gray-300 border-b-1">
      <div className="text-2xl font-bold text-gray-800 ml-12 cursor-pointer">
        Career<span className="text-blue-500">Quill</span>
      </div>
      
      <div className="flex space-x-5">
        <Link to="/" className="text-gray-500 hover:text-blue-600 hover:underline">Home</Link>
        <Link to="/templates" className="text-gray-500 hover:text-blue-600 hover:underline">Templates</Link>
        <Link to="/features" className="text-gray-500 hover:text-blue-600 hover:underline">Features</Link>
        <Link to="/contact" className="text-gray-500 hover:text-blue-600 hover:underline">Contact</Link>
      </div>
      
      <div className="flex items-center space-x-5 mr-12">
        <Link to="/login">
          <button className="p-2 bg-blue-500 text-white border rounded-xl cursor-pointer hover:bg-blue-600 border-white">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
