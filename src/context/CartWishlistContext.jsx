import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useAuth from "../hook/useAuth";

export const CartWishlistContext = createContext();

export function CartWishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isLogin } = useAuth();

  // Load data from localStorage on the first render
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedCartList = JSON.parse(localStorage.getItem("cartList")) || [];

    setWishlist(storedWishlist);
    setCartList(storedCartList);
  }, []);

  // Function to fetch wishlist from the server
  const fetchOldWishlistFromServer = useCallback(async () => {
    if (isLogin) {
      try {
        const response = await fetch(
          "https://server-shop-p7jv.onrender.com/api/v1/wishlist/getall",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data.wishList || [];
      } catch (error) {
        console.error("Error fetching wishlist from server:", error);
        return [];
      }
    }
    return [];
  }, [isLogin]);

  // Function to sync wishlist with the server
  const syncWishlistWithServer = useCallback(async () => {
    try {
      const serverWishlist = await fetchOldWishlistFromServer();
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      // Merge server and local wishlists without duplicates
      const combinedWishlist = [
        ...serverWishlist,
        ...storedWishlist.filter(
          (localItem) =>
            !serverWishlist.some(
              (serverItem) => serverItem._id === localItem._id
            )
        ),
      ];

      // Update localStorage and state
      setWishlist(combinedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(combinedWishlist));
    } catch (error) {
      console.error("Error syncing wishlist with server:", error);
    }
  }, [fetchOldWishlistFromServer]);

  // Sync wishlist with the server when the user logs in
  useEffect(() => {
    if (isLogin) {
      syncWishlistWithServer();
    }
  }, [isLogin, syncWishlistWithServer]);

  // Function to send wishlist to the server
  const sendWishlistToServer = useCallback(
    async (wishlistToSend) => {
      if (wishlistToSend && isLogin) {
        try {
          const response = await fetch(
            "https://server-shop-p7jv.onrender.com/api/v1/wishlist/setall",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ wishlist: wishlistToSend }),
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to send wishlist");
          }
          // console.log("Wishlist successfully sent to server:", response);
        } catch (error) {
          console.error("Error sending wishlist to server:", error);
        }
      }
    },
    [isLogin]
  );

  // Function to save wishlist before logout
  const saveWishlistBeforeLogout = useCallback(async () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    try {
      await sendWishlistToServer(storedWishlist);
      return true;
    } catch (error) {
      console.error("Error saving wishlist before logout:", error);
      return false;
    }
  }, [sendWishlistToServer]);

  // Function to toggle product in cartList
  const toggleCartList = useCallback(
    (product) => {
      const updatedCartList = cartList.some((item) => item._id === product._id)
        ? cartList.filter((item) => item._id !== product._id)
        : [...cartList, { ...product, quantity: product.quantity || 1 }];

      setCartList(updatedCartList);
      localStorage.setItem("cartList", JSON.stringify(updatedCartList));
    },
    [cartList]
  );

  // Function to toggle product in wishlist
  const toggleWishlist = useCallback(
    (product) => {
      const updatedWishlist = wishlist.some((item) => item._id === product._id)
        ? wishlist.filter((item) => item._id !== product._id)
        : [...wishlist, product];

      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      // Sync with server if logged in
      if (isLogin) {
        sendWishlistToServer(updatedWishlist);
      }
    },
    [wishlist, isLogin, sendWishlistToServer]
  );

  // Clear local data on logout
  const LogoutDeleteLocal = useCallback(() => {
    localStorage.removeItem("wishlist");
    localStorage.removeItem("cartList");
    setWishlist([]);
    setCartList([]);
  }, []);

  return (
    <CartWishlistContext.Provider
      value={{
        wishlist,
        cartList,
        setCartList,
        toggleWishlist,
        toggleCartList,
        saveWishlistBeforeLogout,
        setWishlist,
        totalPrice,
        setTotalPrice,
        LogoutDeleteLocal,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

CartWishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
