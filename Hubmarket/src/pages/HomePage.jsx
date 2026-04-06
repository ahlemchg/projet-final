import React from "react";
import SiteIntro from "../components/SiteIntro.jsx";
import Home from "../components/Home.jsx";
import HotDeals from "../components/HotDeals.jsx";
import CategoryShowcase from "../components/CategoryShowcase.jsx";
import ShopElectronics from "../components/ShopElectronics.jsx";
import CategoryFilters from "../components/CategoryFilters.jsx";
import IpadBanner from "../components/IpadBanner.jsx";
import BrandLogos from "../components/BrandLogos.jsx";
import Newsletter from "../components/Newsletter.jsx";

const HomePage = () => {
  return (
    <>
      <SiteIntro />
      <Home />
      <HotDeals />
      <CategoryShowcase />
      <ShopElectronics />
      <CategoryFilters />
      <IpadBanner />
      <BrandLogos />
      <Newsletter />
    </>
  );
};

export default HomePage;
