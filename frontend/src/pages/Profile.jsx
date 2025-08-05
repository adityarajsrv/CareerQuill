import { IoCameraOutline, IoDocumentTextOutline, IoBarChartOutline, IoPencilOutline } from 'react-icons/io5';
import UserNavbar from '../components/UserNavbar';

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNavbar />

      <div className="container mx-auto p-6 w-3/4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4">SC</div>
          <div>
            <h2 className="text-2xl font-semibold">UserName</h2>
            <p className="text-gray-500">Manage your profile details!</p>
          </div>
        </div>

        <div className="p-2 mb-6 flex items-start space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
            <IoCameraOutline className="mr-2" /> Update Profile Picture
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300">
            <IoDocumentTextOutline className="mr-2" /> Download Profile PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300">
            <IoBarChartOutline className="mr-2" /> View Resume Analytics
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Profile Details</h3>
            <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200">
              <IoPencilOutline className="mr-1" /> Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Full Name</label>
              <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                <span className="text-gray-400 mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></span>
                <span>UserName</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Email Address</label>
              <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                <span className="text-gray-400 mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></span>
                <span>username@email.com </span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                <span className="text-gray-400 mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></span>
                <span>Not provided</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Location</label>
              <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                <span className="text-gray-400 mr-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></span>
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-600">Professional Bio</label>
              <div className="bg-gray-50 p-2 rounded-lg">
                <p className="text-gray-700">
                  Experienced software engineer with 5+ years in full-stack development. Passionate about creating user-centric applications and leading technical teams. Specialized in React, Node.js, and cloud
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;