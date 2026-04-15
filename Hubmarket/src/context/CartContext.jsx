import React, { createContext, useContext, useState, useEffect } from "react";
import Toast from "../components/Toast.jsx";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
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
      image:
        product?.image ||
        (Array.isArray(product?.img) ? product.img[0] : product?.img) ||
        "/product_1.jpg",
      price: normalizePrice(product?.price),
    };
  };

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("hubmarket_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: "" });
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem("hubmarket_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setToast({
      isOpen: true,
      message: `Coupon "${coupon.code}" applied! You got ${coupon.discount}% off.`,
    });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setToast({
      isOpen: true,
      message: "Coupon removed.",
    });
  };

  const addToCart = (product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    const isAuthenticated = Boolean(userInfo?._id && userInfo?.accessToken);
    if (!isAuthenticated) {
      setToast({
        isOpen: true,
        message: "Please login to add products to cart.",
      });
      return;
    }

    const normalizedProduct = normalizeProduct(product);
    const productId = normalizedProduct.id;
    if (!productId) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...normalizedProduct, quantity: 1 }];
    });
    setToast({
      isOpen: true,
      message: `"${normalizedProduct.name}" added to cart!`,
    });
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
    if (itemToRemove) {
      setToast({
        isOpen: true,
        message: `"${itemToRemove.name}" removed from cart.`,
      });
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setToast({ isOpen: true, message: "Cart cleared successfully." });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + normalizePrice(item.price) * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const cartTotal = subtotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        subtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </CartContext.Provider>
  );
};
