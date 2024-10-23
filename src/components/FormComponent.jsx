import { useState, useEffect } from "react";
import { useUserInfo } from "../hook/useUserInfo";

const FormComponent = () => {
  // گرفتن اطلاعات کاربر از کانتکست
  const { userData } = useUserInfo();

  // استیت برای نگهداری اطلاعات فرم
  const [formData, setFormData] = useState({
    name: "",
    Address: "",
    PhoneNumber: "",
    email: "",
  });

  // بارگذاری اطلاعات از کانتکست
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        Address: userData.address || "",
        PhoneNumber: userData.PhoneNumber || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  // مدیریت تغییرات در فرم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-[30%] mx-auto p-4 space-y-6">
      {/* First Name */}
      <div className="mb-6">
        <label className="block text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-2">
          First Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <label className="block text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
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
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
    </div>
  );
};

export default FormComponent;
