import React, { useState, useEffect } from "react";
import { BiPackage, BiUser, BiStats, BiCartAlt, BiLoaderAlt } from "react-icons/bi";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import { userRequest } from "../requestMethods";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          userRequest.get("stats"),
          userRequest.get("orders"),
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#f8fafc] min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40">
          <BiLoaderAlt className="animate-spin text-gray-300 mb-4" size={40} />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />

      <PageHeader
        title="Dashboard Overview"
        breadcrumbs={[{ label: "Admin Dashboard" }]}
        showAddButton={false}
      />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                  <BiCartAlt size={24} />
                </div>
                <span className="text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                  Active
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Total Revenue
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                ${stats?.totalRevenue.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                  <BiPackage size={24} />
                </div>
                <span className="text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                  Live
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Total Products
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                {stats?.products || 0}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                  <BiUser size={24} />
                </div>
                <span className="text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                  Active
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Total Users
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                {stats?.users || 0}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                  <BiStats size={24} />
                </div>
                <span className="text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                  Orders
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Total Orders
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                {stats?.orders || 0}
              </p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <h3 className="font-extrabold text-[#001e2b]">
                Recent Orders
              </h3>
              <a href="/orders" className="text-[12px] font-bold text-blue-500 hover:underline uppercase tracking-widest">
                View all
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-[13px] font-bold text-[#001e2b]">
                        #{order._id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 text-[13px] text-gray-600">
                        {order.address?.firstName} {order.address?.lastName}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                            order.status === "delivered" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] font-bold text-[#001e2b]">
                        ${order.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
