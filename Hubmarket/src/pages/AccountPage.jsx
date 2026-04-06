import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiChevronRight,
  BiPackage,
  BiLogOut,
  BiLoaderAlt,
  BiX,
} from "react-icons/bi";
import { publicRequest, userRequest } from "../requestMethods";

const AccountPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productMap, setProductMap] = useState({});
  const [ratingModal, setRatingModal] = useState({
    isOpen: false,
    orderId: null,
    products: [],
  });
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await userRequest.get(`orders/find/${userInfo._id}`);
        setOrders(res.data);

        const ids = [
          ...new Set(
            (res.data || [])
              .flatMap((o) => (Array.isArray(o.products) ? o.products : []))
              .map((p) => String(p.productId))
              .filter(Boolean),
          ),
        ];
        const entries = await Promise.all(
          ids.map(async (pid) => {
            try {
              const pRes = await publicRequest.get(`products/find/${pid}`);
              return [pid, pRes.data];
            } catch (e) {
              return [pid, null];
            }
          }),
        );
        setProductMap(Object.fromEntries(entries.filter(([, v]) => v)));
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo, navigate]);

  const openRatingModal = (order) => {
    const items = Array.isArray(order.products) ? order.products : [];
    const products = items
      .map((it) => {
        const p = productMap[String(it.productId)];
        if (!p) return null;
        return {
          id: String(p._id || p.id),
          name: p.name || p.title || "Product",
          image: p.image || (Array.isArray(p.img) ? p.img[0] : ""),
          ratingAvg: Number(p.ratingAvg || 0),
          ratingCount: Number(p.ratingCount || 0),
          myRating:
            (p.ratings || []).find((r) => r.userId === userInfo?._id)?.rating ||
            0,
        };
      })
      .filter(Boolean);

    setRatingModal({
      isOpen: true,
      orderId: order._id,
      products,
    });
  };

  const submitRating = async (productId, rating) => {
    setIsSubmittingRating(true);
    try {
      const res = await userRequest.post(`products/${productId}/rate`, {
        rating,
      });
      const updated = res.data;
      setProductMap((prev) => ({ ...prev, [String(productId)]: updated }));
      setRatingModal((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === String(productId)
            ? {
                ...p,
                myRating: rating,
                ratingAvg: Number(updated.ratingAvg || 0),
                ratingCount: Number(updated.ratingCount || 0),
              }
            : p,
        ),
      }));
    } catch (e) {
      alert(e.response?.data || "Impossible d'envoyer la note.");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (!userInfo) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-[#001e2b]">My Account</h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-600">My Account</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#001e2b] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {userInfo.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-[#001e2b]">{userInfo.username}</h3>
                  <p className="text-xs text-gray-500">{userInfo.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#001e2b] text-white rounded-xl font-bold text-sm transition-all">
                  <BiPackage size={20} />
                  My Orders
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all"
                >
                  <BiLogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-[#001e2b] mb-6">Recent Orders</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <BiLoaderAlt className="animate-spin text-gray-300 mb-4" size={40} />
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Loading your orders...
                </p>
              </div>
            ) : orders.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-gray-400 border-b border-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Order ID</th>
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Total</th>
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-[#001e2b]">#{order._id.substring(0, 8)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-[#004a99]">${order.amount.toFixed(2)}</span>
                          </td>
                          <td className="px-6 py-4">
                            {String(order.status).toLowerCase() === "delivered" ? (
                              <button
                                onClick={() => openRatingModal(order)}
                                className="px-4 py-2 rounded-xl bg-[#001e2b] text-white font-bold text-[11px] uppercase tracking-widest hover:bg-[#002b3d] transition-colors"
                              >
                                Rate
                              </button>
                            ) : (
                              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <BiPackage size={40} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-[#001e2b]">No orders yet</h3>
                <p className="text-gray-400 text-sm mt-1">When you place an order, it will appear here.</p>
                <Link 
                  to="/" 
                  className="mt-6 px-6 py-2 bg-[#001e2b] text-white font-bold rounded-xl hover:bg-[#002b3d] transition-all text-sm"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {ratingModal.isOpen && (
        <div className="fixed inset-0 z-[250] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-[#001e2b]">
                  Rate your products
                </h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Order #{String(ratingModal.orderId).slice(0, 8)}
                </p>
              </div>
              <button
                onClick={() =>
                  setRatingModal({ isOpen: false, orderId: null, products: [] })
                }
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <BiX size={22} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {ratingModal.products.length ? (
                ratingModal.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-100 rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-extrabold text-[#001e2b]">
                          {p.name}
                        </p>
                        <p className="text-[12px] font-bold text-gray-400">
                          {p.ratingAvg ? `${p.ratingAvg.toFixed(1)}/5` : "No rating"}{" "}
                          {p.ratingCount ? `(${p.ratingCount})` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          disabled={isSubmittingRating}
                          onClick={() => submitRating(p.id, s)}
                          className={`text-2xl leading-none transition-colors ${
                            (p.myRating || 0) >= s
                              ? "text-amber-400"
                              : "text-gray-200"
                          } hover:text-amber-400`}
                          aria-label={`Rate ${s} stars`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-gray-400 font-bold">
                  Loading products...
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={() =>
                  setRatingModal({ isOpen: false, orderId: null, products: [] })
                }
                className="px-6 py-3 rounded-xl bg-[#001e2b] text-white font-bold text-[11px] uppercase tracking-widest hover:bg-[#002b3d] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
