import React from "react";
import { Link } from "react-router-dom";
import { BiX, BiCartAlt, BiChevronRight } from "react-icons/bi";
import { useCart } from "../context/CartContext.jsx";

const CartDrawer = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[320px] bg-white z-[1001] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#001e2b]">Shopping Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <BiX size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-md p-1.5 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-[13px] font-bold text-[#001e2b] mb-1 line-clamp-2 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 mb-1.5 font-medium">
                      {item.quantity} ×{" "}
                      <span className="text-[#001e2b] font-bold">
                        ${parseFloat(item.price.replace("$", "")).toFixed(2)}
                      </span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-[#002E42] rounded-full overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-white hover:bg-[#003d57] transition-colors font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="px-1.5 text-[11px] font-bold text-white min-w-[15px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-white hover:bg-[#003d57] transition-colors font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[13px] font-bold text-[#001e2b]">
                        $
                        {(
                          parseFloat(item.price.replace("$", "")) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                  >
                    <BiX size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                <BiCartAlt size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#001e2b] mb-1.5">
                No products in the cart.
              </h3>
              <p className="text-gray-500 text-[13px]">
                Your shopping cart is currently empty.
              </p>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-500">
                Subtotal
              </span>
              <span className="text-lg font-bold text-[#001e2b]">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 bg-[#222] text-white font-bold rounded-sm hover:bg-black transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                CHECKOUT <BiChevronRight size={18} />
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 border border-gray-200 text-[#222] font-bold rounded-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-[12px] uppercase tracking-wider text-center"
              >
                VIEW CART <BiChevronRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
