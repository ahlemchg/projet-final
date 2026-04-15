import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import {
  BiPackage,
  BiTrash,
  BiEditAlt,
  BiSearch,
  BiFilterAlt,
} from "react-icons/bi";
import AddProductModal from "./AddProductModal.jsx";
import { userRequest } from "../requestMethods";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await userRequest.get("products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrUpdateProduct = async (productData, id) => {
    try {
      let res;
      if (id) {
        res = await userRequest.put(`products/${id}`, productData);
      } else {
        res = await userRequest.post("products", productData);
      }

      if (res.status === 200) {
        alert(
          id ? "Product updated successfully!" : "Product added successfully!",
        );
        fetchProducts();
        return true;
      } else {
        alert("Error: Operation failed");
        return false;
      }
    } catch (err) {
      console.error("Error saving product:", err);
      const errorMsg = err.response?.data?.message || err.response?.data || err.message || "Unknown error";
      alert(`Network error: Could not connect to the server.\n\nDetails: ${errorMsg}`);
      return false;
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await userRequest.patch(`products/${id}/status`);
      if (res.status === 200) {
        fetchProducts();
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await userRequest.delete(`products/${id}`);
        if (res.status === 200) {
          fetchProducts();
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />

      <PageHeader
        title="Products Management"
        breadcrumbs={[{ label: "Products" }]}
        showAddButton={true}
        addButtonText="Add New Product"
        onAddClick={() => {
          setEditProduct(null);
          setIsModalOpen(true);
        }}
        showProfile={false}
      />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <BiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Total:{" "}
              <span className="text-[#001e2b]">
                {filteredProducts.length} / {products.length} Products
              </span>
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
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 border-b border-gray-50">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Product Details
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Category
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Price
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#001e2b] group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                              ID: #
                              {product._id
                                ? product._id.substring(0, 8)
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#001e2b]">
                            {product.price}
                          </span>
                          {product.sale && (
                            <span className="text-[10px] text-gray-400 line-through font-medium">
                              {product.oldPrice}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <button
                          onClick={() => handleToggleStatus(product._id)}
                          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit transition-all ${
                            product.status === "Active"
                              ? "text-emerald-500 bg-emerald-50 hover:bg-emerald-100"
                              : "text-gray-400 bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              product.status === "Active"
                                ? "bg-emerald-500 animate-pulse"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          {product.status}
                        </button>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditProduct(product);
                              setIsModalOpen(true);
                            }}
                            className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <BiEditAlt size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <BiTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="p-5 bg-white rounded-full shadow-sm text-gray-400 mb-4">
              <BiPackage size={40} />
            </div>
            <h3 className="text-lg font-bold text-[#001e2b]">
              No products found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or add a new product.
            </p>
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditProduct(null);
        }}
        onAdd={handleAddOrUpdateProduct}
        editProduct={editProduct}
      />
    </div>
  );
};

export default Products;
