import { EnvelopeIcon} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer id="footer-section" className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Career<span className='text-blue-400'>Quill</span></h2>
            <p className="text-gray-400 text-sm">
              Empowering your career with professional resume tools. Built with cutting-edge technology.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/templates" className="text-gray-400 hover:text-blue-400 transition-colors">Templates</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="/help" className="text-gray-400 hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4 ">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest resume tips and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-lg text-white focus:outline-none border border-gray-700 bg-gray-800 placeholder-gray-500"
              />
              <button className="bg-blue-500 p-2 rounded-r-lg hover:bg-blue-600 transition-colors">
                <EnvelopeIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} CareerQuill | All rights reserved | Built by Aditya Raj Srivastava
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;