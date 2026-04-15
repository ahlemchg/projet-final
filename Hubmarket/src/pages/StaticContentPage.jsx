import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const StaticContentPage = ({ title, description }) => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#001e2b] text-white pt-10 pb-20">
        <div className="container mx-auto px-4 lg:px-10">
          <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/50 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <BiChevronRight />
            <span className="text-white">{title}</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 min-h-[400px]">
            <div className="prose prose-slate max-w-none">
              <p className="text-gray-500 leading-relaxed text-lg font-medium">
                {description}
              </p>
              <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm italic">
                  Cette page est en cours de rédaction. Pour plus d'informations, veuillez contacter notre support client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticContentPage;
