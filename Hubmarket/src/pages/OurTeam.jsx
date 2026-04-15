import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight, BiBadgeCheck, BiStar, BiHeart } from "react-icons/bi";

const OurTeam = () => {
  const team = [
    { name: "Chegroune Insaf", role: "CEO & Founder", img: "insaf.png" },
    { name: "Chegroune Ahlem", role: "CTO", img: "ahlem.png" },
    { name: "Boutaba Mohamed", role: "Head of Support", img: "moh.png" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-[#001e2b] text-white pt-8 pb-16">
        <div className="container mx-auto px-4 lg:px-10">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-white">Our Team</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Notre{" "}
              <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-md">
                Équipe
              </span>
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed font-medium">
              Rencontrez les experts passionnés qui travaillent chaque jour pour
              vous offrir la meilleure expérience tech.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {team.map((member, idx) => (
                <div key={idx} className="group text-center">
                  <div className="relative mb-4 inline-block">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#004a99] text-white p-1 rounded-full border-2 border-white">
                      <BiBadgeCheck size={14} />
                    </div>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#001e2b] mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-base font-extrabold text-[#001e2b] mb-2">
                  Rejoignez-nous !
                </h4>
                <p className="text-gray-500 text-[12px] leading-relaxed font-medium">
                  Nous sommes toujours à la recherche de nouveaux talents
                  passionnés par le e-commerce et la technologie.
                </p>
              </div>
              <Link
                to="/careers"
                className="bg-[#001e2b] text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#004a99] transition-all whitespace-nowrap"
              >
                Voir les postes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
