import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { BiChevronRight, BiTrash, BiCartAlt, BiHeart } from "react-icons/bi";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return (
    <div className="bg-white min-h-screen">
      
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-[#001e2b]">Wishlist</h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-600">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 pb-20 overflow-hidden">
        {wishlistItems.length > 0 ? (
          <div className="overflow-x-auto -mx-4 px-4 pb-4">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 px-4 text-[13px] font-extrabold uppercase tracking-widest text-gray-400">
                    Product
                  </th>
                  <th className="text-left py-4 px-4 text-[13px] font-extrabold uppercase tracking-widest text-gray-400">
                    Price
                  </th>
                  <th className="text-left py-4 px-4 text-[13px] font-extrabold uppercase tracking-widest text-gray-400">
                    Stock Status
                  </th>
                  <th className="text-left py-4 px-4 text-[13px] font-extrabold uppercase tracking-widest text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr
                    key={item._id || item.id}
                    className="border-b border-gray-50 group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => removeFromWishlist(item._id || item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <BiTrash size={20} />
                        </button>
                        <div className="w-20 h-20 bg-white rounded-lg border border-gray-100 p-2 flex-shrink-0">
                          <img
                            src={item.image || (item.img && item.img[0])}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <Link
                          to={`/product/${item._id || item.id}`}
                          className="text-[14px] font-extrabold text-[#001e2b] hover:text-[#004a99] transition-colors"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <span className="text-[14px] font-extrabold text-[#001e2b]">
                        $
                        {typeof item.price === "number"
                          ? item.price.toFixed(2)
                          : item.price}
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <span className="text-[12px] font-bold text-green-500 uppercase tracking-wide">
                        In Stock
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-[#001e2b] text-white px-6 py-2.5 rounded-full font-extrabold text-[12px] uppercase tracking-widest hover:bg-[#ffb400] hover:text-[#001e2b] transition-all flex items-center gap-2"
                      >
                        <BiCartAlt size={18} />
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-200">
                <BiHeart size={40} />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-[#001e2b] mb-2">
              Your wishlist is empty.
            </h3>
            <p className="text-gray-400 font-medium mb-8">
              No products added to the wishlist as of now.
            </p>
            <Link
              to="/"
              className="bg-[#001e2b] text-white px-10 py-3.5 rounded-full font-extrabold text-[13px] uppercase tracking-widest hover:bg-[#ffb400] hover:text-[#001e2b] transition-all inline-block shadow-lg"
            >
              Return To Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
