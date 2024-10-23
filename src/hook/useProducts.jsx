// useProducts.js
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

// ساخت هوک برای دسترسی به داده‌های محصولات
export const useProducts = () => {
  return useContext(ProductContext);
};
