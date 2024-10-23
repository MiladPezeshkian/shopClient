import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartWishlistContext } from "../context/CartWishlistContext.jsx";
import Footer from "../components/Footer/Footer.jsx";
import NavLink from "../components/NavLink/NavLink.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";
import Comments from "../components/Comments.jsx";

const serverUrl = "https://server-shop-p7jv.onrender.com";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { wishlist, cartList, toggleWishlist, toggleCartList } =
    useContext(CartWishlistContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${serverUrl}/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data.data.product); // گرفتن اطلاعات محصول
      } catch (error) {
        console.error("خطا در دریافت محصول:", error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return <Spinner />;
  }

  // چک کردن وضعیت محصول در سبد خرید و علاقه‌مندی‌ها
  const isInWishlist = wishlist.some((item) => item._id === product._id);
  const isInCart = cartList.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (quantity > 0) {
      const productWithQuantity = { ...product, quantity };
      toggleCartList(productWithQuantity);
    }
  };

  // رندر ستاره‌ها بر اساس میانگین امتیاز محصول
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-500">
            ★
          </span>
        ))}
        {halfStar && <span className="text-yellow-500">★</span>}
        {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map(
          (_, index) => (
            <span key={index} className="text-gray-300">
              ★
            </span>
          )
        )}
      </>
    );
  };

  return (
    <>
      <NavLink />
      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-12 justify-center items-start mt-8">
        {/* تصویر محصول */}
        <div className="lg:w-1/2 w-full">
          <div className="relative group">
            <img
              src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
              alt={product.title}
              className="w-full h-[500px] rounded-lg shadow-lg object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* اطلاعات محصول */}
        <div className="lg:w-1/2 w-full space-y-8">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            {product.title}
          </h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-3xl font-semibold text-green-600">
            ${product.price}
          </p>
          <p className="text-md text-gray-500">Category: {product.category}</p>

          {/* نمایش میانگین امتیاز و تعداد نظرات */}
          <div className="flex items-center text-gray-700 space-x-2">
            <p className="text-md font-medium">Rating: {product.rating || 0}</p>
            <div className="flex">{renderStars(product.rating || 0)}</div>
            <span className="text-gray-500">
              ({product.count || 0} reviews)
            </span>
          </div>

          {/* دکمه‌های افزودن به سبد خرید و علاقه‌مندی‌ها */}
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* انتخاب مقدار تعداد */}
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-4 py-2 rounded-l-lg hover:bg-gray-300 transition"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                className="w-16 text-center border border-gray-300"
                readOnly
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-4 py-2 rounded-r-lg hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            {/* افزودن به سبد خرید */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-5 rounded-lg text-lg font-bold transition-colors ${
                isInCart
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </button>

            {/* دکمه علاقه‌مندی‌ها */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-[3rem] h-[3rem] flex items-center justify-center rounded-full shadow-lg text-2xl transition-colors ${
                isInWishlist
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-white hover:bg-red-600"
              }`}
            >
              ♥
            </button>
          </div>
        </div>
      </div>

      {/* نمایش نظرات */}
      <div className="mt-12">
        <Comments productId={product._id} reviews={product.reviews} />
      </div>

      <Footer />
    </>
  );
}

export default SingleProduct;
