import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BiChevronRight,
  BiShoppingBag,
  BiHeart,
  BiCheckCircle,
} from "react-icons/bi";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { publicRequest, userRequest } from "../requestMethods";

const normalizePrice = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace("$", "").trim());
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredThumbIdx, setHoveredThumbIdx] = useState(null);
  const [myRating, setMyRating] = useState(0);
  const [canRate, setCanRate] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get(`products/find/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const initRating = async () => {
      if (!product) return;
      const userId = userInfo?._id;
      if (!userId) {
        setCanRate(false);
        setMyRating(0);
        return;
      }

      const existing = (product.ratings || []).find((r) => r.userId === userId);
      setMyRating(existing?.rating || 0);

      try {
        const res = await userRequest.get(`orders/find/${userId}`);
        const orders = Array.isArray(res.data) ? res.data : [];
        const deliveredHasProduct = orders.some(
          (o) =>
            String(o.status).toLowerCase() === "delivered" &&
            Array.isArray(o.products) &&
            o.products.some((p) => String(p.productId) === String(product._id || product.id)),
        );
        setCanRate(deliveredHasProduct);
      } catch (e) {
        setCanRate(false);
      }
    };
    initRating();
  }, [product, userInfo?._id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product)
    return <div className="text-center py-20">Product not found.</div>;

  const productName = product.title || product.name || "Product";
  const images =
    product.img && product.img.length > 0
      ? product.img
      : [product.image || "/assets/product1-1.jpg"];
  const colors = Array.isArray(product.color) ? product.color : [];
  const brand = typeof product.brand === "string" ? product.brand : "";
  const ratingAvg = Number(product.ratingAvg || 0);
  const ratingCount = Number(product.ratingCount || 0);

  const submitRating = async (rating) => {
    if (!userInfo?._id) return;
    if (!canRate) return;
    setIsSubmittingRating(true);
    try {
      const res = await userRequest.post(`products/${product._id}/rate`, {
        rating,
      });
      setProduct(res.data);
      setMyRating(rating);
    } catch (e) {
      alert(e.response?.data || "Impossible d'envoyer la note.");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-extrabold text-[#001e2b] line-clamp-1">
            {productName}
          </h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-600 truncate max-w-[150px]">
              {productName}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[88px_1fr] gap-4 items-start">
              <div className="hidden sm:flex flex-col gap-3">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    onMouseEnter={() => setHoveredThumbIdx(idx)}
                    onMouseLeave={() => setHoveredThumbIdx(null)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-white ${
                      selectedImage === idx
                        ? "border-[#001e2b] shadow-md"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 aspect-square group">
                  <img
                    src={images[selectedImage]}
                    alt={productName}
                    className="w-full h-full object-contain transition-transform duration-500 p-4"
                  />
                </div>

                {hoveredThumbIdx !== null && (
                  <div className="hidden sm:block absolute top-4 left-4 z-20 w-[260px] h-[260px] bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden">
                    <img
                      src={images[hoveredThumbIdx]}
                      alt="Zoom"
                      className="w-full h-full object-contain p-4 transform scale-[1.35] origin-center"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails row for mobile */}
            {images.length > 1 && (
              <div className="sm:hidden grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-white ${
                      selectedImage === idx
                        ? "border-[#001e2b] shadow-md"
                        : "border-gray-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {product.category ||
                  (product.categories && product.categories[0])}
              </p>
              <h2 className="text-3xl font-extrabold text-[#001e2b] mb-4">
                {productName}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-extrabold text-[#004a99]">
                  ${normalizePrice(product.price).toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${normalizePrice(product.oldPrice).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={!userInfo?._id || !canRate || isSubmittingRating}
                      onClick={() => submitRating(s)}
                      className={`text-xl leading-none transition-colors ${
                        (myRating || Math.round(ratingAvg)) >= s
                          ? "text-amber-400"
                          : "text-gray-200"
                      } ${
                        userInfo?._id && canRate ? "hover:text-amber-400" : "cursor-default"
                      }`}
                      aria-label={`Rate ${s} stars`}
                      title={
                        !userInfo?._id
                          ? "Connectez-vous pour noter"
                          : !canRate
                            ? "Note disponible après livraison"
                            : `Noter ${s}/5`
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="text-[12px] font-bold text-gray-400">
                  {ratingAvg ? `${ratingAvg.toFixed(1)}/5` : "No rating"}{" "}
                  {ratingCount ? `(${ratingCount})` : ""}
                </div>
                {!userInfo?._id && (
                  <div className="text-[11px] font-bold text-gray-400">
                    Connectez-vous pour noter.
                  </div>
                )}
                {userInfo?._id && !canRate && (
                  <div className="text-[11px] font-bold text-gray-400">
                    Vous pourrez noter apres livraison.
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <BiCheckCircle size={20} />
                <span>
                  {product.inStock ? "In Stock" : "Limited Availability"}
                </span>
              </div>
              {(brand || colors.length > 0) && (
                <div className="flex flex-wrap gap-2 text-[12px]">
                  {brand && (
                    <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 font-bold">
                      Brand: {brand}
                    </span>
                  )}
                  {colors.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 font-bold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-500 leading-relaxed">
                {product.description || product.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => addToCart(product)}
                className="w-full sm:flex-1 bg-[#001e2b] text-white px-8 py-4 rounded-xl font-extrabold text-[12px] uppercase tracking-widest hover:bg-[#00354d] transition-all flex items-center justify-center gap-3"
              >
                <BiShoppingBag size={20} />
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className={`w-full sm:w-auto bg-white text-[#001e2b] border-2 px-8 py-4 rounded-xl font-extrabold text-[12px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  isInWishlist(product._id || product.id)
                    ? "border-red-200 text-red-600 bg-red-50"
                    : "border-gray-100 hover:border-[#001e2b]"
                }`}
              >
                <BiHeart size={20} />
                {isInWishlist(product._id || product.id)
                  ? "In wishlist"
                  : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
