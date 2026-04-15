import React, { useState, useEffect } from "react";
import {
  BiChevronRight,
  BiPlus,
  BiMinus,
  BiSearch,
  BiPackage,
  BiCreditCard,
  BiRefresh,
  BiCheckShield,
  BiWorld,
  BiSupport,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-[#004a99] transition-colors group"
      >
        <h3 className="text-base font-bold text-[#001e2b] group-hover:text-[#004a99]">
          {question}
        </h3>
        <div
          className={`flex-shrink-0 ml-4 p-1.5 rounded-full transition-all duration-300 ${isOpen ? "bg-[#001e2b] text-white rotate-180" : "bg-gray-50 text-gray-400"}`}
        >
          {isOpen ? <BiMinus size={18} /> : <BiPlus size={18} />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-gray-500 leading-relaxed text-[13px]">{answer}</p>
      </div>
    </div>
  );
};

const FaqCategory = ({ category, isActive, onClick }) => {
  const getIcon = (id) => {
    switch (id) {
      case "shipping":
        return <BiPackage size={24} />;
      case "return-policy":
        return <BiRefresh size={24} />;
      case "product-delivery":
        return <BiCheckShield size={24} />;
      default:
        return <BiPackage size={24} />;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left w-full border ${
        isActive
          ? "bg-[#001e2b] text-white border-[#001e2b] shadow-lg shadow-[#001e2b]/20"
          : "bg-white text-gray-600 border-gray-100 hover:border-[#001e2b] hover:bg-gray-50"
      }`}
    >
      <div
        className={`p-3 rounded-xl ${isActive ? "bg-white/10" : "bg-gray-50 text-[#004a99]"}`}
      >
        {getIcon(category.id)}
      </div>
      <div>
        <h4 className="font-extrabold text-sm uppercase tracking-wider">
          {category.title}
        </h4>
        <p
          className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? "text-white/60" : "text-gray-400"}`}
        >
          {category.items.length} questions
        </p>
      </div>
    </button>
  );
};

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await publicRequest.get("faq");
        setFaqs(res.data);
        if (res.data.length > 0) {
          setActiveCategory(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const filteredFaqs = faqs
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#001e2b] text-white pt-8 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFFFFF"
              d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.6,85.6,-0.7C84.3,14.1,78.5,28.3,69.9,40.3C61.4,52.4,50.1,62.3,37.3,69.1C24.5,75.9,10.2,79.6,-4.2,86.8C-18.5,94.1,-37,104.9,-51.4,101.4C-65.7,97.9,-75.8,80.1,-82.1,63.1C-88.4,46.1,-90.9,29.9,-91.6,14.1C-92.3,-1.7,-91.2,-17.1,-85.4,-31.2C-79.6,-45.3,-69.1,-58.1,-55.7,-65.3C-42.3,-72.5,-25.9,-74.1,-10.6,-71.4C4.8,-68.7,20.3,-61.7,33.5,-54.9C46.8,-48.1,57.8,-41.5,65.8,-32.4"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-10 relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-white">Help Center</span>
          </nav>

          <div className="max-w-xl">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Comment pouvons-nous{" "}
              <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-md">
                vous aider ?
              </span>
            </h1>
            <div className="relative group">
              <BiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004a99] transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 rounded-xl border-none focus:ring-4 focus:ring-white/20 shadow-lg text-sm font-medium placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-8 pb-16 relative z-20">
        {isLoading ? (
          <div className="bg-white rounded-[2rem] p-12 flex flex-col items-center justify-center shadow-lg border border-gray-100">
            <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              Chargement...
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Categories */}
            <div className="lg:w-1/4 space-y-3">
              <div className="bg-white p-5 rounded-[1.5rem] shadow-lg border border-gray-100 mb-4">
                <h3 className="text-[11px] font-extrabold text-[#001e2b] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#004a99] rounded-full"></span>
                  Catégories
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {faqs.map((cat) => (
                    <FaqCategory
                      key={cat.id}
                      category={cat}
                      isActive={activeCategory?.id === cat.id}
                      onClick={() => setActiveCategory(cat)}
                    />
                  ))}
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-gradient-to-br from-[#004a99] to-[#001e2b] p-6 rounded-[1.5rem] text-white shadow-lg relative overflow-hidden group">
                <h4 className="text-base font-extrabold mb-1 relative z-10">
                  Des questions ?
                </h4>
                <p className="text-white/70 text-[11px] mb-4 relative z-10 leading-relaxed">
                  Notre équipe est là pour vous aider 24/7.
                </p>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 bg-white text-[#001e2b] px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all relative z-10"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100 min-h-full">
                {searchTerm ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-extrabold text-[#001e2b]">
                        Résultats
                      </h2>
                      <span className="bg-gray-100 text-gray-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                        {filteredFaqs.reduce(
                          (acc, cat) => acc + cat.items.length,
                          0,
                        )}{" "}
                        résultats
                      </span>
                    </div>
                    {filteredFaqs.length > 0 ? (
                      <div className="space-y-6">
                        {filteredFaqs.map((cat) => (
                          <div key={cat.id}>
                            <h3 className="text-[10px] font-bold text-[#004a99] uppercase tracking-widest mb-3 bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                              {cat.title}
                            </h3>
                            <div className="divide-y divide-gray-50">
                              {cat.items.map((item, idx) => (
                                <FaqItem
                                  key={`${cat.id}-${idx}`}
                                  question={item.q}
                                  answer={item.a}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-16 text-center">
                        <BiSearch
                          className="mx-auto mb-3 text-gray-200"
                          size={32}
                        />
                        <h3 className="text-base font-bold text-[#001e2b]">
                          Aucun résultat
                        </h3>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#004a99] shadow-inner">
                          {activeCategory?.id === "shipping" && (
                            <BiPackage size={24} />
                          )}
                          {activeCategory?.id === "return-policy" && (
                            <BiRefresh size={24} />
                          )}
                          {activeCategory?.id === "product-delivery" && (
                            <BiCheckShield size={24} />
                          )}
                        </div>
                        <div>
                          <h2 className="text-xl font-extrabold text-[#001e2b]">
                            {activeCategory?.title}
                          </h2>
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                            Hubmarket Support
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <img
                          src={`https://images.unsplash.com/photo-${
                            activeCategory?.id === "shipping"
                              ? "1586528116311-ad8dd3c8310d"
                              : activeCategory?.id === "return-policy"
                                ? "1556742049-02e53f809b40"
                                : "1484133119125-84305658e1fc"
                          }?w=160&h=100&fit=crop&q=80`}
                          alt={activeCategory?.title}
                          className="w-24 h-16 object-cover rounded-xl shadow-md border-2 border-white"
                        />
                      </div>
                    </div>

                    <div className="divide-y divide-gray-50">
                      {activeCategory?.items.map((item, index) => (
                        <FaqItem
                          key={index}
                          question={item.q}
                          answer={item.a}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
