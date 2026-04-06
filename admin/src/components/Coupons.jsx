import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import {
  BiGift,
  BiTrash,
  BiEditAlt,
  BiSearch,
  BiCheckCircle,
  BiXCircle,
  BiLoaderAlt,
  BiX,
  BiCalendar,
} from "react-icons/bi";
import { userRequest } from "../requestMethods";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSending] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    discountType: "percentage",
    expiryDate: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await userRequest.get("coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const res = await userRequest.delete(`coupons/${id}`);
        if (res.status === 200) {
          fetchCoupons();
        }
      } catch (err) {
        console.error("Error deleting coupon:", err);
      }
    }
  };

  const handleSaveCoupon = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      if (editCoupon) {
        await userRequest.put(`coupons/${editCoupon._id}`, formData);
      } else {
        await userRequest.post("coupons", formData);
      }
      setIsModalOpen(false);
      setEditCoupon(null);
      setFormData({
        code: "",
        discount: "",
        discountType: "percentage",
        expiryDate: "",
        isActive: true,
      });
      fetchCoupons();
    } catch (err) {
      console.error("Error saving coupon:", err);
      alert(err.response?.data || "Failed to save coupon.");
    } finally {
      setIsSending(false);
    }
  };

  const openAddModal = () => {
    setEditCoupon(null);
    setFormData({
      code: "",
      discount: "",
      discountType: "percentage",
      expiryDate: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (coupon) => {
    setEditCoupon(coupon);
    setFormData({
      code: coupon.code || coupon.name, // The model might use 'code'
      discount: coupon.discount,
      discountType: coupon.discountType || "percentage",
      expiryDate: coupon.expiryDate
        ? new Date(coupon.expiryDate).toISOString().split("T")[0]
        : "",
      isActive: coupon.isActive,
    });
    setIsModalOpen(true);
  };

  const filteredCoupons = coupons.filter((c) =>
    c.code?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      <PageHeader
        title="Coupon Management"
        breadcrumbs={[{ label: "Coupons" }]}
        showAddButton={true}
        addButtonText="Add New Coupon"
        onAddClick={openAddModal}
      />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        {/* Modal for adding/editing coupon */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-[#001e2b]">
                  {editCoupon ? "Edit Coupon" : "Add New Coupon"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <BiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveCoupon} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="e.g. SUMMER20"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: e.target.value })
                      }
                      placeholder="Value"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Type
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat Amount ($)</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={today}
                        value={formData.expiryDate}
                        onChange={(e) =>
                          setFormData({ ...formData, expiryDate: e.target.value })
                        }
                        className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] focus:ring-2 focus:ring-[#001e2b]/10 transition-all text-sm font-medium [color-scheme:light]"
                        required
                      />
                      <BiCalendar
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#001e2b]"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-5 h-5 rounded-md border-gray-300 text-[#001e2b] focus:ring-[#001e2b]"
                    />
                    <label
                      htmlFor="isActive"
                      className="text-sm font-bold text-gray-700"
                    >
                      Active Coupon
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-6 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all text-[13px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-3 px-6 bg-[#001e2b] text-white rounded-xl font-bold hover:bg-[#002b3d] transition-all text-[13px] flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <BiLoaderAlt className="animate-spin" size={18} />{" "}
                        Saving...
                      </>
                    ) : (
                      <>
                        <BiGift size={18} /> Save Coupon
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <BiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search coupons by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
            />
          </div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Total:{" "}
            <span className="text-[#001e2b]">
              {filteredCoupons.length} Coupons
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin mb-4"></div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Loading coupons...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Coupon Name
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Discount
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCoupons.map((coupon) => (
                  <tr
                    key={coupon._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-bold text-sm">
                          <BiGift size={20} />
                        </div>
                        <span className="text-sm font-bold text-[#001e2b]">
                          {coupon.code}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-blue-600">
                        {coupon.discountType === "percentage"
                          ? `${coupon.discount}%`
                          : `$${coupon.discount}`}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      {new Date(coupon.expiryDate) > new Date() ? (
                        <div className="flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase tracking-widest">
                          <BiCheckCircle size={14} /> Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 font-bold text-[10px] uppercase tracking-widest">
                          <BiXCircle size={14} /> Expired
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(coupon)}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <BiEditAlt size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
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
        )}
      </div>
    </div>
  );
};

export default Coupons;
