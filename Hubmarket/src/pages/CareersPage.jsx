import React from "react";
import { Link } from "react-router-dom";
import {
  BiChevronRight,
  BiRocket,
  BiHeart,
  BiGroup,
  BiBriefcase,
  BiMap,
  BiTime,
  BiCheckCircle,
} from "react-icons/bi";

const CareersPage = () => {
  const positions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Casablanca / Remote",
      type: "Full-time",
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Casablanca",
      type: "Full-time",
    },
    {
      title: "Customer Success Representative",
      department: "Support",
      location: "Casablanca",
      type: "Full-time",
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
    },
  ];

  const benefits = [
    {
      title: "Flexible Working",
      description:
        "Work from our modern office or from the comfort of your home.",
      icon: <BiTime size={24} />,
    },
    {
      title: "Health Insurance",
      description:
        "Premium health and dental coverage for you and your family.",
      icon: <BiHeart size={24} />,
    },
    {
      title: "Growth & Learning",
      description: "Annual budget for courses, books, and conferences.",
      icon: <BiRocket size={24} />,
    },
    {
      title: "Amazing Team",
      description:
        "Work with passionate people in a collaborative environment.",
      icon: <BiGroup size={24} />,
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-[#001e2b] text-white pt-8 pb-24">
        <div className="container mx-auto px-4 lg:px-10">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-white">Careers</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Join our{" "}
              <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-lg">
                Mission
              </span>
            </h1>
            <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed">
              Help us build the future of digital commerce and create
              exceptional experiences for customers worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-12">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Why Join Us Section */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[10px] font-bold text-[#004a99] uppercase tracking-[0.2em] mb-3 block">
                  Work with us
                </span>
                <h2 className="text-2xl font-extrabold text-[#001e2b] mb-4">
                  Why Hubmarket?
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-[#004a99] mt-0.5">
                      <BiCheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001e2b] mb-0.5 text-sm">
                        Innovative Culture
                      </h4>
                      <p className="text-gray-500 text-xs">
                        We embrace new technologies and encourage creative
                        problem-solving in everything we do.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-[#004a99] mt-0.5">
                      <BiCheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001e2b] mb-0.5 text-sm">
                        Impactful Work
                      </h4>
                      <p className="text-gray-500 text-xs">
                        Your contributions directly shape the experience of
                        thousands of users every day.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-[#004a99] mt-0.5">
                      <BiCheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001e2b] mb-0.5 text-sm">
                        Career Pathing
                      </h4>
                      <p className="text-gray-500 text-xs">
                        We invest in your long-term success with clear paths for
                        advancement and mentorship.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/home2.jpg"
                  alt="Team collaboration"
                  className="rounded-[1.5rem] shadow-md w-full h-[300px] object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-[#ffb400] p-6 rounded-[1.5rem] shadow-lg hidden md:block">
                  <p className="text-2xl font-black text-[#001e2b]">25+</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#001e2b]/60">
                    Experts Globally
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-[1.5rem] shadow-md border border-gray-100 hover:border-[#004a99] transition-all group"
              >
                <div className="w-12 h-12 bg-gray-50 text-[#004a99] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#004a99] group-hover:text-white transition-all">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-extrabold text-[#001e2b] mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Open Positions Section */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-[#001e2b] mb-1">
                  Open Positions
                </h2>
                <p className="text-gray-500 font-medium text-sm">
                  Find your next role at Hubmarket
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-50 text-[#004a99] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  All Roles ({positions.length})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {positions.map((job, idx) => (
                <div
                  key={idx}
                  className="group bg-gray-50/50 hover:bg-white hover:shadow-lg hover:scale-[1.005] border border-transparent hover:border-gray-100 p-4 rounded-[1.5rem] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#001e2b] shadow-sm">
                      <BiBriefcase size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-[#001e2b] mb-0.5">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <BiGroup className="text-[#004a99]" />{" "}
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <BiMap className="text-[#004a99]" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <BiTime className="text-[#004a99]" /> {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-[#001e2b] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#004a99] transition-all group-hover:shadow-md flex items-center justify-center gap-1.5">
                    Apply Now{" "}
                    <BiChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500 font-medium mb-3 text-sm">
                Don't see the right role?
              </p>
              <Link
                to="/contact-us"
                className="text-[#004a99] font-extrabold hover:underline flex items-center justify-center gap-1 text-sm"
              >
                Send us an open application <BiChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
