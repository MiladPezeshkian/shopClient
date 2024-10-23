import PropTypes from "prop-types";
import ManageMyAccount from "../MangeMyAccount"; // Corrected the import statement

const UserOptions = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-full bg-white rounded-lg p-6 h-[100%]">
      {/* Account Management Section */}
      <ManageMyAccount
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Orders Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Orders</h2>
        <button
          className={`block w-full p-4 text-left transition-all duration-300 ease-in-out ${
            activeSection === "myOrder"
              ? "text-red-600 bg-gray-100"
              : "text-gray-700 hover:bg-gray-300 hover:text-red-600"
          }`}
          onClick={() => setActiveSection("myOrder")}
        >
          My Orders
        </button>
      </div>
    </div>
  );
};

UserOptions.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default UserOptions;
