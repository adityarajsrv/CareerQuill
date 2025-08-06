import {
  IoCameraOutline,
  IoDocumentTextOutline,
  IoBarChartOutline,
  IoPencilOutline,
  IoSaveOutline,
} from "react-icons/io5";
import UserNavbar from "../components/UserNavbar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import PropTypes from "prop-types";


const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNavbar />

      <div className="container mx-auto p-6 w-3/4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4">
            {user?.name?.slice(0, 2).toUpperCase() || "US"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user?.name || "User"}</h2>
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
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 cursor-pointer"
              >
                <IoSaveOutline className="mr-1" /> Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 cursor-pointer"
              >
                <IoPencilOutline className="mr-1" /> Edit Profile
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <StaticField label="Email Address" value={user?.email} />
            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <label className="block text-gray-600">Professional Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                  {user?.bio || "Not provided"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, isEditing, onChange }) => (
  <div>
    <label className="block text-gray-600">{label}</label>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-lg bg-gray-50 border border-gray-300"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    ) : (
      <div className="bg-gray-50 p-2 rounded-lg text-gray-700">
        {value || "Not provided"}
      </div>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const StaticField = ({ label, value }) => (
  <div>
    <label className="block text-gray-600">{label}</label>
    <div className="bg-gray-50 p-2 rounded-lg text-gray-700">{value}</div>
  </div>
);

StaticField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default ProfilePage;
