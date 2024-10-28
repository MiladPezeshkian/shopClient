import { useNavigate } from "react-router-dom";
import { useCartWishlist } from "../hook/useCartWishlist";

function CartTotal() {
  const navigate = useNavigate();
  const { totalPrice } = useCartWishlist();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex justify-center">
      <div className="border-2 border-gray-300 rounded-lg shadow-lg flex flex-col justify-between items-center p-8 md:w-[45rem] lg:w-[47rem] w-full h-full bg-white">
        {/* عنوان بخش */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Cart Total
        </h2>

        {/* نمایش قیمت */}
        <p className="text-xl md:text-2xl text-gray-600 mb-6">
          Total Price:{" "}
          <span className="text-gray-800 font-semibold">
            ${totalPrice !== undefined ? totalPrice.toFixed(2) : "0.00"}
          </span>
        </p>

        <hr className="w-full border-t border-gray-200 mb-6" />

        {/* دکمه پرداخت */}
        <button
          className="w-full md:w-[80%] py-3 md:py-4 bg-red-600 hover:bg-red-500 transition-colors duration-300 text-white text-lg md:text-xl font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartTotal;
