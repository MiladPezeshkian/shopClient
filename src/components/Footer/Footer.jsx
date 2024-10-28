// src/components/Footer/Footer.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTelegramPlane,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={`${style.footers} bg-black text-white py-12`}>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-12">
        {/* Logo and Description */}
        <div>
          <div className="bg-slate-800 rounded-lg p-[1rem] flex items-center space-x-3">
            <Link to={"/"}>
              <img
                src="/logo.png"
                alt="Bazaarok Logo"
                className="w-12 h-12 transition-transform duration-300 ease-in-out hover:scale-110 rounded-full"
              />
            </Link>
            <Link to={"/"}>
              <h1
                className="md:text-4xl font-extrabold text-2xl bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent shadow-lg shadow-green-400/50 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-red-400/50"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, red 25%, white 40%, yellow 55%, green 100%)",
                }}
              >
                Bazaarok
              </h1>
            </Link>
          </div>
          <p className="text-lg mt-2">Best deals on all products</p>
        </div>

        {/* Navigation Links (Example Sections) */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-3 text-lg">
            <li>
              <Link to="/" className={style.footerLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={style.footerLink}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className={style.footerLink}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/services" className={style.footerLink}>
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <ul className="space-y-3 text-lg">
            <li>
              <Link to="/login" className={style.footerLink}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className={style.footerLink}>
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/cart" className={style.footerLink}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className={style.footerLink}>
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex flex-col space-y-3 text-lg">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faFacebookF}
                className={style.socialIcon}
              />
              <span>Facebook</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faInstagram}
                className={style.socialIcon}
              />
              <span>Instagram</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className={style.socialIcon}
              />
              <span>LinkedIn</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faTelegramPlane}
                className={style.socialIcon}
              />
              <span>Telegram</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faGithub} className={style.socialIcon} />
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm">
        <hr className="border-gray-700 mb-4" />
        <p>&copy; 2024 Exclusive. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
