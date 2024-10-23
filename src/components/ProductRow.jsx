import PropTypes from "prop-types";
import { useContext } from "react";
import { CartWishlistContext } from "../context/CartWishlistContext"; // اضافه کردن کانتکس
const serverUrl = "https://server-shop-p7jv.onrender.com";

const ProductRow = ({ product, onQuantityChange }) => {
  const { toggleCartList } = useContext(CartWishlistContext); // استفاده از کانتکس

  // تابع حذف محصول
  const handleRemove = () => {
    toggleCartList(product); // حذف از کانتکس
    const updatedCartList = JSON.parse(localStorage.getItem("cartList")) || [];
    const newCartList = updatedCartList.filter((p) => p._id !== product._id);
    localStorage.setItem("cartList", JSON.stringify(newCartList)); // حذف از لوکال استورج
  };

  const price = product.price || 0;
  const quantity = product.quantity || 1;

  return (
    <tr className="border-t">
      <td className="py-4 px-4 flex items-center">
        <img
          src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
          alt={product.title}
          className="w-12 h-12 object-cover mr-4"
        />
        <span className="font-medium">{product.title}</span>
      </td>
      <td className="py-4 px-4">${price.toFixed(2)}</td>
      <td className="py-4 px-4">
        <input
          type="number"
          min="1"
          max="100"
          value={quantity}
          onChange={(e) => onQuantityChange(product._id, e.target.value)}
          className="w-16 border border-gray-300 p-3 rounded text-center text-[1.5rem]"
        />
      </td>
      <td className="py-4 px-4">${(price * quantity).toFixed(2)}</td>
      <td className="py-4 px-4">
        <button
          className="text-red-500 hover:text-red-600"
          onClick={handleRemove}
        >
          ❌
        </button>
      </td>
    </tr>
  );
};

ProductRow.propTypes = {
  product: PropTypes.object.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default ProductRow;
