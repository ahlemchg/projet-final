import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { publicRequest } from "../requestMethods";

import {
  BiChevronRight,
  BiGridAlt,
  BiListUl,
  BiChevronDown,
  BiTransfer,
  BiHeart,
  BiShow,
  BiChevronLeft,
  BiFilterAlt,
  BiX,
} from "react-icons/bi";

const CellPhones = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get("products?category=Cell Phones");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [priceRange, setPriceRange] = useState(1500);
  const [selectedCategory, setSelectedCategory] = useState("Cell Phones");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { name: "Cell Phones", count: 12, active: true },
    {
      name: "Computers",
      count: 8,
      sub: [
        { name: "Home Theater", count: 6 },
        { name: "Hoodies", count: 2 },
      ],
    },
    { name: "Entertainment", count: 5 },
    { name: "Uncategorized", count: 0 },
  ];

  const brands = [
    "All Brands",
    "Apple",
    "Samsung",
    "Google",
    "Sony",
    "OnePlus",
    "Xiaomi",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Handle MongoDB price (string like "$10.00") or number
      const price =
        typeof product.price === "string"
          ? parseFloat(product.price.replace("$", ""))
          : product.price;

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = price <= priceRange;
      const matchesColor = !selectedColor || product.color === selectedColor;
      const matchesBrand =
        selectedBrand === "All Brands" || product.brand === selectedBrand;
      return matchesCategory && matchesPrice && matchesColor && matchesBrand;
    });
  }, [products, selectedCategory, priceRange, selectedColor, selectedBrand]);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#001e2b]">
              Cell Phones
            </h1>
            <p className="text-gray-400 mt-2 text-sm font-medium">
              The world in your hands.
            </p>
          </div>
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <a href="/" className="hover:text-[#001e2b]">
              Home
            </a>
            <BiChevronRight />
            <a href="#" className="hover:text-[#001e2b]">
              Products
            </a>
            <BiChevronRight />
            <span className="text-gray-600">Cell Phones</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="hidden lg:block w-full lg:w-[280px] flex-shrink-0 space-y-10">
            <div>
              <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-6 pb-2 border-b-2 border-gray-100 w-fit">
                Product Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((cat, idx) => (
                  <li key={idx} className="group">
                    <div
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex items-center justify-between text-[14px] font-bold cursor-pointer transition-colors ${selectedCategory === cat.name ? "text-[#001e2b]" : "text-gray-600 group-hover:text-[#001e2b]"}`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${selectedCategory === cat.name ? "bg-[#001e2b] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-[#001e2b] group-hover:text-white"}`}
                      >
                        {cat.count}
                      </span>
                    </div>
                    {cat.sub && (
                      <ul className="ml-4 mt-3 space-y-3">
                        {cat.sub.map((sub, sIdx) => (
                          <li
                            key={sIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategory(sub.name);
                            }}
                            className="flex items-center justify-between text-[13px] font-bold text-gray-500 hover:text-[#001e2b] cursor-pointer transition-colors"
                          >
                            <span
                              className={
                                selectedCategory === sub.name
                                  ? "text-[#001e2b]"
                                  : ""
                              }
                            >
                              {sub.name}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === sub.name ? "bg-[#001e2b] text-white" : "bg-gray-100 text-gray-400"}`}
                            >
                              {sub.count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li
                  onClick={() => setSelectedCategory("All")}
                  className={`text-[14px] font-bold cursor-pointer transition-colors pt-2 border-t border-gray-50 ${selectedCategory === "All" ? "text-[#001e2b]" : "text-gray-400 hover:text-[#001e2b]"}`}
                >
                  Show All Products
                </li>
              </ul>
            </div>

            {/* Filter by Colors */}
            <div>
              <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-6 pb-2 border-b-2 border-gray-100 w-fit">
                Filter by Colors
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setSelectedColor(selectedColor === "black" ? null : "black")
                  }
                  className={`w-6 h-6 rounded-full bg-black border-2 transition-all ${selectedColor === "black" ? "border-amber-400 scale-110" : "border-transparent hover:border-gray-300"}`}
                  title="Black"
                ></button>
                <button
                  onClick={() =>
                    setSelectedColor(selectedColor === "white" ? null : "white")
                  }
                  className={`w-6 h-6 rounded-full bg-gray-100 border-2 transition-all ${selectedColor === "white" ? "border-amber-400 scale-110" : "border-transparent hover:border-gray-300"}`}
                  title="White"
                ></button>
                <button
                  onClick={() =>
                    setSelectedColor(selectedColor === "blue" ? null : "blue")
                  }
                  className={`w-6 h-6 rounded-full bg-blue-600 border-2 transition-all ${selectedColor === "blue" ? "border-amber-400 scale-110" : "border-transparent hover:border-gray-300"}`}
                  title="Blue"
                ></button>
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-6 pb-2 border-b-2 border-gray-100 w-fit">
                Price
              </h3>
              <div className="space-y-4">
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#001e2b]"
                  />
                </div>
                <div className="flex items-center justify-between text-[12px] font-bold">
                  <span className="text-gray-400">
                    Price:{" "}
                    <span className="text-[#001e2b]">$0 — ${priceRange}</span>
                  </span>
                  <button
                    onClick={() => setPriceRange(2000)}
                    className="uppercase tracking-widest text-[#001e2b] hover:text-[#004a99] text-[10px]"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-6 pb-2 border-b-2 border-gray-100 w-fit">
                Filter by Brand
              </h3>
              <div className="relative">
                <div
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 flex items-center justify-between cursor-pointer hover:border-[#001e2b] transition-colors"
                >
                  <span>{selectedBrand}</span>
                  <BiChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isBrandOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isBrandOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-xl rounded-md mt-1 z-50 py-2 animate-fadeIn">
                    {brands.map((brand, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedBrand(brand);
                          setIsBrandOpen(false);
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${selectedBrand === brand ? "text-[#001e2b] font-bold bg-gray-50" : "text-gray-600"}`}
                      >
                        {brand}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-6 pb-2 border-b-2 border-gray-100 w-fit">
                New Arrivals
              </h3>

              <div className="relative group/sidebar-swiper">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation={{
                    prevEl: ".sidebar-prev",
                    nextEl: ".sidebar-next",
                  }}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  slidesPerView={1}
                  className="w-full"
                >
                  {[0, 1].map((slideIdx) => (
                    <SwiperSlide key={slideIdx}>
                      <div className="space-y-6">
                        {products
                          .slice(slideIdx * 3, (slideIdx + 1) * 3)
                          .map((item, i) => (
                            <Link
                              key={i}
                              to={`/product/${item._id || item.id}`}
                              className="flex gap-4 group cursor-pointer"
                            >
                              <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                                />
                              </div>
                              <div>
                                <h4 className="text-[13px] font-bold text-[#001e2b] group-hover:text-[#004a99] transition-colors leading-tight mb-1 line-clamp-2">
                                  {item.name}
                                </h4>
                                <p className="text-[12px] font-bold text-gray-400">
                                  {typeof item.price === "number"
                                    ? `$${item.price.toFixed(2)}`
                                    : item.price}
                                </p>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex gap-2 pt-6">
                  <button className="sidebar-prev w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#001e2b] hover:text-white transition-all cursor-pointer">
                    <BiChevronLeft size={20} />
                  </button>
                  <button className="sidebar-next w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#001e2b] hover:text-white transition-all cursor-pointer">
                    <BiChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-grow">
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="inline-flex items-center gap-2 bg-[#001e2b] text-white px-4 py-2 rounded-lg font-bold text-[12px]"
              >
                <BiFilterAlt size={18} />
                Filtres
              </button>
            </div>
            <div className="relative w-full h-[200px] md:h-[300px] rounded-2xl overflow-hidden mb-8 md:mb-12 group">
              <img
                src="/home2.jpg"
                alt="Cell Phones Banner"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-y-0 left-8 md:left-16 flex flex-col justify-center text-white">
                <p className="text-[8px] md:text-[10px] font-extrabold tracking-[0.2em] uppercase mb-2 md:mb-4 text-white/80">
                  New Generation
                </p>
                <h2 className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-8 leading-tight">
                  Discover the New <br /> Smartphone Era.
                </h2>
                <button className="bg-white text-[#001e2b] px-6 md:px-10 py-2.5 md:py-3.5 rounded-full font-extrabold text-[10px] md:text-[12px] uppercase tracking-widest hover:bg-[#ffb400] transition-all w-fit shadow-xl">
                  Shop Now
                </button>
              </div>

              <button className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#001e2b] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                <BiChevronLeft size={24} />
              </button>
              <button className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#001e2b] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                <BiChevronRight size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400 border-r border-gray-200 pr-4">
                  <BiGridAlt
                    size={20}
                    className="text-[#001e2b] cursor-pointer"
                  />
                  <BiListUl
                    size={22}
                    className="cursor-pointer hover:text-[#001e2b]"
                  />
                </div>
                <div className="text-[13px] font-bold text-gray-400">
                  Show:{" "}
                  <span className="text-gray-300 ml-2">9 - 12 - 18 - 24</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-[13px] font-bold text-gray-400">
                  Showing all {filteredProducts.length} results
                </div>
                <div className="flex items-center gap-2 text-[13px] font-extrabold text-[#001e2b] cursor-pointer">
                  Default Order
                  <BiChevronDown size={18} />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin mb-4"></div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Loading products...
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="group relative bg-white border border-gray-100 rounded-lg p-6 hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Badges */}
                    {product.sale && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#ff3b30] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Sale!
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-[#001e2b] hover:bg-[#ffb400] transition-all">
                        <BiTransfer size={18} />
                      </button>
                      <button
                        onClick={() => addToWishlist(product)}
                        className={`w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all ${isInWishlist(product._id || product.id) ? "text-[#ff3b30] bg-red-50" : "text-gray-400 hover:text-[#001e2b] hover:bg-[#ffb400]"}`}
                      >
                        <BiHeart
                          size={18}
                          className={
                            isInWishlist(product._id || product.id)
                              ? "fill-current"
                              : ""
                          }
                        />
                      </button>
                      <Link
                        to={`/product/${product._id || product.id}`}
                        className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-[#001e2b] hover:bg-[#ffb400] transition-all"
                      >
                        <BiShow size={18} />
                      </Link>
                    </div>

                    <Link to={`/product/${product._id || product.id}`}>
                      <div className="aspect-square mb-6 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      <div className="text-center">
                        <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                          {product.category}
                        </p>
                        <h3 className="text-[14px] font-extrabold text-[#001e2b] mb-2 hover:text-[#004a99] transition-colors cursor-pointer line-clamp-2 min-h-[40px]">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-6">
                          {product.oldPrice && (
                            <span className="text-[13px] font-bold text-gray-300 line-through">
                              {typeof product.oldPrice === "number"
                                ? `$${product.oldPrice.toFixed(2)}`
                                : product.oldPrice}
                            </span>
                          )}
                          <span
                            className={`text-[14px] font-extrabold ${product.oldPrice ? "text-[#ff3b30]" : "text-[#001e2b]"}`}
                          >
                            {typeof product.price === "number"
                              ? `$${product.price.toFixed(2)}`
                              : product.price}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="px-6 pb-6">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full border-2 border-[#001e2b] text-[#001e2b] hover:bg-[#001e2b] hover:text-white py-2.5 rounded-full font-extrabold text-[13px] transition-all"
                      >
                        {product.hasOptions ? "Select options" : "Add to cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold mb-4">
                  No products match your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedColor(null);
                    setSelectedBrand("All Brands");
                    setPriceRange(2000);
                  }}
                  className="text-[#001e2b] font-extrabold underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>

          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className={`lg:hidden fixed inset-0 bg-black/40 z-[120] transition-opacity ${
              isMobileFilterOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          />
          <aside
            className={`lg:hidden fixed top-0 right-0 h-full w-[88%] max-w-sm bg-white z-[130] shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
              isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-extrabold text-[#001e2b]">Filtres</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <BiX size={22} />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <h4 className="text-[12px] font-extrabold text-[#001e2b] mb-3 uppercase">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                        selectedCategory === cat.name
                          ? "bg-[#001e2b] text-white border-[#001e2b]"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[12px] font-extrabold text-[#001e2b] mb-3 uppercase">
                  Prix
                </h4>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-[#001e2b]"
                />
                <p className="text-[12px] text-gray-500 mt-2">
                  $0 - ${priceRange}
                </p>
              </div>
              <div>
                <h4 className="text-[12px] font-extrabold text-[#001e2b] mb-3 uppercase">
                  Marque
                </h4>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                        selectedBrand === brand
                          ? "bg-[#001e2b] text-white border-[#001e2b]"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#001e2b] text-white py-2.5 rounded-lg font-bold text-[12px]"
              >
                Appliquer
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CellPhones;
