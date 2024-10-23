import { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronRight, FaChevronDown } from "react-icons/fa"; // برای فلش ها

function MangeComments({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mb-6 bg-white shadow-lg rounded-lg p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-[1.5rem] font-semibold text-gray-800">
            Manage Comments
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
          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "getAllComments"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("getAllComments")}
          >
            Get All Comments
          </button>
          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "getUserComments"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("getUserComments")}
          >
            Get All comments from a user
          </button>

          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "EditComments"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("EditComments")}
          >
            Edit a Comments
          </button>
          <button
            className={`block w-full p-4 text-left mt-2 transition-all duration-300 ease-in-out rounded-md ${
              activeSection === "DeleteComments"
                ? "text-red-600 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-red-600"
            }`}
            onClick={() => setActiveSection("DeleteComments")}
          >
            Delete a Comments
          </button>
        </div>
      </div>
    </>
  );
}

MangeComments.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default MangeComments;
