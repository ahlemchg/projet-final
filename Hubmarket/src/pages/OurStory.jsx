import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight, BiRocket, BiBullseye, BiTrophy } from "react-icons/bi";

const OurStory = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-[#001e2b] text-white pt-8 pb-16">
        <div className="container mx-auto px-4 lg:px-10">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <BiChevronRight />
            <span className="text-white">Our Story</span>
          </nav>
          
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Notre <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-md">Histoire</span>
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed font-medium">
              Découvrez comment Hubmarket est devenu la référence de la tech accessible et sécurisée.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="mb-10">
              <img 
                src="/home1.jpg" 
                alt="Hubmarket Story" 
                className="w-full h-[300px] object-cover rounded-3xl shadow-sm border border-gray-50"
              />
            </div>
            <div className="space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#004a99] rounded-xl flex items-center justify-center">
                    <BiRocket size={24} />
                  </div>
                  <h2 className="text-xl font-extrabold text-[#001e2b]">Le Commencement</h2>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium">
                  Fondé en 2024, Hubmarket est né d'une vision simple : créer une plateforme où la technologie 
                  de pointe rencontre la simplicité d'achat. Nous avons commencé comme une petite équipe de 
                  passionnés de tech et sommes devenus une marketplace dynamique.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                    <BiBullseye size={24} />
                  </div>
                  <h2 className="text-xl font-extrabold text-[#001e2b]">Notre Mission</h2>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium">
                  Notre mission est de démocratiser l'accès aux derniers produits high-tech tout en garantissant 
                  une sécurité totale des transactions et une rapidité de livraison inégalée.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-2xl font-black text-[#004a99] mb-1">50k+</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clients Heureux</div>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-2xl font-black text-[#004a99] mb-1">100%</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Produits Authentiques</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
