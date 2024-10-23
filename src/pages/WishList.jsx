import NavLink from "../components/NavLink/NavLink";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner/Spinner";
import useAuth from "../hook/useAuth";
import { useCartWishlist } from "../hook/useCartWishlist ";

function WishList() {
  const [loading, setLoading] = useState(true); // اضافه کردن حالت loading
  const { isLogin } = useAuth();
  const { wishlist, setWishlist } = useCartWishlist();

  useEffect(() => {
    const fetchWishlist = () => {
      if (!isLogin) {
        // در صورتی که کاربر لاگین نکرده باشد، ویش‌لیست محلی از localStorage خوانده می‌شود
        const storedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
      }
      setLoading(false); // پایان بارگذاری
    };

    fetchWishlist();
  }, [isLogin, setWishlist]);

  return (
    <>
      <NavLink />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="py-8 px-4 md:px-8 lg:px-16">
          <h1 className="text-center text-[5rem] font-semibold mb-8">
            WishList <span className="text-[3rem]">({wishlist.length})</span>
          </h1>
          {/* نمایش Spinner در هنگام بارگذاری */}
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner /> {/* Spinner component */}
            </div>
          ) : wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item, index) => (
                <Product key={index} product={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 text-[2rem] md:text-[5rem]">
              Your wishlist is currently empty.
            </p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default WishList;
