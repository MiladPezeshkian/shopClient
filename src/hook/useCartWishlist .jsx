import { useContext } from "react";
import { CartWishlistContext } from "../context/CartWishlistContext";

export const useCartWishlist = () => {
  return useContext(CartWishlistContext);
};
