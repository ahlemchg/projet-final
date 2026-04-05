import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import {
  BiArrowBack,
  BiRightArrowAlt,
  BiGift,
  BiRefresh,
  BiSolidTruck,
  BiPointer,
} from "react-icons/bi";
import { FaPaypal } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const slides = [
    {
      id: 1,
      title: "Samsung Galaxy Z Flip",
      subtitle: "Subscribe and get 20% off your first purchase.",
      price: "Starting From £699",
      image: "/slid1.jpg",
      bgColor: "bg-[#f8f9fb]",
      btnColor: "bg-[#ffb400]",
      textColor: "text-[#001e2b]",
    },
    {
      id: 2,
      title: "13-inch MacBook Air Touch ID",
      subtitle: "Subscribe and get 20% off your first purchase.",
      price: "Starting From £699",
      image: "/slide2.jpg",
      bgColor: "bg-[#f8f9fb]",
      btnColor: "bg-[#001e2b]",
      textColor: "text-[#001e2b]",
    },
  ];

  const features = [
    {
      id: 1,
      icon: <BiSolidTruck size={28} className="text-[#004a99]" />,
      title: "Fast Delivery",
      subtitle: "Free Shipping For orders over 130",
    },
    {
      id: 2,
      icon: <FaPaypal size={28} className="text-[#004a99]" />,
      title: "Secure Payments",
      subtitle: "256-Bit Protection",
    },
    {
      id: 3,
      icon: <BiGift size={32} className="text-[#004a99]" />,
      title: "Discount Coupons",
      subtitle: "Enjoy Huge Promotions",
    },
    {
      id: 4,
      icon: <BiPointer size={32} className="text-[#004a99]" />,
      title: "Easy 30 Day Return",
      subtitle: "Free returns. No hassle.",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 lg:px-10 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 relative group">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="rounded-xl h-[250px] md:h-[400px] shadow-sm overflow-visible"
              pagination={{
                clickable: true,
                el: ".hero-pagination",
                type: "bullets",
              }}
              navigation={{
                prevEl: ".hero-prev",
                nextEl: ".hero-next",
              }}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div
                    className={`${slide.bgColor} h-full w-full flex items-center relative overflow-hidden px-6 lg:px-12`}
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out brightness-110 contrast-105"
                      />

                      <div className="absolute inset-0 bg-white/5"></div>
                    </div>

                    <div className="z-10 max-w-md transition-all duration-700">
                      <h2
                        className={`text-xl md:text-3xl font-extrabold ${slide.textColor} mb-1 md:mb-2 leading-tight tracking-tight`}
                      >
                        {slide.title}
                      </h2>
                      <p className="text-gray-500 mb-3 md:mb-5 text-xs md:text-base font-medium">
                        {slide.subtitle}
                      </p>
                      <button
                        className={`${slide.btnColor} hover:bg-[#001e2b] ${
                          slide.id === 1 ? "text-[#001e2b]" : "text-white"
                        } hover:text-white px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-bold hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center gap-2 group/btn relative overflow-hidden text-sm md:text-base`}
                      >
                        <span className="relative z-10">{slide.price}</span>
                        <BiRightArrowAlt className="relative z-10 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 text-xl" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="hidden lg:flex absolute bottom-6 left-12 z-20 gap-3">
                <button className="hero-prev w-10 h-10 rounded-full bg-white/90 hover:bg-[#ffb400] transition-all duration-300 flex items-center justify-center text-gray-800 shadow-md hover:shadow-lg">
                  <BiArrowBack size={20} />
                </button>
                <button className="hero-next w-10 h-10 rounded-full bg-white/90 hover:bg-[#ffb400] transition-all duration-300 flex items-center justify-center text-gray-800 shadow-md hover:shadow-lg">
                  <BiRightArrowAlt size={20} />
                </button>
              </div>
            </Swiper>

            <div className="w-full flex justify-center items-center mt-3 lg:hidden">
              <div className="hero-pagination !flex !items-center !justify-center !gap-2 !static"></div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="relative h-[190px] rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img
                src="/home1.jpg"
                alt="AirPods Pro 3"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out brightness-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300"></div>
              <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white">
                <h3 className="text-xl lg:text-2xl font-bold mb-1 drop-shadow-sm">
                  AirPods Pro 3
                </h3>
                <p className="text-[#ffb400] font-bold tracking-[0.2em] uppercase text-[10px] lg:text-xs">
                  ON SALE
                </p>
              </div>
            </div>

            <div className="relative h-[190px] rounded-xl overflow-hidden group cursor-pointer bg-[#f8f9fb] shadow-sm">
              <img
                src="/home2.jpg"
                alt="PS5 Virtual Reality"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out brightness-105"
              />
              <div className="absolute bottom-6 left-6 max-w-[150px]">
                <h3 className="text-xl lg:text-2xl font-bold text-[#001e2b] leading-tight tracking-tight">
                  PS5 Virtual Reality
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-10 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex items-center gap-4 justify-center md:justify-start lg:justify-center relative
              ${
                index !== features.length - 1
                  ? 'lg:after:content-[""] lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-1/2 lg:after:w-[1px] lg:after:bg-gray-200'
                  : ""
              }
            `}
            >
              <div className="flex-shrink-0 bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-[#001e2b] font-extrabold text-sm mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-[11px] font-medium leading-tight">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
