import PropTypes from "prop-types";
import Slider from "react-slick";
import Product from "./Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

function FilteredProducts({ products, selectedCategory }) {
  const sliderRef = useRef(null);

  if (!selectedCategory) return null;

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory.toLowerCase()
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true, // حالت مرکز چین برای محصولات
    centerPadding: "10px", // فاصله مناسب برای حالت مرکز چین
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px", // فاصله برای مرکز چین در سایز کوچک
        },
      },
    ],
    arrows: false,
  };

  return (
    <div className="relative w-full py-8 flex items-center justify-center">
      {filteredProducts.length ? (
        <div className="w-full max-w-[90%]">
          <Slider ref={sliderRef} {...settings}>
            {filteredProducts.map((product, key) => (
              <Product key={key} product={product} />
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center">No products found for this category.</p>
      )}

      {/* دکمه‌های کنترل اسلایدر */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
        onClick={() => sliderRef.current.slickPrev()}
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
        onClick={() => sliderRef.current.slickNext()}
        aria-label="Next"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

FilteredProducts.propTypes = {
  products: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
};

export default FilteredProducts;
