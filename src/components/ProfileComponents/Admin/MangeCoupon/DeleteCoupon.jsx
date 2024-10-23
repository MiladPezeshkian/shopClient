import PropTypes from "prop-types";
import { useState } from "react";

function DeleteCoupon({ choseOneCoupon }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/coupons/${choseOneCoupon._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setMessage("Coupon deleted successfully!");
        setMessageType("success");
      } else {
        setMessage("Error deleting coupon.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("An unexpected error occurred.");
      setMessageType("error");
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    handleDelete();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg relative">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Delete Coupon</h2>
      <p className="text-gray-700 text-lg mb-4">
        Are you sure you want to delete this coupon? This action cannot be
        undone.
      </p>
      <div className="mb-4">
        <p className="text-gray-600">
          <strong>Code:</strong> {choseOneCoupon.code}
        </p>
        <p className="text-gray-600">
          <strong>Discount:</strong> {choseOneCoupon.discount}%
        </p>
      </div>

      <button
        onClick={() => setShowConfirmation(true)}
        className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors"
      >
        Delete Coupon
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-yellow-700 font-semibold mb-4">
              Are you sure you want to delete this coupon? This action cannot be
              undone.
            </p>
            <button
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors mr-4"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

DeleteCoupon.propTypes = {
  choseOneCoupon: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    expirationDate: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default DeleteCoupon;
