// Products.js
import PropTypes from "prop-types";
import Slider from "react-slick";
import Product from "./Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // اضافه کردن آیکون‌های دکمه
import { useRef } from "react";

function Products({ products }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false, // نقاط را غیرفعال می‌کنیم
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
    arrows: false, // دکمه‌های پیش‌فرض را غیرفعال می‌کنیم
  };

  return (
    <div className="relative w-full py-8">
      {/* اسلایدر محصولات */}
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, key) => (
          <Product key={key} product={product} />
        ))}
      </Slider>

      {/* دکمه سفارشی قبلی */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FaChevronLeft />
      </button>

      {/* دکمه سفارشی بعدی */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

// تعریف PropTypes برای Products
Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // _id به عنوان شناسه محصول
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      // حذف rating چون در مدل وجود ندارد
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          review: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        })
      ), // اضافه کردن پروپ تایپ برای نظرات
    })
  ).isRequired,
};

export default Products;
