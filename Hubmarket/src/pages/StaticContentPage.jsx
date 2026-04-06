import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const StaticContentPage = ({ title, description }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-[#001e2b]">{title}</h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-600">{title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="max-w-3xl bg-[#f8f9fb] border border-gray-100 rounded-2xl p-6 md:p-10">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StaticContentPage;
