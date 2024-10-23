import { useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function EditCoupon({ choseOneCoupon }) {
  const [updatedCoupon, setUpdatedCoupon] = useState(choseOneCoupon || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/coupons/${choseOneCoupon._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCoupon),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        alert("Coupon updated successfully!");
      } else {
        setError("Error updating coupon.");
      }
    } catch (err) {
      setError("Error updating coupon.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Coupon</h2>
      {isLoading && <Spinner />}
      {error && <div className="text-red-500">{error}</div>}
      <label className="block mb-4">
        <span className="text-gray-700">Code</span>
        <input
          type="text"
          name="code"
          value={updatedCoupon.code || ""}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Discount</span>
        <input
          type="number"
          name="discount"
          value={updatedCoupon.discount || ""}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Expiration Date</span>
        <input
          type="date"
          name="expirationDate"
          value={
            new Date(updatedCoupon.expirationDate)
              .toISOString()
              .substring(0, 10) || ""
          }
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </label>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Update Coupon
      </button>
    </div>
  );
}

EditCoupon.propTypes = {
  choseOneCoupon: PropTypes.shape({
    _id: PropTypes.string,
    code: PropTypes.string,
    discount: PropTypes.number,
    expirationDate: PropTypes.string,
    isActive: PropTypes.bool,
  }),
};

export default EditCoupon;
