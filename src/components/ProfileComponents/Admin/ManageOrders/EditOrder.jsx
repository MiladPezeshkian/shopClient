import { useState } from "react";
import PropTypes from "prop-types";

function EditOrder({ choseOneOrder }) {
  const [isPaid, setIsPaid] = useState(choseOneOrder.isPaid || false);
  const [isDelivered, setIsDelivered] = useState(
    choseOneOrder.isDelivered || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/orders/${choseOneOrder._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            isPaid,
            isDelivered,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update the order");
      }

      const data = await response.json();
      alert("Order updated successfully");
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Order</h2>
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
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Payment Status:</span>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={() => setIsPaid(!isPaid)}
                className="form-checkbox h-5 w-5 text-green-500"
              />
              <span className="ml-2 text-gray-700">Paid</span>
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Delivery Status:</span>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isDelivered}
                onChange={() => setIsDelivered(!isDelivered)}
                className="form-checkbox h-5 w-5 text-green-500"
              />
              <span className="ml-2 text-gray-700">Delivered</span>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className={`px-6 py-2 text-white bg-blue-500 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Updating..." : "Update Order"}
        </button>
      </div>
    </div>
  );
}

EditOrder.propTypes = {
  choseOneOrder: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    isPaid: PropTypes.bool,
    isDelivered: PropTypes.bool,
  }).isRequired,
};

export default EditOrder;
