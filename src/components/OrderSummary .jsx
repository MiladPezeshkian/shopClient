import { useContext, useState, useEffect, useCallback } from "react";
import { CartWishlistContext } from "../context/CartWishlistContext";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCartWishlist } from "../hook/useCartWishlist ";
import { useNavigate } from "react-router-dom"; // React Router navigation
import { useUserInfo } from "../hook/useUserInfo";
import Spinner from "./Spinner/Spinner";
import RecaptchaComponent from "./RecaptchaComponent.jsx"; // Recaptcha component
const serverUrl = "https://server-shop-p7jv.onrender.com";

const OrderSummary = () => {
  const { userData } = useUserInfo();
  const { totalPrice, setTotalPrice } = useCartWishlist();
  const { cartList } = useContext(CartWishlistContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(
    cartList.map((product) => ({
      ...product,
    }))
  );
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false); // State for spinner
  const [verify, setVerify] = useState(false); // State for Recaptcha verification
  const navigate = useNavigate(); // React Router navigation

  const updateTotalPrice = useCallback(() => {
    const newTotalPrice = selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [selectedProducts, setTotalPrice]);

  useEffect(() => {
    updateTotalPrice();
  }, [updateTotalPrice]);

  const handleCouponApply = async () => {
    if (!verify) {
      setSuccessMessage("Please verify the captcha before applying coupon.");
      return;
    }
    try {
      setLoading(true); // Show spinner
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/coupons/${coupon}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include credentials in request
        }
      );
      const data = await response.json();
      setLoading(false); // Hide spinner
      if (response.ok) {
        setDiscount(data.discount);
        setSuccessMessage(`Coupon applied! Discount: ${data.discount}%`);
      } else {
        setSuccessMessage("Invalid coupon");
      }
    } catch (error) {
      setLoading(false); // Hide spinner in case of error
      console.error("Error applying coupon", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!verify) {
      setSuccessMessage("Please verify the captcha before placing the order.");
      return;
    }

    if (paymentMethod === "online") {
      navigate("/bank/payment");
      return; // خروج از تابع بدون ارسال درخواست به سرور
    }

    try {
      setLoading(true); // نمایش اسپینر
      const orderItems = selectedProducts.map((product) => ({
        product: product._id, // آی‌دی محصول
        quantity: product.quantity, // تعداد خریداری شده
        price: product.price * product.quantity, // قیمت کل بر اساس تعداد
        img: product.image,
      }));

      const orderDetails = {
        user: userData._id, // استفاده از userData برای اطلاعات کاربر
        orderItems: orderItems, // ارایه محصولات مطابق مدل ارسال می‌شود
        totalPrice: totalPrice - (totalPrice * discount) / 100, // قیمت کل بعد از تخفیف
        discount: discount, // درصد تخفیف
        paymentMethod: paymentMethod, // روش پرداخت (online یا cash)
        shippingAddress: { address: userData.address }, // آدرس ارسال از اطلاعات کاربر
      };

      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
          credentials: "include", // ارسال credentials در درخواست
        }
      );

      setLoading(false); // مخفی کردن اسپینر
      if (response.ok) {
        setIsOrderPlaced(true);
        setSuccessMessage("Order placed successfully!");
        navigate("/successOrder");
      } else {
        // console.log("Order failed with status", response.status);
      }
    } catch (error) {
      setLoading(false); // مخفی کردن اسپینر در صورت خطا
      console.error("Error placing order", error);
    }
  };

  const handleProductSelection = (product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  if (isOrderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center w-32 h-32 rounded-full bg-green-100"
        >
          <FaCheckCircle className="text-green-500 text-[4rem]" />
        </motion.div>
        <p className="text-2xl font-bold text-green-500 mt-4">
          Order placed successfully!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      {loading && <Spinner />} {/* Show spinner during loading */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Summary</h2>
      <div className="max-h-64 overflow-y-auto mb-6">
        <table className="table-auto w-full">
          <tbody>
            {selectedProducts.map((product, key) => (
              <tr key={key} className="border-t">
                <td className="py-4 px-4 flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-red-500 mr-2"
                    onChange={() => handleProductSelection(product)}
                    checked={selectedProducts.some((p) => p.id === product.id)}
                  />
                  <img
                    src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-lg mr-4"
                    style={{ aspectRatio: "1 / 1" }} // Maintain aspect ratio
                  />
                  <span className="font-medium text-gray-600">
                    {product.title}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <input
                    type="number"
                    className="w-16 border p-2 rounded-lg bg-gray-200 text-center text-[1.2rem]"
                    value={product.quantity}
                    disabled
                  />
                </td>
                <td className="py-4 px-4 text-right">
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-6">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-left text-gray-600">Subtotal:</td>
              <td className="text-right text-gray-600">
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="text-left text-gray-600">Discount:</td>
              <td className="text-right text-red-500">-{discount}%</td>
            </tr>
            <tr>
              <td className="text-left text-gray-600">Shipping:</td>
              <td className="text-right text-green-500">Free</td>
            </tr>
            <tr>
              <td className="font-bold text-left text-lg text-gray-700">
                Total:
              </td>
              <td className="font-bold text-right text-lg text-gray-700">
                ${(totalPrice - (totalPrice * discount) / 100).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">Coupon:</label>
        <div className="flex items-center">
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter your coupon code"
          />
          <button
            onClick={handleCouponApply}
            className="bg-green-500 text-white rounded-lg px-4 py-2 ml-2"
            disabled={!verify} // Disable if captcha not verified
          >
            Apply
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600">
          Payment Method:
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="online">Online Payment</option>
          <option value="cash">Cash on Delivery</option>
        </select>
      </div>
      <RecaptchaComponent onVerified={setVerify} />
      <button
        onClick={handlePlaceOrder}
        className={`${
          verify
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" // استایل‌های حالت فعال
            : "bg-gray-400 cursor-not-allowed" // استایل‌های حالت غیرفعال
        } text-white rounded-lg px-6 py-3 w-full transition duration-300 ease-in-out`} // استایل‌های مشترک
        disabled={!verify} // دکمه در حالت غیرفعال اگر verify=false باشد
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
