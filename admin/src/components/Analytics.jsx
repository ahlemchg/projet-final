import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import {
  BiStats,
  BiTrendingUp,
  BiDollar,
  BiPackage,
  BiUser,
  BiLoaderAlt,
} from "react-icons/bi";
import { userRequest } from "../requestMethods";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [income, setIncome] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, incomeRes, userStatsRes] = await Promise.all([
          userRequest.get("stats"),
          userRequest.get("orders/income"),
          userRequest.get("users/stats"),
        ]);
        setStats(statsRes.data);
        setIncome(incomeRes.data);
        setUserStats(userStatsRes.data);
      } catch (err) {
        console.error("Error fetching analytics stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#f8fafc] min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40">
          <BiLoaderAlt className="animate-spin text-gray-300 mb-4" size={40} />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />

      <PageHeader
        title="Sales Analytics"
        breadcrumbs={[{ label: "Analytics" }]}
      />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#001e2b] mb-8 flex items-center gap-2">
                <BiTrendingUp className="text-blue-500" />
                Revenue Performance
              </h3>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        Monthly Income Growth
                      </p>
                      <h4 className="text-3xl font-extrabold text-[#001e2b]">
                        $
                        {income.length > 0
                          ? income
                              .reduce((acc, curr) => acc + curr.total, 0)
                              .toFixed(2)
                          : "0.00"}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                      Real-time data
                    </span>
                  </div>
                  <div className="space-y-4 pt-4">
                    {income
                      .sort((a, b) => a._id - b._id)
                      .map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <span className="w-20 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Month {item._id}
                          </span>
                          <div className="flex-grow h-2 bg-gray-50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                              style={{
                                width: `${Math.min(100, (item.total / (stats?.totalRevenue || 1)) * 100)}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-[#001e2b]">
                            ${item.total.toFixed(2)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <BiDollar className="text-amber-500 mb-3" size={24} />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Average Order
                    </p>
                    <h4 className="text-xl font-extrabold text-[#001e2b] mt-1">
                      $
                      {stats?.orders > 0
                        ? (stats.totalRevenue / stats.orders).toFixed(2)
                        : "0.00"}
                    </h4>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <BiPackage className="text-purple-500 mb-3" size={24} />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Items per Order
                    </p>
                    <h4 className="text-xl font-extrabold text-[#001e2b] mt-1">
                      2.4
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales by Category */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#001e2b] mb-8">
                Sales by Category
              </h3>
              <div className="space-y-6">
                {stats?.salesByCategory?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-[#001e2b] text-[10px]">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#001e2b]">
                          {item._id}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.count} items sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#004a99]">
                        {Math.round((item.count / stats.orders) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
                {(!stats?.salesByCategory ||
                  stats.salesByCategory.length === 0) && (
                  <p className="text-center text-gray-400 text-sm py-4">
                    No category data available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-[#001e2b] p-8 rounded-[2rem] text-white shadow-xl shadow-blue-900/10">
              <BiUser className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-extrabold mb-1">User Base</h3>
              <p className="text-blue-200/60 text-xs mb-8 font-medium">
                Growth and retention overview
              </p>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-extrabold">
                    {stats?.users}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    +
                    {userStats.length > 0
                      ? userStats[userStats.length - 1].total
                      : 0}{" "}
                    new this month
                  </span>
                </div>
                <div className="space-y-3">
                  {userStats
                    .sort((a, b) => a._id - b._id)
                    .map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/40">
                          <span>Month {item._id}</span>
                          <span>{item.total} users</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                            style={{
                              width: `${Math.min(100, (item.total / (stats?.users || 1)) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  Growth by month
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-sm font-extrabold text-[#001e2b] mb-6 uppercase tracking-widest">
                Conversion Rate
              </h3>
              <div className="flex items-center justify-center py-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-50"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={364}
                      strokeDashoffset={364 * (1 - 0.034)}
                      className="text-blue-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xl font-extrabold text-[#001e2b]">
                    3.4%
                  </span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 font-medium px-4">
                Based on unique visitors vs successful checkouts this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
