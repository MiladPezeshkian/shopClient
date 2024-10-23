import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function GetAllCoupon({ setChoseOneCoupon }) {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://server-shop-p7jv.onrender.com/api/v1/coupons",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setCoupons(data.data.coupons);
        } else {
          setError("Failed to fetch coupons.");
        }
      } catch (err) {
        setError("Error fetching coupons.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleSelectCoupon = (coupon) => {
    setSelectedCouponId(coupon._id); // Set selected coupon ID
    setChoseOneCoupon(coupon); // Set the chosen coupon when clicked
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">All Coupons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className={`p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer transition ${
              selectedCouponId === coupon._id
                ? "bg-blue-100"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleSelectCoupon(coupon)}
          >
            <p>
              <strong>Code:</strong> {coupon.code}
            </p>
            <p>
              <strong>Discount:</strong> {coupon.discount}%
            </p>
            <p>
              <strong>Expiration Date:</strong>{" "}
              {new Date(coupon.expirationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {coupon.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

GetAllCoupon.propTypes = {
  setChoseOneCoupon: PropTypes.func.isRequired,
};

export default GetAllCoupon;
