import React, { useState, useEffect } from "react";
import { BiX, BiUpload, BiPlusCircle, BiSave } from "react-icons/bi";

const AddProductModal = ({ isOpen, onClose, onAdd, editProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    sale: false,
    description: "",
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        category: editProduct.category || "",
        price: editProduct.price || "",
        oldPrice: editProduct.oldPrice || "",
        image: editProduct.image || "",
        sale: editProduct.sale || false,
        description: editProduct.description || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        oldPrice: "",
        image: "",
        sale: false,
        description: "",
      });
    }
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data size (image):", formData.image.length);
    const success = await onAdd(formData, editProduct?._id);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001e2b]/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-extrabold text-[#001e2b]">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
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

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Product Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Apple iPad Pro"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium appearance-none"
              >
                <option value="">Select Category</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Tablets">Tablets</option>
                <option value="Laptops">Laptops</option>
                <option value="Headphones">Headphones</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Sale Toggle */}
            <div className="flex items-center gap-4 h-full pt-6 md:pt-8">
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
              <span className="text-[11px] font-bold text-[#001e2b] uppercase tracking-widest">
                On Sale
              </span>
            </div>

            {/* Price */}
            <div>
              <label className="block text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Current Price ($)
              </label>
              <input
                required
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="block text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Old Price ($)
              </label>
              <input
                type="text"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#001e2b] uppercase tracking-widest mb-2">
                Image URL
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL here..."
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium pl-12"
                />
                <BiUpload
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4 bg-gray-50 text-gray-400 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] flex items-center justify-center gap-2 bg-[#001e2b] text-white px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#00354d] transition-all shadow-lg shadow-[#001e2b]/20"
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
