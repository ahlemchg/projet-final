import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

// Import Pages
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import HomeTheater from "./pages/HomeTheater.jsx";
import Computers from "./pages/Computers.jsx";
import CellPhones from "./pages/CellPhones.jsx";
import Features from "./pages/Features.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import StaticContentPage from "./pages/StaticContentPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import ReturnPolicy from "./pages/ReturnPolicy.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import OurStory from "./pages/OurStory.jsx";
import OurTeam from "./pages/OurTeam.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import AdminMessages from "./pages/AdminMessages.jsx";

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/home-theater" element={<HomeTheater />} />
                <Route path="/computers" element={<Computers />} />
                <Route path="/cell-phones" element={<CellPhones />} />
                <Route path="/features" element={<Features />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/product/:id" element={<SingleProductPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/help-center" element={<FaqPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route
                  path="/track-order"
                  element={
                    <StaticContentPage
                      title="Track Your Order"
                      description="Track your current order status and estimated delivery using your order details."
                    />
                  }
                />
                <Route
                  path="/product-guides"
                  element={
                    <StaticContentPage
                      title="Product Guides"
                      description="Browse buying guides and tips to choose the right product for your needs."
                    />
                  }
                />
                <Route
                  path="/wishlists"
                  element={
                    <StaticContentPage
                      title="Wishlists"
                      description="Save your favorite products and manage your personal wishlist with ease."
                    />
                  }
                />
                <Route
                  path="/store-locator"
                  element={
                    <StaticContentPage
                      title="Store Locator"
                      description="Locate partner stores and pickup points near your location."
                    />
                  }
                />
                <Route
                  path="/in-store-shop"
                  element={
                    <StaticContentPage
                      title="In-Store Shop"
                      description="Discover products available for in-store browsing and pickup."
                    />
                  }
                />
                <Route
                  path="/brands"
                  element={
                    <StaticContentPage
                      title="Brands x"
                      description="Explore popular brands available on Hubmarket."
                    />
                  }
                />
                <Route
                  path="/gift-cards"
                  element={
                    <StaticContentPage
                      title="Gift Cards"
                      description="Purchase and send digital gift cards for friends and family."
                    />
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
