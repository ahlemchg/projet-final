import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BiChevronRight,
  BiEnvelope,
  BiPhone,
  BiMap,
  BiSend,
} from "react-icons/bi";
import { publicRequest } from "../requestMethods";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await publicRequest.post("/contact", formData);
      alert(
        "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.",
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de l'envoi du message.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            <span className="text-white">Contact Us</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Contactez-
              <span className="text-[#004a99] bg-white px-2 py-0.5 rounded-md">
                nous
              </span>
            </h1>
            <p className="text-white/70 text-base max-w-xl leading-relaxed font-medium">
              Une question ? Un besoin d'assistance ? Notre équipe est là pour
              vous aider 24/7.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 flex items-center gap-5 group hover:border-[#004a99] transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-[#004a99] rounded-2xl flex items-center justify-center group-hover:bg-[#004a99] group-hover:text-white transition-all">
                <BiPhone size={24} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#001e2b]">
                  Téléphone
                </h3>
                <p className="text-gray-500 text-xs font-medium">
                  +212 5XX XX XX XX
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 flex items-center gap-5 group hover:border-[#004a99] transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <BiEnvelope size={24} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#001e2b]">Email</h3>
                <p className="text-gray-500 text-xs font-medium">
                  support@hubmarket.com
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 flex items-center gap-5 group hover:border-[#004a99] transition-all duration-300">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                <BiMap size={24} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#001e2b]">
                  Adresse
                </h3>
                <p className="text-gray-500 text-xs font-medium">
                  Casablanca, Maroc
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100">
              <h2 className="text-xl font-extrabold text-[#001e2b] mb-6">
                Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004a99]/20 focus:border-[#004a99] transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004a99]/20 focus:border-[#004a99] transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004a99]/20 focus:border-[#004a99] transition-all"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#004a99]/20 focus:border-[#004a99] transition-all resize-none"
                    placeholder="Votre message ici..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#001e2b] hover:bg-[#004a99] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group w-full md:w-auto disabled:opacity-50"
                >
                  <span>{isLoading ? "Envoi..." : "Envoyer le message"}</span>
                  <BiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
