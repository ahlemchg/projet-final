import React, { useState, useEffect } from "react";
import { BiChevronRight, BiPlus, BiMinus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left hover:text-[#004a99] transition-colors group"
      >
        <h3 className="text-lg font-extrabold text-[#001e2b] group-hover:text-[#004a99]">
          {question}
        </h3>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#001e2b] text-white rotate-180' : 'bg-gray-50 text-gray-400'}`}>
          {isOpen ? <BiMinus size={20} /> : <BiPlus size={20} />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-500 leading-relaxed text-sm">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await publicRequest.get("faq");
        setFaqs(res.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-[#001e2b]">Help Center</h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">Home</Link>
            <BiChevronRight />
            <span className="text-gray-600">FAQ</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 pb-20 max-w-3xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-[#001e2b] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about our products and services.</p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;