import React from "react";
import { Link } from "react-router-dom";
import {
  BiChevronRight,
  BiLockAlt,
  BiUserCheck,
  BiFile,
  BiEnvelope,
} from "react-icons/bi";

const PrivacyPolicy = () => {
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
            <span className="text-white">Privacy Policy</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Confidentialité &{" "}
              <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-md">
                Données
              </span>
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed font-medium">
              Votre vie privée est notre priorité. Hubmarket s'engage à protéger
              vos données.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 mb-10 pb-8 border-b border-gray-100">
              <div className="flex-1 space-y-3">
                <div className="w-10 h-10 bg-blue-50 text-[#004a99] rounded-xl flex items-center justify-center">
                  <BiLockAlt size={24} />
                </div>
                <h3 className="text-base font-extrabold text-[#001e2b]">
                  Sécurité
                </h3>
                <p className="text-gray-500 text-[12px] font-medium leading-relaxed">
                  Protocoles de chiffrement de pointe.
                </p>
              </div>
              <div className="flex-1 space-y-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <BiUserCheck size={24} />
                </div>
                <h3 className="text-base font-extrabold text-[#001e2b]">
                  Contrôle
                </h3>
                <p className="text-gray-500 text-[12px] font-medium leading-relaxed">
                  Gérez vos données à tout moment.
                </p>
              </div>
            </div>

            <article className="space-y-8">
              <section>
                <h2 className="text-lg font-extrabold text-[#001e2b] mb-4">
                  1. Collecte
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {["Nom", "Email", "Adresse", "Téléphone"].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg text-gray-600 text-[11px] font-bold uppercase tracking-tight"
                    >
                      <BiFile className="text-[#004a99]" size={14} /> {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-6 bg-[#001e2b] rounded-[1.5rem] text-white">
                <div className="flex items-center gap-3 mb-3">
                  <BiEnvelope className="text-amber-400" size={24} />
                  <h2 className="text-lg font-extrabold">Contact</h2>
                </div>
                <p className="text-white/70 text-[11px] font-medium mb-4">
                  Pour toute question relative à vos données :
                </p>
                <a
                  href="mailto:privacy@hubmarket.com"
                  className="inline-block bg-white text-[#001e2b] px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  privacy@hubmarket.com
                </a>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
