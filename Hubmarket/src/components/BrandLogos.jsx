import React from "react";

const BrandLogos = () => {
  const logos = [
    { id: 1, src: "/logo-1 (7).png", alt: "Ryzen" },
    { id: 2, src: "/logo-2(1).png", alt: "HP" },
    { id: 3, src: "/logo-3 (6).png", alt: "Logitech" },
    { id: 4, src: "/logo-4 (5).png", alt: "Western Digital" },
    { id: 5, src: "/logo-5 (4).png", alt: "Intel" },
    { id: 6, src: "/logo-7 (3).png", alt: "AMD" },
    { id: 7, src: "/logo-8 (2).png", alt: "Microsoft" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-10 py-12 w-full lg:w-5/6">
      <div className="flex items-center justify-between gap-4 md:gap-8 lg:gap-12 overflow-x-auto no-scrollbar pb-4 md:pb-0">
        {logos.map((logo) => (
          <div key={logo.id} className="flex-shrink-0 flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-5 md:h-6 lg:h-7 w-20 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogos;
