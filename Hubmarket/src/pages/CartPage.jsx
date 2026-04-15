import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { BiX, BiChevronRight, BiArrowBack } from "react-icons/bi";
import { publicRequest } from "../requestMethods";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    cartCount,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponInput) return;
    try {
      setCouponError("");
      const res = await publicRequest.get(
        `coupons/validate/${couponInput.toUpperCase()}`,
      );
      applyCoupon(res.data);
      setCouponInput("");
    } catch (err) {
      setCouponError(err.response?.data || "Invalid coupon code.");
    }
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen py-8">
      <div className="container mx-auto px-12 md:px-24 lg:px-40">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-[#001e2b]">Cart</h1>
          <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-2 md:mt-0">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-400">Cart</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center gap-8 mb-8 bg-white p-4 rounded-sm shadow-sm border border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#001e2b] text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <span className="font-bold text-[#001e2b] text-sm">
              Shopping Cart
            </span>
          </div>
          <div className="flex items-center gap-2.5 opacity-40 grayscale">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs">
              2
            </span>
            <span className="font-bold text-sm">
              Payment and Delivery Options
            </span>
          </div>
          <div className="flex items-center gap-2.5 opacity-40 grayscale">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <span className="font-bold text-sm">Order Received</span>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
              <div className="hidden md:grid grid-cols-12 gap-4 p-3 bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold uppercase tracking-widest text-[#001e2b]">
                <div className="col-span-6">Product ({cartCount})</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-1 text-center">Total</div>
                <div className="col-span-1 text-right">Remove</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center"
                  >
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-md p-1.5 flex-shrink-0">
                        <img
                          src={item.image || (item.img && item.img[0])}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-[#001e2b] text-sm">
                        {item.name}
                      </h3>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center flex justify-between md:block">
                      <span className="md:hidden text-gray-400 text-[10px] font-bold uppercase">
                        Price:
                      </span>
                      <span className="font-bold text-[#001e2b] text-sm">
                        $
                        {(typeof item.price === "string"
                          ? parseFloat(item.price.replace("$", ""))
                          : item.price
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id || item.id,
                              item.quantity - 1,
                            )
                          }
                          className="px-2 py-0.5 hover:bg-gray-50 transition-colors font-bold text-gray-500 text-sm"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-[#001e2b] min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id || item.id,
                              item.quantity + 1,
                            )
                          }
                          className="px-2 py-0.5 hover:bg-gray-50 transition-colors font-bold text-gray-500 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-1 text-center flex justify-between md:block">
                      <span className="md:hidden text-gray-400 text-[10px] font-bold uppercase">
                        Total:
                      </span>
                      <span className="font-bold text-[#001e2b] text-sm">
                        $
                        {(
                          (typeof item.price === "string"
                            ? parseFloat(item.price.replace("$", ""))
                            : item.price) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="col-span-1 md:col-span-1 text-right">
                      <button
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1.5"
                      >
                        <BiX size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col">
                <div className="flex w-full md:w-auto border border-gray-200 rounded-sm overflow-hidden">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="px-4 py-2 text-[13px] focus:outline-none w-full md:w-56"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3 bg-white border-l border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <BiChevronRight size={20} />
                  </button>
                </div>
                {couponError && (
                  <p className="text-red-500 text-[10px] mt-1 font-bold">
                    {couponError}
                  </p>
                )}
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link
                  to="/"
                  className="flex-1 md:flex-none px-6 py-2 bg-white border border-gray-200 text-[#001e2b] font-bold rounded-sm hover:bg-gray-50 transition-colors text-center text-[13px]"
                >
                  Continue Shopping
                </Link>
                <button className="flex-1 md:flex-none px-6 py-2 bg-gray-500 text-white font-bold rounded-sm hover:bg-gray-600 transition-colors text-[13px]">
                  Update cart
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-6">
              <div className="w-full md:w-[400px]">
                <h2 className="text-xl font-extrabold text-[#001e2b] mb-4">
                  Cart Total
                </h2>
                <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex justify-between p-4 border-b border-gray-50">
                    <span className="text-gray-500 font-bold text-[12px] uppercase tracking-wider">
                      Subtotal
                    </span>
                    <span className="text-[#001e2b] font-bold text-sm">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between p-4 border-b border-gray-50 text-green-600">
                      <span className="font-bold text-[12px] uppercase tracking-wider flex items-center gap-1">
                        Discount ({appliedCoupon.code})
                        <button
                          onClick={removeCoupon}
                          className="text-red-500 hover:text-red-700"
                        >
                          <BiX size={16} />
                        </button>
                      </span>
                      <span className="font-bold text-sm">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between p-4 border-b border-gray-50">
                    <span className="text-gray-500 font-bold text-[12px] uppercase tracking-wider">
                      Shipping
                    </span>
                    <span className="text-[#001e2b] font-bold text-sm">
                      Calculated at next step
                    </span>
                  </div>

                  <div className="flex justify-between p-4 bg-gray-50/50">
                    <span className="text-gray-500 font-bold text-[12px] uppercase tracking-wider">
                      Total
                    </span>
                    <span className="text-[#001e2b] font-extrabold text-lg">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="w-full mt-4 py-3 bg-[#002b3d] text-white font-bold rounded-sm hover:bg-[#001e2b] transition-all flex items-center justify-center gap-3 text-[12px] tracking-widest group"
                >
                  PROCEED TO CHECKOUT
                  <BiChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-sm shadow-sm p-12 text-center flex flex-col items-center border border-gray-100">
            <div className="w-16 h-16 bg-[#f8f9fb] rounded-full flex items-center justify-center mb-4 text-gray-300">
              <BiArrowBack size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#001e2b] mb-4">
              Your cart is currently empty.
            </h2>
            <Link
              to="/"
              className="px-8 py-3 bg-[#002b3d] text-white font-bold rounded-sm hover:bg-[#001e2b] transition-colors text-sm"
            >
              Return to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
