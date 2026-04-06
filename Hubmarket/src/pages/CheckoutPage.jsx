import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import {
  BiChevronRight,
  BiCheckCircle,
  BiTag,
  BiChevronDown,
  BiLoaderAlt,
} from "react-icons/bi";
import { publicRequest, userRequest } from "../requestMethods";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartTotal, cartItems, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "United States (US)",
    zip: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      setCouponError("");
      const res = await publicRequest.get(
        `coupons/validate/${couponCode.trim()}?email=${formData.email}`,
      );
      setAppliedCoupon(res.data);
      alert("Coupon applied successfully!");
    } catch (err) {
      setCouponError(err.response?.data || "Invalid coupon code.");
      setAppliedCoupon(null);
    }
  };

  const calculateDiscountedTotal = () => {
    if (!appliedCoupon) return cartTotal;

    if (appliedCoupon.discountType === "percentage") {
      return cartTotal - (cartTotal * appliedCoupon.discount) / 100;
    } else {
      return Math.max(0, cartTotal - appliedCoupon.discount);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!userInfo?._id) {
      navigate("/login");
      return;
    }
    setIsLoading(true);

    const finalAmount = calculateDiscountedTotal();

    const orderData = {
      userId: userInfo._id,
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      amount: finalAmount,
      address: {
        ...formData,
      },
      couponCode: appliedCoupon?.code,
      status: "pending",
    };

    try {
      await userRequest.post("orders", orderData);
      setIsOrdered(true);
      clearCart();
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong with your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isOrdered) {
    return (
      <div className="bg-white min-h-screen py-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
          <BiCheckCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-[#001e2b] mb-3">
          Order Received!
        </h1>
        <p className="text-gray-500 mb-6 max-w-md text-sm">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link
          to="/"
          className="px-8 py-2.5 bg-[#001e2b] text-white font-bold rounded-sm transition-colors text-sm"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="container mx-auto px-12 md:px-24 lg:px-40 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[32px] font-bold text-[#001e2b]">Checkout</h1>
          <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
            <Link to="/" className="hover:text-amber-400">
              Home
            </Link>
            <BiChevronRight size={16} />
            <span className="text-gray-400">Checkout</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-[#f8f9fb] border-t-2 border-[#001e2b] p-3 flex items-center gap-2 text-[#001e2b] text-[13px]">
            <BiTag className="text-[#001e2b] transform -scale-x-100" />
            <span>
              Have a coupon?{" "}
              <button
                type="button"
                onClick={() => setShowCoupon(!showCoupon)}
                className="font-bold hover:text-amber-500 transition-colors"
              >
                Click here to enter your code
              </button>
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showCoupon ? "max-h-[200px] mt-4" : "max-h-0"
            }`}
          >
            <div className="p-4 border border-gray-100 rounded-sm">
              <p className="text-[13px] text-gray-600 mb-4">
                If you have a coupon code, please apply it below.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px] w-full sm:w-64"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-8 py-2 bg-[#001e2b] text-white font-bold rounded-sm hover:bg-[#002b3d] transition-all text-[13px]"
                >
                  Apply coupon
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-[11px] mt-2 font-bold">
                  {couponError}
                </p>
              )}
              {appliedCoupon && (
                <p className="text-green-600 text-[11px] mt-2 font-bold">
                  Coupon {appliedCoupon.code} applied! (
                  {appliedCoupon.discountType === "percentage"
                    ? appliedCoupon.discount + "%"
                    : "$" + appliedCoupon.discount}{" "}
                  off)
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between mb-10 border border-gray-100 rounded-sm overflow-hidden">
          <div className="flex-1 flex items-center justify-center gap-3 py-3 border-r border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#001e2b] text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <span className="font-bold text-[#001e2b] text-sm">
              Shopping Cart
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-3 py-3 bg-[#f8f9fb] border-r border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#001e2b] text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <span className="font-bold text-[#001e2b] text-sm">
              Payment and Delivery Options
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-3 py-3 bg-white opacity-40">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <span className="font-bold text-gray-600 text-sm">
              Order Received
            </span>
          </div>
        </div>

        <form
          onSubmit={handleOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-[#001e2b] mb-6">
              Billing details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm appearance-none bg-white text-[13px] font-medium"
                  >
                    <option>United States (US)</option>
                    <option>France</option>
                    <option>United Kingdom</option>
                  </select>
                  <BiChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House number and street name"
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm mb-3 text-[13px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm appearance-none bg-white text-[13px] font-medium">
                    <option>New York</option>
                    <option>California</option>
                    <option>Texas</option>
                  </select>
                  <BiChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  ZIP <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm text-[13px]"
                />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-[#001e2b] mb-6">
                Additional information
              </h2>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#001e2b]">
                  Order notes (optional)
                </label>
                <textarea
                  rows="4"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#001e2b] rounded-sm resize-none text-[13px]"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#f8f9fb] p-6 rounded-sm relative">
              <div className="absolute top-0 left-0 w-full h-2 overflow-hidden flex">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-4 h-4 bg-white transform rotate-45 -translate-y-2"
                  ></div>
                ))}
              </div>

              <h2 className="text-xl font-bold text-[#001e2b] mb-6">
                Your order
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start text-[13px]"
                  >
                    <span className="text-[#001e2b] font-medium pr-4">
                      {item.name}{" "}
                      <strong className="font-bold ml-1 text-[14px]">
                        × {item.quantity}
                      </strong>
                    </span>
                    <span className="font-medium text-[#001e2b] whitespace-nowrap">
                      $
                      {(
                        (typeof item.price === "string"
                          ? parseFloat(item.price.replace("$", ""))
                          : item.price) * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider text-[#001e2b]">
                  <span>SUBTOTAL</span>
                  <span className="text-[16px]">${cartTotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider text-green-600">
                    <span>DISCOUNT ({appliedCoupon.code})</span>
                    <span className="text-[16px]">
                      -${(cartTotal - calculateDiscountedTotal()).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#001e2b]">
                    TOTAL
                  </span>
                  <span className="text-2xl font-bold text-[#001e2b]">
                    ${calculateDiscountedTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-8 bg-white border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-[#001e2b] mb-4">
                  Payment
                </h3>

                <div className="border border-gray-200 rounded-sm p-4 mb-4">
                  <div className="flex gap-3 items-start">
                    <input
                      type="radio"
                      id="cash_on_delivery"
                      name="payment_method"
                      checked
                      readOnly
                      className="mt-1 accent-[#001e2b]"
                    />
                    <div>
                      <label
                        htmlFor="cash_on_delivery"
                        className="text-[13px] font-bold text-[#001e2b]"
                      >
                        Cash on delivery
                      </label>
                      <p className="text-[12px] text-gray-600 mt-1">
                        Pay with cash when your order is delivered.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 leading-relaxed mb-6">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <button
                    type="button"
                    className="text-[#001e2b] font-bold hover:underline"
                  >
                    privacy policy
                  </button>
                  .
                </p>

                <button
                  type="submit"
                  disabled={isLoading || cartItems.length === 0}
                  className="w-full mt-6 py-4 bg-[#001e2b] text-white font-extrabold rounded-sm hover:bg-[#002b3d] transition-all text-[12px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <BiLoaderAlt className="animate-spin" size={20} />
                      PROCESSING...
                    </>
                  ) : (
                    "PLACE ORDER"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
