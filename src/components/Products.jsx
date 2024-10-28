// Products.js
import PropTypes from "prop-types";
import Slider from "react-slick";
import Product from "./Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

function Products({ products }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true, // فعال‌سازی حالت وسط‌چین
    centerPadding: "10px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "20px", // تنظیم padding برای سایزهای متوسط
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "60px", // فضای بیشتری در اطراف محصول
        },
      },
    ],
    arrows: false,
  };

  return (
    <div className="relative w-full py-8 flex justify-center items-center">
      {/* اسلایدر محصولات */}
      <Slider
        ref={sliderRef}
        {...settings}
        className="w-full max-w-5xl mx-auto"
      >
        {products.map((product, key) => (
          <div key={key} className="px-2">
            <Product product={product} />
          </div>
        ))}
      </Slider>

      {/* دکمه سفارشی قبلی */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-10"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* دکمه سفارشی بعدی */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-10"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}

// تعریف PropTypes برای Products
Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          review: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default Products;
