// ProductContext.js
import { createContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// const apiUrl = import.meta.env.VITE_API_URL;

// ایجاد کانتکست
export const ProductContext = createContext();

// کامپوننت Provider برای فراهم کردن داده‌ها
export const ProductProvider = ({ children }) => {
  // console.log(apiUrl);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cachedProducts = useRef(null); // استفاده از useRef به جای let

  useEffect(() => {
    const fetchProducts = async () => {
      if (cachedProducts.current) {
        setAllProducts(cachedProducts.current);
        setIsLoading(false);
      } else {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://server-shop-p7jv.onrender.com/api/v1/products`
          );
          const data = await response.json();
          cachedProducts.current = data.data.products; // ذخیره محصولات در cachedProducts
          setAllProducts(data.data.products);
        } catch (error) {
          console.error("خطا در دریافت محصولات:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
  }, [allProducts]);

  return (
    <ProductContext.Provider value={{ allProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductContext;
