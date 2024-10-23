import PropTypes from "prop-types";

function GetAchoseOne({ choseOne }) {
  const { name, email, PhoneNumber, address, role, createdAt, updatedAt } =
    choseOne || {};

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        choseOne Information
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-600">{name || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">{email || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Phone Number:</span>
          <span className="text-gray-600">{PhoneNumber || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Address:</span>
          <span className="text-gray-600">{address || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Role:</span>
          <span className="text-gray-600 capitalize">{role || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Created At:</span>
          <span className="text-gray-600">
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Updated At:</span>
          <span className="text-gray-600">
            {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

GetAchoseOne.propTypes = {
  choseOne: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    PhoneNumber: PropTypes.string,
    address: PropTypes.string,
    role: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

export default GetAchoseOne;
