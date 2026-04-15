import React from "react";
import { Link } from "react-router-dom";
import {
  BiEnvelope,
  BiPhoneCall,
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoLinkedin,
} from "react-icons/bi";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";

const Footer = () => {
  const productLinks = [
    { label: "Track Your Order", to: "/track-order" },
    { label: "Product Guides", to: "/product-guides" },
    { label: "Wishlists", to: "/wishlists" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Store Locator", to: "/store-locator" },
  ];

  const marketplaceLinks = [
    { label: "In-Store Shop", to: "/in-store-shop" },
    { label: "Brands x", to: "/brands" },
    { label: "Gift Cards", to: "/gift-cards" },
    { label: "Careers", to: "/careers" },
    { label: "About Us", to: "/about-us" },
  ];

  return (
    <footer className="bg-[#001e2b] text-white pt-10 pb-6">
      <div className="container mx-auto px-4 lg:px-10">
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
              {productLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Marketplace</h3>
            <ul className="flex flex-col gap-2.5 text-gray-400 text-[13px]">
              {marketplaceLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Customer Care</h3>
            <ul className="flex flex-col gap-2.5 text-gray-400 text-[13px]">
              {productLinks.map((item) => (
                <li key={`care-${item.to}`}>
                  <Link
                    to={item.to}
                    className="hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Marketplace</h3>
            <ul className="flex flex-col gap-2.5 text-gray-400 text-[13px]">
              {marketplaceLinks.map((item) => (
                <li key={`market-${item.to}`}>
                  <Link
                    to={item.to}
                    className="hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
