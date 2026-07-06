import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] =
    useState([]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item._id === product._id
    );

    if (exists) {
      toast.success("Already in Wishlist ❤️");
      return;
    }

    setWishlistItems([
      ...wishlistItems,
      product,
    ]);

    toast.success("Added to Wishlist ❤️");
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(
      wishlistItems.filter(
        (item) => item._id !== id
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;