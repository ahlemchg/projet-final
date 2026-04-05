import React from "react";

const IpadBanner = () => {
  return (
    <div className="container mx-auto px-4 lg:px-10 py-4 w-full lg:w-5/6">
      <div className="border border-gray-100 rounded-md p-4 md:p-6 lg:p-8 bg-white flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm min-h-[280px]">
        <div className="md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
          <div className="mb-3">
            <img
              src="/ipad-logo.jpg"
              alt="iPad Air Logo"
              className="h-6 md:h-8 w-auto object-contain"
            />
          </div>

          <h2 className="text-[24px] md:text-[32px] lg:text-[38px] font-bold text-[#001e2b] mb-3 leading-[1.1]">
            Your next <br className="hidden md:block" /> computer is not a{" "}
            <br className="hidden md:block" /> computer.
          </h2>

          <p className="text-sm md:text-base text-[#001e2b] mb-4">
            Starting from $899.
          </p>

          <button className="bg-[#ffc107] text-[#001e2b] font-bold py-2 px-8 rounded-[4px] hover:bg-[#ffb300] transition-colors shadow-sm text-[13px]">
            Buy Apple iPad Air
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center items-center relative h-full">
          <img
            src="/IPAD-CLAVIER.jpg"
            alt="iPad Air"
            className="w-full h-auto max-w-[400px] object-contain transform translate-y-2"
          />
        </div>
      </div>
    </div>
  );
};

export default IpadBanner;
