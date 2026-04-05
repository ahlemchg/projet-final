import React, { useEffect } from 'react';
import { BiCheckCircle, BiX } from 'react-icons/bi';

const Toast = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="bg-[#001e2b] text-white px-6 py-4 rounded-md shadow-2xl flex items-center gap-4 min-w-[300px]">
        <BiCheckCircle className="text-green-400" size={24} />
        <p className="font-bold flex-grow">{message}</p>
        <button onClick={onClose} className="hover:text-amber-400 transition-colors">
          <BiX size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
