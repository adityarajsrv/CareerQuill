const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 text-gray-300 border-b-1">
        <div className="text-2xl font-bold text-gray-800 ml-12 cursor-pointer">Career<span className="text-blue-500">Quill</span></div>
        <div className="flex space-x-5">
            <a href="/" className="text-gray-500 hover:text-blue-600 hover:underline">Home</a>
            <a href="/features" className="text-gray-500 hover:text-blue-600 hover:underline">Templates</a>
            <a href="/about" className="text-gray-500 hover:text-blue-600 hover:underline">About</a>
            <a href="/contact" className="text-gray-500 hover:text-blue-600 hover:underline">Contact</a>
        </div>
        <div className="flex items-center space-x-5 mr-12">
            <button className="text-gray-800 cursor-pointer hover:text-blue-600">Sign In</button>
            <button className="p-2 bg-blue-500 text-white border rounded-xl cursor-pointer hover:bg-blue-600 border-white">Get Started</button>
        </div>
    </div>
  )
}

export default Navbar