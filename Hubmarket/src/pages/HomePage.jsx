import React from "react";
import Home from "../components/Home.jsx";
import HotDeals from "../components/HotDeals.jsx";
import CategoryShowcase from "../components/CategoryShowcase.jsx";
import ShopElectronics from "../components/ShopElectronics.jsx";
import CategoryFilters from "../components/CategoryFilters.jsx";
import IpadBanner from "../components/IpadBanner.jsx";
import BrandLogos from "../components/BrandLogos.jsx";

const HomePage = () => {
  return (
    <>
      <Home />
      <HotDeals />
      <CategoryShowcase />
      <ShopElectronics />
      <CategoryFilters />
      <IpadBanner />
      <BrandLogos />
    </>
  );
};

export default HomePage;
