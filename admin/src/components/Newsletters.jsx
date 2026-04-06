import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import {
  BiMailSend,
  BiTrash,
  BiSearch,
  BiEnvelope,
  BiLoaderAlt,
  BiX,
} from "react-icons/bi";
import { userRequest } from "../requestMethods";

const Newsletters = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [newsletterData, setNewsletterData] = useState({
    subject: "",
    content: "",
  });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await userRequest.get("newsletter");
      setSubscribers(res.data);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this subscriber?")) {
      try {
        const res = await userRequest.delete(`newsletter/${id}`);
        if (res.status === 200) {
          fetchSubscribers();
        }
      } catch (err) {
        console.error("Error deleting subscriber:", err);
      }
    }
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterData.subject || !newsletterData.content) {
      alert("Please fill in both subject and content.");
      return;
    }
    setIsSending(true);
    try {
      const res = await userRequest.post("newsletter/send", newsletterData);
      alert(res.data.message || res.data || "Newsletter sent successfully!");
      setIsModalOpen(false);
      setNewsletterData({ subject: "", content: "" });
    } catch (err) {
      console.error("Error sending newsletter:", err);
      alert(
        err.response?.data?.error ||
          "Failed to send newsletter. Check if email is configured.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      <PageHeader
        title="Newsletter Management"
        breadcrumbs={[{ label: "Newsletters" }]}
        showAddButton={true}
        addButtonText="Send Newsletter"
        onAddClick={() => setIsModalOpen(true)}
      />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        {/* Modal for sending newsletter */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-[#001e2b]">
                  Send Newsletter
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <BiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSendNewsletter} className="p-6 space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newsletterData.subject}
                    onChange={(e) =>
                      setNewsletterData({
                        ...newsletterData,
                        subject: e.target.value,
                      })
                    }
                    placeholder="Newsletter Subject"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Content (HTML allowed)
                  </label>
                  <textarea
                    rows="6"
                    value={newsletterData.content}
                    onChange={(e) =>
                      setNewsletterData({
                        ...newsletterData,
                        content: e.target.value,
                      })
                    }
                    placeholder="Write your newsletter content here..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium resize-none"
                    required
                  ></textarea>
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
                    disabled={isSending}
                    className="flex-1 py-3 px-6 bg-[#001e2b] text-white rounded-xl font-bold hover:bg-[#002b3d] transition-all text-[13px] flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <BiLoaderAlt className="animate-spin" size={18} />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        <BiMailSend size={18} /> Send Now
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
              placeholder="Search subscribers by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001e2b]/5 focus:border-[#001e2b] transition-all text-sm font-medium"
            />
          </div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Total:{" "}
            <span className="text-[#001e2b]">
              {filteredSubscribers.length} Subscribers
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin mb-4"></div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Loading subscribers...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Email Address
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Subscribed Date
                  </th>
                  <th className="px-8 py-5 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#001e2b]">
                          <BiEnvelope size={20} />
                        </div>
                        <span className="font-extrabold text-[#001e2b]">
                          {subscriber.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <BiTrash size={20} />
                      </button>
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

export default Newsletters;
