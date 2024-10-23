import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinnerOnlyComponents/Spinner";
import { useUserInfo } from "../../hook/useUserInfo";

const MyProfile = () => {
  const { userData, setIsEditing } = useUserInfo();
  const [formData, setFormData] = useState({
    name: userData.name,
    address: userData.address === "none" ? "" : userData.address,
    PhoneNumber: userData.PhoneNumber === "none" ? "" : userData.PhoneNumber,
    email: userData.email || "",
  });

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    setOriginalData({
      name: userData.name,
      address: userData.address || "",
      PhoneNumber: userData.PhoneNumber || "",
      email: userData.email || "",
    });
  }, [userData]);

  const [isEditing, setIsEditing2] = useState(false); // Toggle edit state
  const [message, setMessage] = useState({ type: "", text: "" }); // Manage success or error message
  const [isLoading, setIsLoading] = useState(false); // مدیریت نمایش اسپینر

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDataChanged =
      formData.name !== originalData.name ||
      formData.address !== originalData.address ||
      formData.PhoneNumber !== originalData.PhoneNumber ||
      formData.email !== originalData.email;

    if (!isDataChanged) {
      setMessage({
        type: "info",
        text: "Nothing changed!",
      });
      setIsEditing2(false);
      return;
    }

    setIsLoading(true); // شروع نمایش اسپینر

    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/auth/updateme",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            address: formData.address || null, // اگر کاربر آدرس را حذف کرده باشد، null ارسال شود
            PhoneNumber: formData.PhoneNumber || null, // اگر کاربر شماره را حذف کرده باشد، null ارسال شود
            email: formData.email,
          }),
        }
      );

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Changes saved successfully!",
        });
        setIsEditing((e) => !e);
        setIsEditing2(false);
        setOriginalData(formData);
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.message || "Failed to save changes.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false); // توقف نمایش اسپینر
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg ">
      <h2 className="text-4xl font-semibold text-red-600 mb-6">
        Edit Your Profile
      </h2>
      {message.text && (
        <p
          className={`text-2xl mb-4 ${
            message.type === "success"
              ? "text-green-500"
              : message.type === "info"
              ? "text-blue-500"
              : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
      {isLoading && <Spinner />} {/* نمایش اسپینر */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div className="mb-6">
          <label className="block text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Street Address */}
        <div className="mb-6">
          <label className="block text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Email Address */}
        <div className="mb-6">
          <label className="block text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          {isEditing ? (
            <>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 font-medium"
                onClick={() => setIsEditing2(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsEditing2(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// PropTypes validation
MyProfile.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    PhoneNumber: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
  setIsEditing: PropTypes.func.isRequired,
};

export default MyProfile;
