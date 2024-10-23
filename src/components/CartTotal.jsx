import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate
import { useCartWishlist } from "../hook/useCartWishlist ";

function CartTotal() {
  const navigate = useNavigate(); // تعریف تابع navigate
  const { totalPrice } = useCartWishlist();

  const handleCheckout = () => {
    navigate("/checkout"); // هدایت به صفحه /checkout
  };

  return (
    <div>
      <div className="border-[2px] border-black gap-[4rem] flex flex-col justify-center md:justify-start md:items-start items-center px-[5rem] py-[2rem] md:w-[47rem] md:h-[32.4rem] w-[27rem] h-[22.4rem]">
        <h2 className="text-[3rem]">Cart Total</h2>
        <p className="text-slate-700 text-[2rem]">
          Price: ${totalPrice !== undefined ? totalPrice.toFixed(2) : 0.0}
        </p>
        <hr className="bg-black w-full h-[0.2rem]" />
        <button
          className="md:text-[1.5rem] md:w-[26rem] md:h-[5.6rem] w-[20rem] h-[15rem] rounded-[0.4rem] text-[1.3rem]  bg-[#DB4444] text-white hover:opacity-80"
          onClick={handleCheckout} // استفاده از تابع handleCheckout
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartTotal;
