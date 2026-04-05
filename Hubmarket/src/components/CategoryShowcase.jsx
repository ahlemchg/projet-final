import React from "react";
import { BiChevronRight } from "react-icons/bi";

const CategoryShowcase = () => {
  const categories = [
    {
      title: "Smartphones",
      items: [
        "iPhone 11 Pro",
        "Google Pixel",
        "Samsung Galaxy",
        "Sony Xperia Series",
      ],
      image: "/bg-white.jpg",
      link: "#",
    },
    {
      title: "Tablets",
      items: [
        "Apple iPad Pro",
        "Android Samsung",
        "Google",
        "Microsoft X Series",
      ],
      image: "/chinwiya.jpg",
      link: "#",
    },
    {
      title: "Computers",
      items: [
        "Apple Macbook",
        "Lenovo IdeaPad",
        "Computer Tablets",
        "Google Chromebook",
      ],
      image: "/slide2.jpg",
      link: "#",
    },
    {
      title: "Headphones",
      items: [
        "In-Ear Headphones",
        "Apple AirPods Pro",
        "Samsung Earbuds",
        "Google Wireless",
      ],
      image: "/airpodsPro.jpg",
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto px-4 w-5/6 lg:px-10 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 bg-[#10a342] rounded-sm p-6 flex flex-col items-center text-center text-white relative overflow-hidden min-h-[400px]">
          <div className="z-10">
            <div className="flex flex-col items-center mb-4">
              <div className="w-10 h-10 mb-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.5-13.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-3 3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-6-3C7.672 8.5 7 9.172 7 10s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-3 3C4.672 11.5 4 12.172 4 13s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
                </svg>
              </div>
              <span className="text-[12px] font-bold tracking-[0.2em] uppercase">
                Xbox Series X
              </span>
            </div>

            <h2 className="text-2xl font-extrabold mb-6 leading-tight">
              Wireless <br /> Controller 3
            </h2>

            <button className="bg-white text-[#10a342] font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors mb-8 text-sm">
              Starting from £89
            </button>
          </div>

          <div className="mt-auto w-full max-w-[220px] z-10 transform hover:scale-110 transition-transform duration-500">
            <img
              src="/manet.png"
              alt="Xbox Controller"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-white/5 rounded-full pointer-events-none"></div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden h-[220px] relative"
            >
              <div className="absolute inset-0 w-full h-full py-6">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-full p-6 z-10 flex flex-col w-3/5 transition-colors duration-300">
                <h3 className="text-lg font-bold text-[#001e2b] mb-3">
                  {cat.title}
                </h3>
                <ul className="space-y-1.5 mb-4">
                  {cat.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-gray-800 text-[12px] font-semibold hover:text-[#004a99] cursor-pointer flex items-center gap-1 group/item drop-shadow-sm"
                    >
                      {item}
                      <BiChevronRight className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </li>
                  ))}
                </ul>
                <a
                  href={cat.link}
                  className="text-[#004a99] text-[10px] font-bold uppercase tracking-wider mt-auto border-b-2 border-transparent hover:border-[#004a99] w-fit pb-0.5 transition-all drop-shadow-sm"
                >
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase;
