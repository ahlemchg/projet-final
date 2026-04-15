import React from "react";
import { Link } from "react-router-dom";
import {
  BiChevronRight,
  BiPackage,
  BiTimer,
  BiMap,
  BiCheckCircle,
} from "react-icons/bi";

const ShippingPolicy = () => {
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
            <span className="text-white">Shipping Policy</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Livraison &{" "}
              <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-md">
                Expédition
              </span>
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed font-medium">
              Chez Hubmarket, nous nous engageons à vous livrer vos produits
              high-tech rapidement et en toute sécurité.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100">
              <section className="mb-10">
                <h2 className="text-xl font-extrabold text-[#001e2b] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-50 text-[#004a99] rounded-lg flex items-center justify-center">
                    <BiTimer size={20} />
                  </span>
                  Délais de traitement
                </h2>
                <div className="space-y-3 text-gray-500 leading-relaxed text-[13px] font-medium">
                  <p>
                    Toutes les commandes sont traitées dans un délai de{" "}
                    <strong>1 à 2 jours ouvrables</strong>.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-extrabold text-[#001e2b] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-50 text-[#004a99] rounded-lg flex items-center justify-center">
                    <BiPackage size={20} />
                  </span>
                  Tarifs de livraison
                </h2>
                <div className="overflow-hidden rounded-xl border border-gray-100 mb-4">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-gray-50 text-[#001e2b] font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3">Méthode</th>
                        <th className="px-4 py-3">Délai estimé</th>
                        <th className="px-4 py-3">Coût</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-500">
                      <tr>
                        <td className="px-4 py-3 text-[#001e2b] font-bold">
                          Standard
                        </td>
                        <td className="px-4 py-3">3-5 jours</td>
                        <td className="px-4 py-3">Gratuit (Dès 50€)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-[#001e2b] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-50 text-[#004a99] rounded-lg flex items-center justify-center">
                    <BiMap size={20} />
                  </span>
                  Zones de livraison
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["France", "Belgique", "Suisse", "Luxembourg"].map(
                    (country) => (
                      <div
                        key={country}
                        className="bg-gray-50 p-2 rounded-lg flex items-center gap-2 text-[#001e2b] font-bold text-[11px] uppercase tracking-tight"
                      >
                        <BiCheckCircle className="text-green-500" size={14} />
                        {country}
                      </div>
                    ),
                  )}
                </div>
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
                Si vous avez des questions sur votre commande, contactez-nous.
              </p>
              <Link
                to="/contact-us"
                className="block text-center bg-[#001e2b] text-white py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#004a99] transition-all"
              >
                Nous contacter
              </Link>
            </div>

            <div className="bg-[#004a99] rounded-[1.5rem] p-6 text-white shadow-lg relative overflow-hidden group">
              <h3 className="text-base font-extrabold mb-1 relative z-10">
                Suivi
              </h3>
              <p className="text-white/70 text-[11px] mb-4 relative z-10 font-medium leading-relaxed">
                Suivez votre colis en temps réel.
              </p>
              <Link
                to="/track-order"
                className="inline-flex items-center gap-2 bg-white text-[#001e2b] px-4 py-2 rounded-lg font-bold text-[9px] uppercase tracking-widest hover:scale-105 transition-all relative z-10"
              >
                Suivre mon colis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
