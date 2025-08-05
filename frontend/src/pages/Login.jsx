import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import loginUI from '../assets/loginUI.png'; 
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!isLogin && !formData.name) {
      setError('Name is required for signup.');
      return;
    }
    try{
      setLoading(true);
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? {
        email: formData.email, password: formData.password
      } : {
        name: formData.name, email: formData.email, password: formData.password
      }
      
      const response = await api.post(endpoint, payload);

      if (response.data.user){
        console.log('User logged in:', response.data.user);

        navigate('/dashboard'); 
      }
    }catch(err){
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
      setError(msg);
    }finally{
      setLoading(false);
      setFormData({email: '', password: '', name: ''});
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-12 overflow-hidden bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] bg-repeat mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl mx-auto p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-center gap-12">
        <div className="w-full sm:w-1/2 h-96 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="text-gray-500 text-4xl font-semibold">
            <img className="h-[400px] w-[500px]" src={loginUI} alt="Login UI" />
          </div>
        </div>
        <div className="w-full sm:w-1/2 space-y-8">
          <div className="text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join CareerQuill'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 'Sign in to unlock your potential' : 'Start your journey'}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-blue-600 hover:text-blue-700 cursor-pointer font-medium underline decoration-1"
              >
                {isLogin ? 'Need an account?' : 'Already registered?'}
              </span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-400 p-3 transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-400 p-3 transition-all duration-200"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-400 p-3 transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              <LockClosedIcon className="h-6 w-6 mr-2" />
              {loading ? 'Processing' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center text-xs text-gray-500">
            <p>
              By signing up, you agree to our{' '}
              <a className="text-blue-600 hover:text-blue-700 underline">Terms</a> and{' '}
              <a className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;