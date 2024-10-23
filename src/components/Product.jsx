import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { CartWishlistContext } from "../context/CartWishlistContext.jsx";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const { wishlist, cartList, toggleWishlist, toggleCartList } =
    useContext(CartWishlistContext);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  // آدرس سرور
  const serverUrl = "https://server-shop-p7jv.onrender.com";

  // محاسبه قیمت واقعی (در صورت وجود تخفیف)
  const realPrice = product.price - 3;

  // محاسبه میانگین امتیازات نظرات
  const totalReviews = product.count ? product.count : 0;
  const averageRating =
    totalReviews > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        totalReviews
      : 4.5; // مقدار پیش‌فرض اگر نظری وجود ندارد

  const roundedRating = Math.round(averageRating); // گرد کردن امتیاز

  const isInWishlist = wishlist.some((item) => item.title === product.title);
  const isInCart = cartList.some((item) => item.title === product.title);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`); // هدایت به صفحه محصول با شناسه محصول
  };

  return (
    <div
      className="relative w-full mx-[5rem] max-w-[20rem] h-[28rem] p-4 rounded-lg bg-white shadow-md flex flex-col justify-between transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#F5F5F5] p-4 relative rounded-lg">
        {product.discount && (
          <p className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
            {product.discount}
          </p>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation(); // جلوگیری از انتقال رویداد کلیک به والد
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 text-center w-[2.9rem] h-[2.9rem] flex items-center justify-center shadow-md rounded-full text-[2rem] transition-colors ${
            isInWishlist
              ? "bg-red-600 text-white hover:bg-red-600 hover:text-white"
              : "bg-black text-white hover:text-red-600 hover:bg-white"
          }`}
        >
          ♥
        </button>
        <img
          src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`} // اضافه کردن آدرس سرور و جایگزینی بک‌اسلش‌ها
          alt={product.title}
          className="w-full h-[12rem] object-contain cursor-pointer"
          onClick={handleProductClick} // فقط تصویر کلیک پذیر است
        />
        {isHovered && (
          <div
            onClick={(e) => {
              e.stopPropagation(); // جلوگیری از انتقال رویداد کلیک به والد
              toggleCartList(product);
            }}
            className={`absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 cursor-pointer text-[1.3rem] ${
              isInCart ? "bg-green-500" : "hover:bg-red-500"
            }`}
          >
            {isInCart ? "Selected" : "Add to Cart"}
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold mt-4">{product.title}</p>
        <p className="text-md font-bold mt-2">
          ${product.price}{" "}
          {realPrice && (
            <span className="text-gray-400 line-through">${realPrice}</span>
          )}
        </p>
        <div className="flex justify-center mt-2 text-[2rem]">
          {/* نمایش ستاره‌ها بر اساس میانگین امتیازات */}
          {Array(roundedRating)
            .fill(0)
            .map((_, index) => (
              <span key={index} className="text-yellow-400">
                ★
              </span>
            ))}
          {Array(5 - roundedRating)
            .fill(0)
            .map((_, index) => (
              <span key={index} className="text-gray-300">
                ★
              </span>
            ))}
        </div>
        <p className="text-sm text-gray-500">
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
