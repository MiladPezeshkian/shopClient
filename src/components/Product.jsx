// Product.js
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { CartWishlistContext } from "../context/CartWishlistContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa"; // اضافه کردن آیکون‌های مورد نیاز

function Product({ product }) {
  const { wishlist, cartList, toggleWishlist, toggleCartList } =
    useContext(CartWishlistContext);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const serverUrl = "https://server-shop-p7jv.onrender.com";
  const realPrice = product.price - 3;
  const totalReviews = product.count || 0;
  const averageRating =
    totalReviews > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        totalReviews
      : 4.5;

  const roundedRating = Math.round(averageRating);
  const isInWishlist = wishlist.some((item) => item.title === product.title);
  const isInCart = cartList.some((item) => item.title === product.title);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="relative w-full mx-auto max-w-[20rem] h-[30rem] p-4 rounded-lg bg-white shadow-lg flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-[#F8F8F8] p-4 rounded-lg">
        {product.discount && (
          <p className="absolute top-2 left-2 bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded-full">
            {product.discount}
          </p>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 text-center w-10 h-10 flex items-center justify-center shadow-md rounded-full text-lg transition-colors ${
            isInWishlist
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
          }`}
        >
          <FaHeart />
        </button>
        <img
          src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
          alt={product.title}
          className="w-full h-48 md:h-56 object-contain cursor-pointer"
          onClick={handleProductClick}
        />
        {isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCartList(product);
            }}
            className={`absolute bottom-0 left-0 right-0 bg-black text-white text-center py-3 cursor-pointer text-base md:text-lg ${
              isInCart ? "bg-green-500" : "hover:bg-red-500"
            }`}
          >
            <FaShoppingCart className="inline mr-2" />
            {isInCart ? "Selected" : "Add to Cart"}
          </button>
        )}
      </div>
      <div className="text-center mt-4">
        <p className="text-md md:text-lg font-semibold">{product.title}</p>
        <p className="text-sm md:text-md font-bold mt-2">
          ${product.price}{" "}
          {realPrice && (
            <span className="text-gray-500 line-through text-xs md:text-sm ml-2">
              ${realPrice}
            </span>
          )}
        </p>
        <div className="flex justify-center mt-2 text-lg md:text-xl">
          {/* نمایش ستاره‌ها بر اساس میانگین امتیازات */}
          {Array(roundedRating)
            .fill(0)
            .map((_, index) => (
              <FaStar key={index} className="text-yellow-400" />
            ))}
          {Array(5 - roundedRating)
            .fill(0)
            .map((_, index) => (
              <FaStar key={index} className="text-gray-300" />
            ))}
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          {totalReviews} review{totalReviews !== 1 && "s"}
        </p>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number,
    discount: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        name: PropTypes.string,
        review: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Product;
