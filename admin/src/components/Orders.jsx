import React from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import { BiCartAlt } from "react-icons/bi";

const Orders = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <PageHeader 
        title="Orders Tracking"
        breadcrumbs={[{ label: "Orders" }]}
      />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="mt-10 flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="p-5 bg-white rounded-full shadow-sm text-gray-400 mb-4">
            <BiCartAlt size={40} />
          </div>
          <h3 className="text-lg font-bold text-[#001e2b]">No orders found</h3>
          <p className="text-gray-400 text-sm mt-1">Orders from your customers will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
