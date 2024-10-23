import { useState } from "react";
import PropTypes from "prop-types";

function DeleteOrder({ choseOneOrder }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/orders/${choseOneOrder._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the order.");
      }

      alert("Order deleted successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setShowWarning(false);
    }
  };

  const handleShowWarning = () => {
    setShowWarning(true);
  };

  const handleCancel = () => {
    setShowWarning(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Order</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Order ID:</span>
          <span>{choseOneOrder._id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total Price:</span>
          <span>${choseOneOrder.totalPrice}</span>
        </div>
      </div>

      {/* Confirmation modal */}
      {showWarning && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Are you sure you want to delete this order?
            </h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className={`px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Button */}
      <div className="mt-6">
        <button
          onClick={handleShowWarning}
          disabled={isLoading}
          className={`px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Delete Order"}
        </button>
      </div>
    </div>
  );
}

DeleteOrder.propTypes = {
  choseOneOrder: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default DeleteOrder;
