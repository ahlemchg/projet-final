import React, { createContext, useContext, useState, useEffect } from "react";
import Toast from "../components/Toast.jsx";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const normalizePrice = (value) => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const parsed = parseFloat(value.replace("$", "").trim());
      return Number.isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const normalizeProduct = (product) => {
    const id = product?._id || product?.id;
    return {
      ...product,
      id,
      name: product?.name || product?.title || "Product",
      image: product?.image || (Array.isArray(product?.img) ? product.img[0] : product?.img) || "/product_1.jpg",
      price: normalizePrice(product?.price),
    };
  };

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [toast, setToast] = useState({ isOpen: false, message: "" });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    const isAuthenticated = Boolean(userInfo?._id && userInfo?.accessToken);
    if (!isAuthenticated) {
      setToast({
        isOpen: true,
        message: "Please login to use wishlist.",
      });
      return;
    }

    const normalizedProduct = normalizeProduct(product);
    const productId = normalizedProduct.id;
    if (!productId) return;

    setWishlistItems((prevItems) => {
      const isItemInWishlist = prevItems.find((item) => item.id === productId);
      if (isItemInWishlist) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return [...prevItems, normalizedProduct];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </WishlistContext.Provider>
  );
};
