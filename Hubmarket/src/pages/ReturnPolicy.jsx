import React from "react";
import { Link } from "react-router-dom";
import {
  BiChevronRight,
  BiRefresh,
  BiTimeFive,
  BiShieldX,
  BiSupport,
} from "react-icons/bi";

const ReturnPolicy = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#001e2b] text-white pt-8 pb-16">
        <div className="container mx-auto px-4 lg:px-10">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-white">Return Policy</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Politique de{" "}
              <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-md">
                Retour
              </span>
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed font-medium">
              Pas entièrement satisfait ? Notre politique de retour simplifiée
              vous permet de changer d'avis.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-5 bg-blue-50 rounded-2xl space-y-3">
                  <div className="w-10 h-10 bg-[#004a99] text-white rounded-xl flex items-center justify-center">
                    <BiTimeFive size={24} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#001e2b]">
                    Délai de 30 jours
                  </h3>
                  <p className="text-gray-500 text-[12px] font-medium leading-relaxed">
                    Vous disposez de 30 jours pour demander un retour.
                  </p>
                </div>
                <div className="p-5 bg-amber-50 rounded-2xl space-y-3">
                  <div className="w-10 h-10 bg-amber-400 text-[#001e2b] rounded-xl flex items-center justify-center">
                    <BiRefresh size={24} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#001e2b]">
                    Remboursement
                  </h3>
                  <p className="text-gray-500 text-[12px] font-medium leading-relaxed">
                    Nous vous remboursons intégralement après validation.
                  </p>
                </div>
              </div>

              <section className="mb-10">
                <h2 className="text-xl font-extrabold text-[#001e2b] mb-4">
                  Conditions
                </h2>
                <ul className="space-y-3">
                  {[
                    "L'article doit être dans son emballage d'origine.",
                    "Tous les accessoires doivent être présents.",
                    "Pas de traces d'utilisation abusive.",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-500 font-medium text-[13px]"
                    >
                      <span className="mt-1 w-4 h-4 bg-green-50 text-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold">
                        {idx + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-6 bg-gray-50 rounded-[1.5rem] border border-dashed border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <BiShieldX className="text-red-500" size={24} />
                  <h2 className="text-lg font-extrabold text-[#001e2b]">
                    Exclusions
                  </h2>
                </div>
                <p className="text-gray-500 text-[12px] font-medium leading-relaxed">
                  Certains produits ne peuvent pas être retournés : hygiène,
                  logiciels ouverts, cartes cadeaux.
                </p>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-[1.5rem] p-6 shadow-lg border border-gray-100">
              <h3 className="text-base font-extrabold text-[#001e2b] mb-3">
                Besoin d'aide ?
              </h3>
              <p className="text-gray-400 text-[12px] leading-relaxed mb-4 font-medium">
                Notre équipe support est là pour vous guider.
              </p>
              <Link
                to="/contact-us"
                className="block text-center bg-[#001e2b] text-white py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#004a99] transition-all"
              >
                Parler à un agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
