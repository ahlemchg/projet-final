import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  BiChevronLeft,
  BiChevronRight,
  BiTransfer,
  BiHeart,
  BiShow,
} from "react-icons/bi";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const ShopElectronics = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filters = ["Best Sellers", "Best Rated", "New Arrivals", "Low Price"];

  return (
    <div className="container mx-auto px-4 md:px-10 py-8 w-full lg:w-5/6">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-6 gap-5">
        <h2 className="text-lg md:text-xl font-bold text-[#041E42] text-center xl:text-left">
          Shop Electronics
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-8">
          <div className="flex items-center gap-3 md:gap-5 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`text-[12px] font-bold whitespace-nowrap transition-colors ${
                  index === 0
                    ? "text-[#001e2b]"
                    : "text-gray-400 hover:text-[#004a99]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex border border-gray-200 rounded-sm overflow-hidden bg-white">
            <button className="shop-prev w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 border-r border-gray-200">
              <BiChevronLeft size={20} />
            </button>
            <button className="shop-next w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300">
              <BiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-sm overflow-hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".shop-prev",
            nextEl: ".shop-next",
          }}
          slidesPerView={1.2}
          spaceBetween={0}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="shop-electronics-swiper"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="border-r border-gray-200 last:border-r-0"
            >
              <div className="group relative p-3 flex flex-col items-center text-center bg-white h-full transition-all duration-300">
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {product.sale && (
                    <span className="bg-[#ef4444] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider">
                      SALE!
                    </span>
                  )}
                  {product.freeShipping && (
                    <span className="bg-[#002b3d] text-white text-[8px] font-bold px-1.5 py-1 rounded-[2px] uppercase tracking-wider shadow-sm">
                      FREE SHIPPING
                    </span>
                  )}
                </div>

                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10 text-gray-300">
                  <button className="hover:text-black transition-colors">
                    <BiTransfer size={14} />
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className={`transition-colors ${isInWishlist(product._id || product.id) ? "text-[#ef4444]" : "hover:text-black"}`}
                  >
                    <BiHeart
                      size={14}
                      className={
                        isInWishlist(product._id || product.id)
                          ? "fill-current"
                          : ""
                      }
                    />
                  </button>
                  <button className="hover:text-black transition-colors">
                    <BiShow size={14} />
                  </button>
                </div>

                <div className="mb-3 h-36 w-full flex items-center justify-center relative mt-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="w-full mt-auto">
                  <p className="text-gray-400 text-[10px] mb-1 font-medium">
                    {product.category}
                  </p>
                  <h3 className="text-[#001e2b] font-bold text-[13px] mb-2 line-clamp-2 min-h-[32px] leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-[12px] font-medium">
                        {product.oldPrice}
                      </span>
                    )}
                    <span
                      className={`${product.oldPrice ? "text-[#ef4444]" : "text-[#001e2b]"} font-bold text-[13px]`}
                    >
                      {product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-1.5 border-[1.5px] border-black rounded-full font-bold text-[12px] text-black hover:bg-[#002739] hover:text-white transition-all duration-300 active:scale-95"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ShopElectronics;
