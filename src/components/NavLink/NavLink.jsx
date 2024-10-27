import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useState, useContext } from "react";
import style from "./NavLink.module.css";
import { CartWishlistContext } from "../../context/CartWishlistContext.jsx";
import useAuth from "../../hook/useAuth";
import Spinner from "../Spinner/Spinner.jsx";
import { useCartWishlist } from "../../hook/useCartWishlist .jsx";

function NavLink() {
  const { saveWishlistBeforeLogout, LogoutDeleteLocal } = useCartWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { wishlist, cartList } = useContext(CartWishlistContext);
  const { isLogin, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setLoading(true);
    await saveWishlistBeforeLogout();
    LogoutDeleteLocal();

    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/auth/logout",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Logout failed");
      }

      logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <nav
        className={`${style.navbar} flex items-center justify-between p-4 w-full`}
      >
        <div className="bg-slate-800 rounded-lg p-[1rem]">
          <h1
            className="md:text-4xl font-extrabold text-2xl bg-black bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent 
          shadow-lg shadow-green-400/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-red-400/50"
            style={{
              backgroundImage:
                "linear-gradient(to right, red 25%, white 40%, yellow 55%, green 100%)",
            }}
          >
            KurdShop
          </h1>
        </div>

        <div className="hidden md:flex gap-10">
          <Link className={style.links} to="/">
            Home
          </Link>
          <Link className={style.links} to="/contact">
            Contact
          </Link>
          <Link className={style.links} to="/about">
            About
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative">
            <Link to="/wishlist">
              <FaHeart className="text-3xl md:text-4xl cursor-pointer hover:text-red-500 transition" />
            </Link>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs md:text-sm rounded-full w-6 h-6 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <div className="relative">
            <Link to="/cart">
              <FaShoppingCart className="text-3xl md:text-4xl cursor-pointer hover:text-red-500 transition" />
            </Link>
            {cartList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs md:text-sm rounded-full w-6 h-6 flex items-center justify-center">
                {cartList.length}
              </span>
            )}
          </div>
          {isLogin ? (
            <>
              <Link
                to="/profile"
                className="text-3xl md:text-4xl cursor-pointer hover:text-red-500 transition hidden md:block"
              >
                <FaUser />
              </Link>
              <button
                className="text-white bg-red-500 px-4 py-2 rounded md:block hidden"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className={`md:block hidden ${style.links}`} to="/signup">
                Sign Up
              </Link>
              <Link className={`md:block hidden ${style.links}`} to="/login">
                Login
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isOpen ? style.overlayOpen : style.overlayClose
        }`}
      >
        <button
          className="absolute top-4 right-4 text-white text-4xl"
          onClick={toggleMenu}
        >
          <FaTimes />
        </button>
        <ul className="flex flex-col items-center gap-6">
          <li>
            <Link className={style.linksMobile} to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className={style.linksMobile}
              to="/contact"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className={style.linksMobile}
              to="/about"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          {isLogin ? (
            <>
              <li>
                <Link
                  className={style.linksMobile}
                  to="/profile"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className={style.logoutButton}
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className={style.linksMobile}
                  to="/signup"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  className={style.linksMobile}
                  to="/login"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="mb-16"></div>
    </>
  );
}

export default NavLink;
