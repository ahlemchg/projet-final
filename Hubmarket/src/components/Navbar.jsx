import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import {
  BiHeart,
  BiCartAlt,
  BiGridAlt,
  BiDotsHorizontalRounded,
  BiMenu,
  BiX,
  BiChevronDown,
  BiChevronRight,
  BiSolidTruck,
  BiPointer,
} from "react-icons/bi";
import CartDrawer from "./CartDrawer.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isTopCategoriesOpen, setIsTopCategoriesOpen] = useState(false);
  const [isStickyCategoriesOpen, setIsStickyCategoriesOpen] = useState(false);
  const [isHomeTheaterOpen, setIsHomeTheaterOpen] = useState(false);
  const [isComputersOpen, setIsComputersOpen] = useState(false);
  const [isCellPhonesOpen, setIsCellPhonesOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const featuresMenuData = [
    {
      title: "FEATURES",
      items: [
        { name: "Banners" },
        { name: "Newsletter - Social" },
        { name: "Sticky Add to Cart" },
        { name: "Ajax Live Search" },
        { name: "Countdown Timer" },
        { name: "Carousel" },
        { name: "Popup Banners" },
        { name: "Offcanvas Cart", badge: "Hot", badgeColor: "bg-[#2ecc71]" },
        { name: "Quickview" },
        { name: "Compare" },
      ],
    },
    {
      title: "CATEGORY",
      items: [
        { name: "Custom Layout", badge: "New", badgeColor: "bg-[#3498db]" },
        { name: "With Sidebar" },
        { name: "Offcanvas Sidebar" },
        { name: "Default" },
        { name: "Classic Pagination" },
        { name: "Infinite Loading" },
        { name: "Grid Layout" },
        { name: "Masonry Style" },
        { name: "List View" },
        { name: "Ajax Filter" },
      ],
    },
    {
      title: "PRODUCT TYPES",
      items: [
        { name: "Variable Product" },
        { name: "Simple" },
        { name: "Affiliate Product" },
        { name: "Digital Product" },
        { name: "On Sale" },
        { name: "Out of Stock" },
        { name: "Grouped Product" },
      ],
    },
    {
      title: "PRODUCT STYLES",
      items: [
        { name: "Modern" },
        { name: "Default" },
        { name: "Sticky Images", badge: "New", badgeColor: "bg-[#3498db]" },
        { name: "Custom Product Layout" },
        { name: "Video Product" },
        { name: "w/ Page Builder" },
        { name: "Header Note" },
      ],
    },
    {
      title: "PRODUCT HOVER",
      items: [
        { name: "Shadow" },
        { name: "Minimal" },
        { name: "Gallery", badge: "Exclusive", badgeColor: "bg-[#e74c3c]" },
        { name: "Secondary Image" },
        { name: "Default" },
      ],
    },
    {
      title: "SHOP PAGES",
      items: [
        { name: "Cart" },
        { name: "Checkout" },
        { name: "Wishlist" },
        { name: "Login - Register" },
        { name: "Search Results" },
        { name: "Help Center" },
        { name: "Catalogue Mode" },
      ],
    },
    {
      title: "OTHER SHOP DEMOS",
      items: [
        { name: "Modern Shop" },
        { name: "Retail Shop" },
        { name: "Fashion Store" },
        { name: "Product Shop" },
      ],
    },
  ];

  const computerCategories = [
    {
      title: "SMARTPHONES",
      items: [
        "iPhone 11 Pro",
        "Google Pixel",
        "Samsung Galaxy",
        "Sony Xperia Series",
      ],
      image: "/product_11.jpg",
    },
    {
      title: "TABLETS",
      items: [
        "Apple iPad Pro",
        "Android Samsung",
        "Google",
        "Microsoft X Series",
      ],
      image: "/IPAD-CLAVIER.jpg",
    },
    {
      title: "COMPUTERS",
      items: [
        "Apple Macbook",
        "Lenovo IdeaPad",
        "Computer Tablets",
        "Google Chromebook",
      ],
      image: "/product_1.jpg",
    },
    {
      title: "HEADPHONES",
      items: [
        "In-Ear Headphones",
        "Apple AirPods Pro",
        "Samsung Earbuds",
        "Google Wireless",
      ],
      image: "/airpods.jpg",
    },
  ];

  const cellPhonesCategories = [
    {
      title: "Smartphones",
      items: ["iPhone 11 Pro", "Google Android", "Samsung Galaxy"],
      shopLink: "Shop Smartphones",
    },
    {
      title: "Headphones",
      items: ["In-Ear Headphones", "Apple AirPods Pro", "Samsung Earbuds"],
      shopLink: "Shop Smartphones",
    },
    {
      title: "Computers",
      items: ["Apple Macbook", "Lenovo IdeaPad", "Computer Tablets"],
      shopLink: "Shop Smartphones",
    },
  ];

  const productTypes = [
    "Variable Product",
    "Simple",
    "Affiliate Product",
    "Digital Product",
    "On Sale",
    "Sold Out",
    "Grouped Product",
  ];

  const newArrivals = [
    {
      name: 'Samsung 65" QLED 4K Smart TV',
      price: "$899.99",
      image: "/product_1.jpg",
    },
    {
      name: "Sony 5.1 Ch Soundbar",
      price: "$299.99",
      image: "/product_4.jpg",
    },
    {
      name: "Epson Home Cinema Projector",
      price: "$549.99",
      image: "/product_10.jpg",
    },
    {
      name: "Logitech Harmony Elite Remote",
      price: "$199.99",
      image: "/product_3.jpg",
    },
    {
      name: "Apple TV 4K 64GB",
      price: "$179.99",
      image: "/product_11.jpg",
    },
    {
      name: "Bose QuietComfort 45",
      price: "$329.99",
      image: "/product_12.jpg",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Computers", hasSubmenu: true, path: "/computers" },
    { name: "Cell Phones", hasSubmenu: true, path: "/cell-phones" },
    { name: "Entertainment", hasSubmenu: true },
    { name: "Home Teather", hasSubmenu: true, path: "/home-theater" },
    { name: "Audio & Headphones", hasSubmenu: false },
    { name: "Car Electronics", hasSubmenu: false },
    { name: "Video Games & Console", hasSubmenu: true },
    { name: "Software & Gift Cards", hasSubmenu: false },
  ];

  return (
    <nav className="bg-[#002b3d] text-white relative">
      {/* Desktop Top Row */}
      <div className="hidden lg:flex container mx-auto px-10 py-2 items-center justify-between gap-6 relative">
        <Link
          to="/"
          className="flex items-center gap-2 text-base font-bold flex-shrink-0 "
        >
          <div className="relative w-4 h-2.5 ">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-400 rounded-full opacity-70"></div>
          </div>
          <span>Hubmarket</span>
        </Link>

        <div className="flex items-center gap-4 text-[11px] font-medium whitespace-nowrap">
          <div
            className="relative group py-4"
            onMouseEnter={() => setIsTopCategoriesOpen(true)}
            onMouseLeave={() => setIsTopCategoriesOpen(false)}
          >
            <div className="flex items-center border-l border-white/10 px-3 text-white cursor-pointer hover:text-amber-400 transition-colors">
              <span>All Categories</span>
              <BiChevronDown className="w-3 h-3 ml-1" />
            </div>

            {/* Top Row Categories Dropdown */}
            <div
              className={`absolute top-full left-0 w-[220px] bg-white text-gray-800 shadow-xl border border-gray-100 py-2 z-[110] transition-all duration-300 transform origin-top ${
                isTopCategoriesOpen
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-0 pointer-events-none"
              }`}
            >
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={category.path || "#"}
                  className="flex items-center justify-between px-5 py-1.5 hover:bg-gray-50 cursor-pointer group/item border-b border-gray-50 last:border-0"
                >
                  <span className="text-[11px] font-medium text-gray-700 group-hover/item:text-[#004a99] transition-colors">
                    {category.name}
                  </span>
                  {category.hasSubmenu && (
                    <BiChevronRight
                      size={12}
                      className="text-gray-400 group-hover/item:translate-x-1 transition-transform"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center cursor-pointer hover:text-amber-400 transition-colors">
            <span>English / USD</span>
            <BiChevronDown className="w-3 h-3 ml-1" />
          </div>
          <Link
            to="/wishlist"
            className="flex items-center gap-1 cursor-pointer hover:text-amber-400 transition-colors group relative"
          >
            <BiHeart size={16} />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ffb400] text-[#001e2b] text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="cursor-pointer hover:text-amber-400 transition-colors"
          >
            My account
          </Link>
          <div className="cursor-pointer hover:text-amber-400 transition-colors">
            Customer Service
          </div>
          <div className="cursor-pointer hover:text-amber-400 transition-colors">
            <BiDotsHorizontalRounded size={16} />
          </div>
        </div>
      </div>

      {/* Desktop Sticky/Category Row */}
      {isSticky && <div className="hidden lg:block h-[42px]"></div>}

      <div
        className={`hidden lg:block w-full bg-[#002b3d] border-t border-white/10 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 z-[100] shadow-xl py-0.5 animate-fadeIn"
            : ""
        }`}
      >
        <div className="container mx-auto px-10 py-1.5 flex items-center justify-between relative">
          <div className="flex items-center gap-6">
            {/* Sticky Logo */}
            {isSticky && (
              <Link
                to="/"
                className="flex items-center gap-2 text-base font-bold mr-4 animate-fadeIn"
              >
                <div className="relative w-4 h-2.5">
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full opacity-70"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-400 rounded-full opacity-70"></div>
                </div>
                <span className="text-base">Hubmarket</span>
              </Link>
            )}

            <div
              className="relative group py-1.5"
              onMouseEnter={() => setIsStickyCategoriesOpen(true)}
              onMouseLeave={() => setIsStickyCategoriesOpen(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer hover:text-amber-400 transition-colors font-semibold border-r border-white/20 pr-6 text-[13px]">
                <BiGridAlt size={16} />
                <span>All Categories</span>
                <BiChevronDown className="w-3.5 h-3.5 ml-1" />
              </div>

              {/* Desktop Categories Dropdown */}
              <div
                className={`absolute top-full left-0 w-[260px] bg-white text-gray-800 shadow-xl border border-gray-100 py-2 z-[110] transition-all duration-300 transform origin-top ${
                  isStickyCategoriesOpen
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0 pointer-events-none"
                }`}
              >
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path || "#"}
                    className="flex items-center justify-between px-6 py-2.5 hover:bg-gray-50 cursor-pointer group/item border-b border-gray-50 last:border-0"
                  >
                    <span className="text-[13px] font-medium text-gray-700 group-hover/item:text-[#004a99] transition-colors">
                      {category.name}
                    </span>
                    {category.hasSubmenu && (
                      <BiChevronRight
                        size={16}
                        className="text-gray-400 group-hover/item:translate-x-1 transition-transform"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-[12px] font-medium">
              <div
                className="py-4 group"
                onMouseEnter={() => setIsHomeTheaterOpen(true)}
                onMouseLeave={() => setIsHomeTheaterOpen(false)}
              >
                <Link
                  to="/home-theater"
                  className="hover:text-amber-400 transition-colors"
                >
                  Home Theater
                </Link>

                {/* Mega Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[750px] bg-white text-gray-800 shadow-2xl border border-gray-100 z-[120] transition-all duration-300 transform origin-top flex pointer-events-auto ${
                    isHomeTheaterOpen
                      ? "opacity-100 scale-y-100 -translate-x-1/2"
                      : "opacity-0 scale-y-0 -translate-x-1/2 pointer-events-none"
                  }`}
                >
                  {/* Left Section: Sub-categories Grid */}
                  <div className="flex-grow p-7 grid grid-cols-2 gap-x-10 gap-y-8 border-r border-gray-100">
                    <div>
                      <h3 className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#001e2b] mb-4">
                        TELEVISIONS
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          "QLED TVs",
                          "OLED TVs",
                          "4K UHD TVs",
                          "Smart TVs",
                          "8K TVs",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[12px] text-gray-500 hover:text-[#004a99] cursor-pointer transition-colors"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#001e2b] mb-4">
                        AUDIO SYSTEMS
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          "Soundbars",
                          "Home Theater Systems",
                          "Receivers",
                          "Speakers",
                          "Subwoofers",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[12px] text-gray-500 hover:text-[#004a99] cursor-pointer transition-colors"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#001e2b] mb-4">
                        PROJECTORS
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          "4K Projectors",
                          "Mini Projectors",
                          "Projector Screens",
                          "Accessories",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[12px] text-gray-500 hover:text-[#004a99] cursor-pointer transition-colors"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#001e2b] mb-4">
                        ACCESSORIES
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          "HDMI Cables",
                          "Wall Mounts",
                          "Remote Controls",
                          "Streaming Devices",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="text-[12px] text-gray-500 hover:text-[#004a99] cursor-pointer transition-colors"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Section: NEW ARRIVALS */}
                  <div className="w-[240px] p-6 bg-white">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#001e2b] mb-6">
                      NEW ARRIVALS
                    </h3>

                    <div className="relative h-[220px]">
                      <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                          prevEl: ".mega-prev",
                          nextEl: ".mega-next",
                        }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        slidesPerView={3}
                        direction="vertical"
                        spaceBetween={15}
                        className="h-full"
                      >
                        {newArrivals.map((product, idx) => (
                          <SwiperSlide key={idx}>
                            <div className="flex gap-3 group/prod cursor-pointer">
                              <div className="w-12 h-12 bg-gray-50 rounded-sm p-1 flex-shrink-0">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-contain group-hover/prod:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="text-[12px] font-bold text-[#001e2b] mb-0.5 line-clamp-2 leading-tight group-hover/prod:text-[#004a99] transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-[11px] font-medium text-gray-500">
                                  {product.price}
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2 mt-4">
                      <button className="mega-prev w-7 h-7 rounded-sm bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
                        <BiChevronRight className="rotate-180" size={18} />
                      </button>
                      <button className="mega-next w-7 h-7 rounded-sm bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
                        <BiChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="py-4 group"
                onMouseEnter={() => setIsComputersOpen(true)}
                onMouseLeave={() => setIsComputersOpen(false)}
              >
                <Link
                  to="/computers"
                  className="hover:text-amber-400 transition-colors gap-2 flex items-center"
                >
                  Computers
                  <span className="bg-gray-700 text-[9px] px-1.5 py-0.5 rounded-full uppercase">
                    Sale
                  </span>
                </Link>

                {/* Computers Mega Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white text-gray-800 shadow-2xl border border-gray-100 z-[120] transition-all duration-300 transform origin-top p-6 pointer-events-auto ${
                    isComputersOpen
                      ? "opacity-100 scale-y-100 -translate-x-1/2"
                      : "opacity-0 scale-y-0 -translate-x-1/2 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {computerCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-50 rounded-sm p-4 flex justify-between items-start group/cat hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col h-full">
                          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#001e2b] mb-3">
                            {cat.title}
                          </h3>
                          <ul className="flex flex-col gap-1.5 mb-3">
                            {cat.items.map((item, i) => (
                              <li
                                key={i}
                                className="text-[12px] text-gray-600 hover:text-[#004a99] cursor-pointer transition-colors flex items-center gap-1 group/item"
                              >
                                {item}
                                <BiChevronRight
                                  size={12}
                                  className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                                />
                              </li>
                            ))}
                          </ul>
                          <a
                            href="#"
                            className="text-[#004a99] text-[10px] font-bold underline mt-auto"
                          >
                            View More
                          </a>
                        </div>
                        <div className="w-32 h-32 flex-shrink-0">
                          <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="py-4 group"
                onMouseEnter={() => setIsCellPhonesOpen(true)}
                onMouseLeave={() => setIsCellPhonesOpen(false)}
              >
                <Link
                  to="/cell-phones"
                  className="hover:text-amber-400 transition-colors"
                >
                  Cell Phones
                </Link>

                {/* Cell Phones Mega Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white text-gray-800 shadow-2xl border border-gray-100 z-[120] transition-all duration-300 transform origin-top flex flex-col pointer-events-auto ${
                    isCellPhonesOpen
                      ? "opacity-100 scale-y-100 -translate-x-1/2"
                      : "opacity-0 scale-y-0 -translate-x-1/2 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-0">
                    {/* Top 4 Quadrants */}
                    {cellPhonesCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="p-6 border-r border-b border-gray-50 last:border-r-0"
                      >
                        <h3 className="text-[13px] font-bold text-[#001e2b] mb-4">
                          {cat.title}
                        </h3>
                        <ul className="flex flex-col gap-2 mb-4">
                          {cat.items.map((item, i) => (
                            <li
                              key={i}
                              className="text-[12px] text-gray-600 hover:text-[#004a99] cursor-pointer transition-colors flex items-center gap-1 group/item"
                            >
                              {item}
                              <BiChevronRight
                                size={12}
                                className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                              />
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#"
                          className="text-[#004a99] text-[11px] font-bold hover:underline"
                        >
                          {cat.shopLink}
                        </a>
                      </div>
                    ))}

                    {/* Image Quadrant */}
                    <div className="p-6 border-b border-gray-50 flex flex-col items-center justify-center text-center">
                      <div className="w-32 h-32 mb-3">
                        <img
                          src="/airpods.jpg"
                          alt="Headphones"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <a
                        href="#"
                        className="text-[#004a99] text-[11px] font-bold hover:underline"
                      >
                        HeadPhones
                      </a>
                    </div>
                  </div>

                  {/* Bottom Info Boxes */}
                  <div className="flex border-t border-gray-100 bg-gray-50/30">
                    <div className="flex-1 p-3 flex items-center justify-center gap-2.5 border-r border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                      <BiSolidTruck size={18} className="text-[#004a99]" />
                      <span className="text-[10px] font-bold text-[#001e2b] uppercase tracking-wide">
                        Free Shipping for orders
                      </span>
                    </div>
                    <div className="flex-1 p-3 flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors cursor-pointer">
                      <BiPointer size={18} className="text-[#004a99]" />
                      <span className="text-[10px] font-bold text-[#001e2b] uppercase tracking-wide">
                        Easy 30 Day Return
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="py-4 group"
                onMouseEnter={() => setIsFeaturesOpen(true)}
                onMouseLeave={() => setIsFeaturesOpen(false)}
              >
                <Link
                  to="/features"
                  className="hover:text-amber-400 transition-colors"
                >
                  Features
                </Link>

                {/* Features Mega Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white text-gray-800 shadow-2xl border border-gray-100 z-[120] transition-all duration-300 transform origin-top flex pointer-events-auto ${
                    isFeaturesOpen
                      ? "opacity-100 scale-y-100 -translate-x-1/2"
                      : "opacity-0 scale-y-0 -translate-x-1/2 pointer-events-none"
                  }`}
                >
                  <div className="w-full flex">
                    {/* Left Section: 4 Columns of Links */}
                    <div className="flex-grow grid grid-cols-4 gap-x-6 gap-y-6 p-7 border-r border-gray-100">
                      {featuresMenuData.slice(0, 4).map((column, idx) => (
                        <div key={idx}>
                          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#001e2b] mb-4">
                            {column.title}
                          </h3>
                          <ul className="flex flex-col gap-2">
                            {column.items.map((item, i) => (
                              <li
                                key={i}
                                className="text-[12px] text-gray-500 hover:text-[#004a99] cursor-pointer transition-colors flex items-center gap-1.5 group/item"
                              >
                                {item.name}
                                {item.badge && (
                                  <span
                                    className={`${item.badgeColor} text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Second Row of Columns */}
                      {featuresMenuData.slice(4).map((column, idx) => (
                        <div key={idx} className="mt-0">
                          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#001e2b] mb-4">
                            {column.title}
                          </h3>
                          <ul className="flex flex-col gap-2">
                            {column.items.map((item, i) => (
                              <li
                                key={i}
                                className="text-[12px] text-gray-500 hover:text-[#004a99] cursor-pointer transition-colors flex items-center gap-1.5"
                              >
                                {item.name}
                                {item.badge && (
                                  <span
                                    className={`${item.badgeColor} text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Right Section: Single Large Promotion Image */}
                    <div className="w-[320px] relative group/promo cursor-pointer overflow-hidden">
                      <img
                        src="/home1.jpg"
                        alt="Promotion"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/promo:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute bottom-8 left-7 right-7 text-white">
                        <p className="text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
                          FREE SHIPPING
                        </p>
                        <h2 className="text-2xl font-extrabold mb-5 leading-tight drop-shadow-md">
                          Apple AirPods <br /> Pro
                        </h2>
                        <button className="bg-[#ffb400] text-[#001e2b] px-6 py-2.5 rounded-lg font-extrabold text-[11px] hover:bg-white transition-all duration-300 uppercase tracking-widest shadow-md">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative cursor-pointer hover:text-amber-400 transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <BiCartAlt size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar Placeholder */}
      {isSticky && <div className="lg:hidden h-[46px]"></div>}

      {/* Mobile Navbar */}
      <div
        className={`lg:hidden flex items-center justify-between px-4 py-2 bg-white text-gray-900 shadow-sm transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 w-full z-[100]" : ""
        }`}
      >
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1">
          {isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </button>

        <Link to="/" className="flex items-center gap-2 text-base font-bold">
          <div className="relative w-4 h-2.5 ">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-400 rounded-full opacity-70"></div>
          </div>
          <span>Hubmarket</span>
        </Link>

        <div className="flex items-center gap-3">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <BiCartAlt size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      <CartDrawer />

      {isMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 bg-white z-[90] overflow-y-auto transition-all duration-300 ease-in-out ${
            isSticky ? "top-[52px]" : "top-[52px]"
          }`}
        >
          <div className="flex flex-col">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-800 font-medium">My account</span>
            </Link>
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path || "#"}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-gray-800 font-medium">
                  {category.name}
                </span>
                {category.hasSubmenu && (
                  <div className="bg-gray-100 p-1 rounded-md">
                    <BiChevronDown size={18} className="text-gray-500" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
