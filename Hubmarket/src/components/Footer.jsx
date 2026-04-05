import React from "react";
import {
  BiEnvelope,
  BiPhoneCall,
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoLinkedin,
} from "react-icons/bi";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#001e2b] text-white pt-10 pb-6">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-1.5 rounded-sm">
              <BiEnvelope size={20} className="text-[#001e2b]" />
            </div>
            <h2 className="text-lg md:text-xl font-bold">
              Subscribe and get 20% discount.
            </h2>
          </div>
          <div className="flex w-full lg:w-auto gap-0">
            <input
              type="email"
              placeholder="E-mail address"
              className="bg-white text-gray-800 px-4 py-2 rounded-l-full focus:outline-none w-full lg:w-72 text-sm"
            />
            <button className="bg-amber-400 text-[#001e2b] font-bold px-6 py-2 rounded-r-full hover:bg-amber-500 transition-colors whitespace-nowrap text-sm">
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10 border-t border-white/10 pt-10">
          <div className="lg:col-span-1">
            <h3 className="font-bold text-base mb-4">Hub Customer Care</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2.5">
                <BiPhoneCall
                  size={20}
                  className="text-amber-400 flex-shrink-0 mt-1"
                />
                <div>
                  <p className="text-[12px] text-gray-400">
                    Monday-Friday: 08am-9pm
                  </p>
                  <p className="font-bold text-base">+(1) 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <BiEnvelope
                  size={20}
                  className="text-amber-400 flex-shrink-0 mt-1"
                />
                <div>
                  <p className="text-[12px] text-gray-400">
                    Need help with your order?
                  </p>
                  <p className="font-bold text-base">hub@liquid.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Products</h3>
            <ul className="flex flex-col gap-2.5 text-gray-400 text-[13px]">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Track Your Order
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Product Guides
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Wishlists
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Store Locator
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Marketplace</h3>
            <ul className="flex flex-col gap-2.5 text-gray-400 text-[13px]">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                In-Store Shop
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Brands x
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Gift Cards
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Careers
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                About Us
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Customer Care</h3>
            <ul className="flex flex-col gap-2.5 text-gray-400 text-[13px]">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Track Your Order
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Product Guides
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Wishlists
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Store Locator
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Marketplace</h3>
            <ul className="flex flex-col gap-2.5 text-gray-400 text-[13px]">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                In-Store Shop
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Brands x
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Gift Cards
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                Careers
              </li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">
                About Us
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          <FaCcVisa
            size={24}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          />
          <FaCcMastercard
            size={24}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          />
          <FaCcPaypal
            size={24}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          />
          <FaCcAmex
            size={24}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4">
          <p className="text-[12px] text-gray-400 text-center md:text-left">
            All images are for demo purposes only. 2021 Hub Marketplace.
          </p>
          <div className="flex items-center gap-3">
            <BiLogoFacebook
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors"
            />
            <BiLogoTwitter
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors"
            />
            <BiLogoLinkedin
              size={18}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
