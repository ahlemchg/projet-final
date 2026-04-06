import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const SiteIntro = () => {
  return (
    <section className="bg-gradient-to-b from-[#f8f9fb] to-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-10 py-8 md:py-10">
        <div className="max-w-4xl">
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#004a99] mb-3">
            Welcome to Hubmarket
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001e2b] leading-tight">
            Votre marketplace tech pour acheter vite, en securite.
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
            Decouvrez une large selection de produits high-tech, comparez les
            offres, ajoutez a votre wishlist et passez commande en quelques
            clics.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/computers"
              className="inline-flex items-center gap-2 bg-[#001e2b] text-white px-5 py-2.5 rounded-lg font-bold text-[12px] hover:bg-[#00354d] transition-colors"
            >
              Commencer vos achats <BiChevronRight size={16} />
            </Link>
            <Link
              to="/help-center"
              className="inline-flex items-center gap-2 border border-gray-200 text-[#001e2b] px-5 py-2.5 rounded-lg font-bold text-[12px] hover:bg-white transition-colors"
            >
              Besoin d'aide <BiChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteIntro;
