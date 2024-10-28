import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "../Spinner/Spinner"; // Import the Spinner component

const serverUrl = "https://server-shop-p7jv.onrender.com";

const ProductSlider = ({ products, isLoading }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // فعال‌سازی تغییر خودکار
    autoplaySpeed: 4000, // تنظیم سرعت به ۴۰۰۰ میلی‌ثانیه (۴ ثانیه)
  };

  return (
    <div className="relative w-full mx-auto p-4 h-[40rem]">
      {/* نمایش Spinner در صورت loading */}
      {isLoading && <Spinner />}
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Slider {...settings}>
          {products.map((product, index) => (
            <div
              key={index}
              className="relative md:p-[2.5rem] flex flex-col md:flex-row-reverse items-center md:h-[34.4rem] justify-between w-full bg-white text-black border-y-2"
            >
              <h1 className="text-[2rem] text-red-600 line-clamp-4 text-pretty font-semibold">
                New Five Products
              </h1>
              <div className="w-full md:w-1/2 flex justify-center md:absolute right-0">
                <img
                  src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
                  alt={product.title}
                  className="w-full max-w-xs md:w-1/2 lg:max-w-lg object-contain md:h-[30rem] h-[20rem]"
                />
              </div>

              <div className="w-full md:w-1/2 mt-4 md:mt-0 p-4 md:p-8 text-center md:text-left flex flex-col justify-center items-start">
                <h2 className="text-[1.5rem] md:text-[2rem] font-semibold mb-2">
                  {product.category}
                </h2>
                <p className="text-[2rem] md:text-[3rem] lg:text-[4.8rem] mb-4">
                  {product.title}
                </p>
                <Link
                  to={`product/${product._id}`}
                  className="inline-block bg-red-700 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

ProductSlider.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ProductSlider;
