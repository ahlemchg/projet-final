import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import {
  BiCartAlt,
  BiShow,
  BiCheckCircle,
  BiLoaderAlt,
  BiChevronDown,
  BiX,
} from "react-icons/bi";
import { userRequest } from "../requestMethods";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await userRequest.get("orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await userRequest.put(`orders/${id}`, { status });
      fetchOrders();
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-amber-500 bg-amber-50";
      case "shipped":
        return "text-blue-500 bg-blue-50";
      case "delivered":
        return "text-emerald-500 bg-emerald-50";
      case "cancelled":
        return "text-red-500 bg-red-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />

      <PageHeader title="Orders Tracking" breadcrumbs={[{ label: "Orders" }]} />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BiLoaderAlt
              className="animate-spin text-gray-300 mb-4"
              size={40}
            />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Loading orders...
            </p>
          </div>
        ) : orders.length > 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 border-b border-gray-50">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Order ID
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Customer
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Date
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Total
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <span className="text-sm font-bold text-[#001e2b]">
                          #{order._id.substring(0, 8)}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#001e2b]">
                            {order.address?.firstName} {order.address?.lastName}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {order.userId}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-medium text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-bold text-[#004a99]">
                          ${order.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="relative group/status">
                          <select
                            value={order.status || "pending"}
                            onChange={(e) =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                            className={`appearance-none px-4 py-1.5 pr-8 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all outline-none ${getStatusColor(order.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <BiChevronDown
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
                            size={14}
                          />
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => openOrderDetails(order)}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <BiShow size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="p-5 bg-white rounded-full shadow-sm text-gray-400 mb-4">
              <BiCartAlt size={40} />
            </div>
            <h3 className="text-lg font-bold text-[#001e2b]">
              No orders found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Orders from your customers will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-0 sm:p-4 bg-[#001e2b]/40 backdrop-blur-sm">
          <div className="bg-white sm:rounded-[2rem] w-full max-w-2xl h-full sm:h-auto max-h-screen shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col">
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#001e2b]">
                  Order Details
                </h2>
                <p className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  #{selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-[#001e2b]"
              >
                <BiX size={24} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar flex-grow space-y-8">
              {/* Customer & Shipping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Customer Info
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#001e2b]">
                      {selectedOrder.address?.firstName}{" "}
                      {selectedOrder.address?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.address?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.address?.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Shipping Address
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      {selectedOrder.address?.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.address?.city},{" "}
                      {selectedOrder.address?.zip}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.address?.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Order Items
                </h4>
                <div className="space-y-3">
                  {selectedOrder.products?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center font-bold text-[#001e2b]">
                          {item.quantity}x
                        </div>
                        <p className="text-sm font-bold text-[#001e2b]">
                          Product ID: {item.productId?.substring(0, 10)}...
                        </p>
                      </div>
                      <p className="text-sm font-bold text-blue-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#001e2b]">
                    Total Amount
                  </span>
                  <span className="text-2xl font-extrabold text-[#004a99]">
                    ${selectedOrder.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <div className="flex-1">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Change Status
                </h4>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {["pending", "shipped", "delivered", "cancelled"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateOrderStatus(selectedOrder._id, status)
                        }
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                          selectedOrder.status === status
                            ? getStatusColor(status) +
                              " ring-2 ring-current ring-offset-2"
                            : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        {status}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="sm:w-32 py-4 bg-[#001e2b] text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#00354d] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
