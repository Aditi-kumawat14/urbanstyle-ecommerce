import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToWishlist = (product) => {
    setItems((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const removeFromWishlist = (productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId) => items.some((p) => p.id === productId);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
