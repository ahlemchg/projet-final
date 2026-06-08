import React, { useState, useEffect } from "react";
import { BiX, BiUpload, BiSave, BiTrash, BiPlus } from "react-icons/bi";

const AddProductModal = ({ isOpen, onClose, onAdd, editProduct }) => {
  const [formData, setFormData] = useState({
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
    localFiles: [],
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
        localFiles: [],
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
        localFiles: [],
      });
    }
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredImages = formData.images.filter(
      (img) => img && img.trim() !== "",
    );
    const dataToSubmit = {
      ...formData,
      img: filteredImages,
      image: filteredImages[0] || "",
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      localFiles: [...prev.localFiles, ...files],
    }));
  };

  const removeLocalFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      localFiles: prev.localFiles.filter((_, i) => i !== index),
    }));
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
      return {
        ...prev,
        color: exists
          ? prev.color.filter((c) => c !== value)
          : [...prev.color, value],
      };
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

  const categories = [
    "Computers",
    "Cell Phones",
    "Entertainment",
    "Home Teather",
    "Audio & Headphones",
    "Car Electronics",
    "Video Games & Console",
    "Software & Gift Cards",
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                  placeholder="e.g. iPhone 15 Pro"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                  placeholder="e.g. Apple"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                  placeholder="999.99"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Old Price ($)
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                  placeholder="1099.99"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Stock Count
                </label>
                <input
                  type="number"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  checked={formData.sale}
                  onChange={handleChange}
                  className="w-5 h-5 rounded-lg text-[#001e2b] focus:ring-[#001e2b] border-gray-300 transition-all cursor-pointer"
                />
                <label
                  htmlFor="sale"
                  className="text-sm font-bold text-[#001e2b] cursor-pointer uppercase tracking-widest text-[11px]"
                >
                  On Sale
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      formData.color.includes(color)
                        ? "bg-[#001e2b] text-white border-[#001e2b]"
                        : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Image URLs
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
                >
                  <BiPlus size={16} /> Add URL
                </button>
              </div>
              <div className="space-y-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-grow px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                      placeholder="https://images.unsplash.com/..."
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <BiTrash size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                Upload Local Images
              </label>
              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <BiUpload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500 font-medium">
                      Click to upload or drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>

                {formData.localFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {formData.localFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square bg-gray-100 rounded-xl overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeLocalFile(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <BiX size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium min-h-[120px] resize-none"
                required
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-50 text-gray-500 font-extrabold rounded-2xl hover:bg-gray-100 transition-all text-[12px] tracking-widest"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-[#001e2b] text-white font-extrabold rounded-2xl hover:bg-[#002b3d] transition-all text-[12px] tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#001e2b]/20"
            >
              <BiSave size={18} />
              {editProduct ? "UPDATE" : "SAVE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
