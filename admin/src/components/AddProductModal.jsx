import React, { useState, useEffect } from "react";
import {
  BiX,
  BiUpload,
  BiPlusCircle,
  BiSave,
  BiTrash,
  BiPlus,
} from "react-icons/bi";

const AddProductModal = ({ isOpen, onClose, onAdd, editProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    color: [],
    price: "",
    oldPrice: "",
    images: [""], // Changed from image: "" to images: [""]
    sale: false,
    description: "",
    countInStock: 10,
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        category: editProduct.category || "",
        brand: editProduct.brand || "",
        color: Array.isArray(editProduct.color)
          ? editProduct.color
          : editProduct.color
            ? [editProduct.color]
            : [],
        price: editProduct.price || "",
        oldPrice: editProduct.oldPrice || "",
        images:
          editProduct.img && editProduct.img.length > 0
            ? editProduct.img
            : [editProduct.image || ""],
        sale: editProduct.sale || false,
        description: editProduct.description || editProduct.desc || "",
        countInStock: editProduct.countInStock || 0,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        brand: "",
        color: [],
        price: "",
        oldPrice: "",
        images: [""],
        sale: false,
        description: "",
        countInStock: 10,
      });
    }
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter out empty image strings
    const filteredImages = formData.images.filter((img) => img.trim() !== "");
    const dataToSubmit = {
      ...formData,
      img: filteredImages,
      image: filteredImages[0] || "", // Keep 'image' for compatibility
    };
    const success = await onAdd(dataToSubmit, editProduct?._id);
    if (success) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, images: newImages }));
    }
  };

  const toggleColor = (value) => {
    setFormData((prev) => {
      const exists = prev.color.includes(value);
      return { ...prev, color: exists ? prev.color.filter((c) => c !== value) : [...prev.color, value] };
    });
  };

  const colorOptions = [
    "black",
    "white",
    "blue",
    "red",
    "green",
    "yellow",
    "gray",
    "pink",
    "purple",
    "orange",
  ];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-0 sm:p-4 bg-[#001e2b]/40 backdrop-blur-sm">
      <div className="bg-white sm:rounded-[2rem] w-full max-w-2xl h-full sm:h-auto max-h-screen shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col">
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#001e2b]">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              {editProduct
                ? "Update product details"
                : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-[#001e2b]"
          >
            <BiX size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 overflow-y-auto no-scrollbar flex-grow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Product Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Apple iPad Pro"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium appearance-none"
              >
                <option value="">Select Category</option>
                <option value="Computers">Computers</option>
                <option value="Cell Phones">Cell Phones</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Home Teather">Home Teather</option>
                <option value="Audio & Headphones">Audio & Headphones</option>
                <option value="Car Electronics">Car Electronics</option>
                <option value="Video Games & Console">
                  Video Games & Console
                </option>
                <option value="Software & Gift Cards">
                  Software & Gift Cards
                </option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Brand
              </label>
              <input
                required
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Apple, Samsung..."
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Colors */}
            <div className="md:col-span-2">
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleColor(c)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                      formData.color.includes(c)
                        ? "bg-[#001e2b] text-white border-[#001e2b]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#001e2b]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">
                Selected: {formData.color.length ? formData.color.join(", ") : "None"}
              </p>
            </div>

            {/* Sale Toggle */}
            <div className="flex items-center gap-4 h-full pt-2 sm:pt-8">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="sale"
                  checked={formData.sale}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#001e2b]"></div>
              </label>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest">
                On Sale
              </span>
            </div>

            {/* Price */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Current Price ($)
              </label>
              <input
                required
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Old Price ($)
              </label>
              <input
                type="text"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Stock Count */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Stock Count
              </label>
              <input
                required
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Product Description
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the product details..."
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium resize-none"
              ></textarea>
            </div>

            {/* Image URLs */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] sm:text-[11px] font-bold text-[#001e2b] uppercase tracking-widest">
                  Product Images
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#001e2b] uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <BiPlus size={14} /> Add Another
                </button>
              </div>
              <div className="space-y-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        required
                        type="text"
                        value={img}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        placeholder="Paste image URL or path"
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium pl-10 sm:pl-12"
                      />
                      <BiUpload
                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="p-3 sm:p-3.5 text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                      >
                        <BiTrash size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0 pb-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-8 py-3.5 sm:py-4 bg-gray-50 text-gray-400 rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-[2] flex items-center justify-center gap-2 bg-[#001e2b] text-white px-8 py-3.5 sm:py-4 rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-[#00354d] transition-all shadow-lg shadow-[#001e2b]/20"
            >
              {editProduct ? (
                <>
                  <BiSave size={18} /> Update Product
                </>
              ) : (
                <>
                  <BiPlusCircle size={18} /> Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
