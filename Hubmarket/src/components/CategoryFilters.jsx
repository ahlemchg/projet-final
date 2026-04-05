import React from "react";

const CategoryFilters = () => {
  const categories = [
    "Wireless Networks",
    "Cell Phones",
    "Cameras Camcorders",
    "Gaming Monitors",
    "Virtual Reality",
    "Bluetooth Speakers",
  ];

  return (
    <div className="container mx-auto px-4 lg:px-10 py-4">
      <div className="flex items-center justify-center gap-3 flex-wrap md:flex-nowrap overflow-x-auto no-scrollbar py-1">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`
              px-6 py-2 rounded-full text-[11px] font-bold transition-all duration-300 whitespace-nowrap min-w-[120px]
              bg-[#f4f7f9] text-[#001e2b]
              hover:bg-black hover:text-white hover:shadow-lg
              active:scale-95
            `}
          >
            <span className="flex flex-col items-center justify-center leading-tight">
              {category.split(" ").map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
