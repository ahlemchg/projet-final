import React from "react";
import { BiChevronRight, BiRocket, BiShieldQuarter, BiSupport, BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-[#001e2b]">About Us</h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">Home</Link>
            <BiChevronRight />
            <span className="text-gray-600">About Us</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <img
              src="/assets/home1.jpg"
              alt="Our Story"
              className="rounded-3xl shadow-2xl w-full h-full object-cover aspect-square max-h-[500px]"
            />
            <div className="absolute -bottom-8 -right-8 bg-[#004a99] p-8 rounded-3xl text-white shadow-xl hidden md:block">
              <p className="text-4xl font-extrabold mb-1">10+</p>
              <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">Years Experience</p>
            </div>
          </div>
          <div className="space-y-8">
            <p className="text-[11px] font-bold text-[#004a99] uppercase tracking-widest">Our Story</p>
            <h2 className="text-4xl font-extrabold text-[#001e2b] leading-tight">
              Crafting Digital Experiences Since 2015
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Hubmarket was founded with a simple mission: to provide high-quality digital and physical products that enhance the daily lives of our customers.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Our journey started in a small office with a big vision. Today, we are proud to serve thousands of happy customers around the globe, delivering innovative solutions and premium products directly to your doorstep.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="bg-[#001e2b] p-4 rounded-xl text-white">
                <BiRocket size={32} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#001e2b]">Fast Delivery</h4>
                <p className="text-gray-500 text-sm">We ensure your products reach you quickly and safely.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="p-8 bg-gray-50 rounded-3xl text-center space-y-4 hover:bg-[#001e2b] group transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#004a99] group-hover:text-white transition-all">
              <BiShieldQuarter size={32} className="text-[#001e2b] group-hover:text-white" />
            </div>
            <h3 className="font-extrabold text-[#001e2b] group-hover:text-white transition-all">Secure Payment</h3>
            <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-all">100% secure payment methods and data protection.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl text-center space-y-4 hover:bg-[#001e2b] group transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#004a99] group-hover:text-white transition-all">
              <BiSupport size={32} className="text-[#001e2b] group-hover:text-white" />
            </div>
            <h3 className="font-extrabold text-[#001e2b] group-hover:text-white transition-all">24/7 Support</h3>
            <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-all">Our dedicated support team is always here to help you.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl text-center space-y-4 hover:bg-[#001e2b] group transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#004a99] group-hover:text-white transition-all">
              <BiHeart size={32} className="text-[#001e2b] group-hover:text-white" />
            </div>
            <h3 className="font-extrabold text-[#001e2b] group-hover:text-white transition-all">Premium Quality</h3>
            <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-all">We carefully select and test every product we offer.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl text-center space-y-4 hover:bg-[#001e2b] group transition-all duration-300">
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#004a99] group-hover:text-white transition-all">
              <BiRocket size={32} className="text-[#001e2b] group-hover:text-white" />
            </div>
            <h3 className="font-extrabold text-[#001e2b] group-hover:text-white transition-all">Free Returns</h3>
            <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-all">30-day free returns policy for your peace of mind.</p>
          </div>
        </div>

        <div className="bg-[#001e2b] rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-8">Want to know more?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/our-story" className="bg-white/10 hover:bg-white/20 p-6 rounded-3xl transition-all group">
              <h4 className="font-bold text-lg mb-2">Our Story</h4>
              <p className="text-white/60 text-sm">Deep dive into our history and values.</p>
              <BiChevronRight className="mx-auto mt-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/our-team" className="bg-white/10 hover:bg-white/20 p-6 rounded-3xl transition-all group">
              <h4 className="font-bold text-lg mb-2">Our Team</h4>
              <p className="text-white/60 text-sm">Meet the experts behind the scenes.</p>
              <BiChevronRight className="mx-auto mt-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/contact-us" className="bg-white/10 hover:bg-white/20 p-6 rounded-3xl transition-all group">
              <h4 className="font-bold text-lg mb-2">Contact Us</h4>
              <p className="text-white/60 text-sm">Get in touch with our support team.</p>
              <BiChevronRight className="mx-auto mt-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;