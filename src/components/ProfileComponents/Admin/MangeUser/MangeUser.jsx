import { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronRight, FaChevronDown } from "react-icons/fa"; // برای فلش ها

function MangeUser({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mb-6 bg-white shadow-lg rounded-lg p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-[1.5rem] font-semibold text-gray-800">
            Manage Users
          </h2>
          {/* آیکون فلش که بر اساس حالت باز یا بسته تغییر می‌کند */}
          <span className="transition-transform duration-300 ease-in-out">
            {isOpen ? (
              <FaChevronDown className="text-gray-800" />
            ) : (
              <FaChevronRight className="text-gray-800" />
            )}
          </span>
        </div>

        {/* انیمیشن باز شدن دکمه‌ها */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* دکمه نمایش همه کاربران */}
          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "getAllUser"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("getAllUser")}
          >
            Get All Users
          </button>

          {/* دکمه دریافت اطلاعات یک کاربر */}
          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "getUser"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("getUser")}
          >
            Get a User
          </button>

          {/* دکمه ویرایش یک کاربر */}
          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "EditUser"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("EditUser")}
          >
            Edit a User
          </button>

          {/* دکمه حذف یا مسدود کردن یک کاربر */}
          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "DeleteUser"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("DeleteUser")}
          >
            Ban or Unban a User
          </button>

          {/* دکمه مدیریت نقش‌های کاربر */}

          {/* دکمه نمایش کاربران مسدود شده */}
        </div>
      </div>
    </>
  );
}

MangeUser.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default MangeUser;
