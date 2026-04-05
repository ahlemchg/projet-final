import React, { useState, useEffect } from "react";
import { BiPackage, BiUser, BiStats, BiCartAlt } from "react-icons/bi";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/products")
      .then(res => res.json())
      .then(data => setProductCount(data.length))
      .catch(err => console.error("Error fetching product count:", err));
  }, []);

  return (
    <div className="bg-white min-h-screen">
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
                  +12.5%
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Total Sales
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                $45,280.00
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                  <BiPackage size={24} />
                </div>
                <span className="text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                  Active
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Total Products
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                {productCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                  <BiUser size={24} />
                </div>
                <span className="text-[12px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                  -2.4%
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Total Users
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                8,450
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                  <BiStats size={24} />
                </div>
                <span className="text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                  +18.1%
                </span>
              </div>
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Conversion
              </h4>
              <p className="text-2xl font-extrabold text-[#001e2b] mt-1">
                3.24%
              </p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <h3 className="font-extrabold text-[#001e2b]">
                Recent Transactions
              </h3>
              <button className="text-[12px] font-bold text-blue-500 hover:underline uppercase tracking-widest">
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">
                      Product
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
                  {[
                    {
                      id: "#7452",
                      product: "iPhone 15 Pro",
                      status: "Delivered",
                      color: "bg-green-50 text-green-600",
                      amount: "$999.00",
                    },
                    {
                      id: "#7451",
                      product: "MacBook Air",
                      status: "Shipped",
                      color: "bg-amber-50 text-amber-600",
                      amount: "$1,299.00",
                    },
                    {
                      id: "#7450",
                      product: "AirPods Pro",
                      status: "Processing",
                      color: "bg-blue-50 text-blue-600",
                      amount: "$249.00",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-[13px] font-bold text-[#001e2b]">
                        {row.id}
                      </td>
                      <td className="px-6 py-4 text-[13px] text-gray-600">
                        {row.product}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${row.color}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] font-bold text-[#001e2b]">
                        {row.amount}
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
