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
        },
      },
    ],
    arrows: false,
  };

  return (
    <div className="relative w-full py-8">
      {filteredProducts.length ? (
        <Slider ref={sliderRef} {...settings}>
          {filteredProducts.map((product, key) => (
            <Product key={key} product={product} />
          ))}
        </Slider>
      ) : (
        <p>No products found for this category.</p>
      )}

      {/* دکمه‌های کنترل اسلایدر */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FaChevronLeft />
      </button>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickNext()}
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
