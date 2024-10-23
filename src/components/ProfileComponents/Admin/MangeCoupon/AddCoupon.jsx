import { useState } from "react";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function AddCoupon() {
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    expirationDate: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure correct data types for discount and isActive
    if (name === "discount") {
      setNewCoupon((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "isActive") {
      setNewCoupon((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setNewCoupon((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCoupon = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/coupons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newCoupon), // Send data as JSON
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setSuccess("Coupon added successfully!");
        setNewCoupon({
          code: "",
          discount: 0,
          expirationDate: "",
          isActive: true,
        });
      } else {
        setError("Failed to add coupon.");
      }
    } catch (err) {
      setError("Error adding coupon.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Coupon</h2>
      {isLoading && <Spinner />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <label className="block mb-4">
        <span className="text-gray-700">Coupon Code</span>
        <input
          type="text"
          name="code"
          value={newCoupon.code}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Discount (%)</span>
        <input
          type="number"
          name="discount"
          min={0}
          max={100}
          value={newCoupon.discount}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Expiration Date</span>
        <input
          type="date"
          name="expirationDate"
          value={newCoupon.expirationDate}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Status</span>
        <select
          name="isActive"
          value={newCoupon.isActive}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full"
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </label>

      <button
        onClick={handleAddCoupon}
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Coupon
      </button>
    </div>
  );
}

export default AddCoupon;
