import React from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import { BiUser } from "react-icons/bi";

const Users = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <PageHeader 
        title="Users Management"
        breadcrumbs={[{ label: "Users" }]}
      />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="mt-10 flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="p-5 bg-white rounded-full shadow-sm text-gray-400 mb-4">
            <BiUser size={40} />
          </div>
          <h3 className="text-lg font-bold text-[#001e2b]">No users yet</h3>
          <p className="text-gray-400 text-sm mt-1">A list of all registered users will be shown here.</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
