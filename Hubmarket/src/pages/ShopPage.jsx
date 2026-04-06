import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BiChevronRight,
  BiFilterAlt,
  BiX,
  BiHeart,
  BiCartAlt,
} from "react-icons/bi";
import { publicRequest } from "../requestMethods";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const CATEGORIES = [
  "Computers",
  "Cell Phones",
  "Entertainment",
  "Home Teather",
  "Audio & Headphones",
  "Car Electronics",
  "Video Games & Console",
  "Software & Gift Cards",
];

const normalizePrice = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace("$", "").trim());
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ colors: [], brands: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const selectedCategory = searchParams.get("category") || "";
  const selectedColor = searchParams.get("color") || "";
  const selectedBrand = searchParams.get("brand") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await publicRequest.get("products/stats");
        setStats({
          colors: Array.isArray(res.data.colors) ? res.data.colors : [],
          brands: Array.isArray(res.data.brands) ? res.data.brands : [],
        });
      } catch (e) {
        setStats({ colors: [], brands: [] });
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (selectedColor) params.color = selectedColor;
        if (selectedBrand) params.brand = selectedBrand;
        if (maxPrice) params.maxPrice = maxPrice;

        const res = await publicRequest.get("products", { params });
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedColor, selectedBrand, maxPrice]);

  const computedMax = useMemo(() => {
    if (!products.length) return 2000;
    return Math.max(...products.map((p) => normalizePrice(p.price)), 2000);
  }, [products]);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#001e2b]">Shop</h1>
            <p className="text-gray-400 mt-2 text-sm font-medium">
              Tous les produits disponibles.
            </p>
          </div>
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-600">Shop</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="hidden lg:block w-[280px] flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-4">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setParam("category", "")}
                  className={`text-left text-[13px] font-bold px-3 py-2 rounded-lg border ${
                    !selectedCategory
                      ? "bg-[#001e2b] text-white border-[#001e2b]"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setParam("category", cat)}
                    className={`text-left text-[13px] font-bold px-3 py-2 rounded-lg border ${
                      selectedCategory === cat
                        ? "bg-[#001e2b] text-white border-[#001e2b]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#001e2b]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-4">
                Colors
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setParam("color", "")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                    !selectedColor
                      ? "bg-[#001e2b] text-white border-[#001e2b]"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  All
                </button>
                {stats.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setParam("color", c)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                      selectedColor === c
                        ? "bg-[#001e2b] text-white border-[#001e2b]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#001e2b]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-4">
                Price
              </h3>
              <input
                type="range"
                min="0"
                max={computedMax}
                value={maxPrice || computedMax}
                onChange={(e) => setParam("maxPrice", String(e.target.value))}
                className="w-full accent-[#001e2b]"
              />
              <div className="flex items-center justify-between mt-2 text-[12px] font-bold text-gray-400">
                <span>$0</span>
                <span className="text-[#001e2b]">
                  ${maxPrice || computedMax}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-[#001e2b] mb-4">
                Brand
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setParam("brand", "")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                    !selectedBrand
                      ? "bg-[#001e2b] text-white border-[#001e2b]"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  All
                </button>
                {stats.brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setParam("brand", b)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                      selectedBrand.toLowerCase() === b.toLowerCase()
                        ? "bg-[#001e2b] text-white border-[#001e2b]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#001e2b]"
                    }`}
                  >
                    {b}
                  </button>
                ))}
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

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin mb-4"></div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Loading products...
                </p>
              </div>
            ) : products.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl transition-all"
                  >
                    <Link to={`/product/${product._id || product.id}`}>
                      <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
                        <img
                          src={product.image || (product.img && product.img[0])}
                          alt={product.name || product.title}
                          className="w-full h-full object-contain p-3 hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-[14px] font-extrabold text-[#001e2b] mb-2 line-clamp-2 min-h-[40px]">
                        {product.name || product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-extrabold text-[#001e2b]">
                        ${normalizePrice(product.price).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToWishlist(product)}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center ${
                            isInWishlist(product._id || product.id)
                              ? "border-red-200 text-red-500 bg-red-50"
                              : "border-gray-200 text-gray-500 hover:border-[#001e2b] hover:text-[#001e2b]"
                          }`}
                        >
                          <BiHeart size={18} />
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-9 h-9 rounded-full bg-[#001e2b] text-white flex items-center justify-center hover:bg-[#00354d]"
                        >
                          <BiCartAlt size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold mb-4">
                  Aucun produit ne correspond a vos filtres.
                </p>
                <button
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="text-[#001e2b] font-extrabold underline"
                >
                  Reinitialiser les filtres
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <div
        onClick={() => setIsMobileFilterOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/40 z-[120] transition-opacity ${
          isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
              <button
                onClick={() => setParam("category", "")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  !selectedCategory
                    ? "bg-[#001e2b] text-white border-[#001e2b]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setParam("category", cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                    selectedCategory === cat
                      ? "bg-[#001e2b] text-white border-[#001e2b]"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-extrabold text-[#001e2b] mb-3 uppercase">
              Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setParam("color", "")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  !selectedColor
                    ? "bg-[#001e2b] text-white border-[#001e2b]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                All
              </button>
              {stats.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setParam("color", c)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                    selectedColor === c
                      ? "bg-[#001e2b] text-white border-[#001e2b]"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-extrabold text-[#001e2b] mb-3 uppercase">
              Price
            </h4>
            <input
              type="range"
              min="0"
              max={computedMax}
              value={maxPrice || computedMax}
              onChange={(e) => setParam("maxPrice", String(e.target.value))}
              className="w-full accent-[#001e2b]"
            />
            <p className="text-[12px] text-gray-500 mt-2">
              $0 - ${maxPrice || computedMax}
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-extrabold text-[#001e2b] mb-3 uppercase">
              Brand
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setParam("brand", "")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  !selectedBrand
                    ? "bg-[#001e2b] text-white border-[#001e2b]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                All
              </button>
              {stats.brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setParam("brand", b)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                    selectedBrand.toLowerCase() === b.toLowerCase()
                      ? "bg-[#001e2b] text-white border-[#001e2b]"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {b}
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
  );
};

export default ShopPage;
