import Footer from "../components/Footer/Footer";
import NavLink from "../components/NavLink/NavLink";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCartWishlist } from "../hook/useCartWishlist ";

function SuccessOrder() {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const { setCartList } = useCartWishlist(); // گرفتن cartList و setCartList

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheckmark(true);
    }, 500);

    // پاک کردن cartList از لوکال استورج و تنظیم آن به آرایه خالی
    localStorage.removeItem("cartList");
    setCartList([]); // خالی کردن لیست

    return () => clearTimeout(timer);
  }, [setCartList]);

  const deliveryDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  return (
    <>
      <NavLink />
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-green-50 via-gray-50 to-white animate-fadeIn">
        <div className="relative bg-green-100 rounded-full p-10 md:p-12 lg:p-16 mb-8 shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          {showCheckmark && (
            <FaCheckCircle className="text-green-500 text-7xl md:text-8xl lg:text-9xl animate-popIn" />
          )}
          <div className="absolute inset-0 rounded-full border-4 border-green-500"></div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-wider transition-transform duration-500 hover:scale-105">
          Order Confirmed!
        </h2>
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-lg md:max-w-2xl text-center mb-6 leading-relaxed px-4">
          We are pleased to inform you that your order has been placed
          successfully. It will be delivered by <strong>{deliveryDate}</strong>{" "}
          at the latest.
        </p>
        <p className="text-sm md:text-lg lg:text-lg text-gray-500 italic">
          We sincerely appreciate your trust in us. Thank you for choosing our
          service!
        </p>
      </div>
      <Footer />
    </>
  );
}

export default SuccessOrder;
