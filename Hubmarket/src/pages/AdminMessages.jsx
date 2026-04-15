import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BiChevronRight, 
  BiEnvelope, 
  BiUser, 
  BiTime, 
  BiTrash, 
  BiCheckCircle,
  BiMessageSquareDetail,
  BiSearch,
  BiFilterAlt,
  BiX
} from "react-icons/bi";
import { userRequest } from "../requestMethods";

const AdminMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [searchTerm, setSearchTerm] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/");
      return;
    }

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await userRequest.get("/contact");
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [userInfo, navigate]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await userRequest.put(`/contact/${id}`, { status });
      setMessages(messages.map(m => m._id === id ? { ...m, status } : m));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      try {
        await userRequest.delete(`/contact/${id}`);
        setMessages(messages.filter(m => m._id !== id));
      } catch (err) {
        console.error("Error deleting message:", err);
      }
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesFilter = filter === "all" || m.status === filter;
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!userInfo || !userInfo.isAdmin) return null;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#001e2b] text-white pt-10 pb-20">
        <div className="container mx-auto px-4 lg:px-10">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <BiChevronRight />
            <span className="text-white">Admin Dashboard</span>
            <BiChevronRight />
            <span className="text-white">Messages</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold mb-2 leading-tight">
                Messages Clients
              </h1>
              <p className="text-white/60 text-sm font-medium">
                Gérez les demandes de contact reçues via le formulaire.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-center px-4 border-r border-white/10">
                <p className="text-2xl font-black">{messages.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total</p>
              </div>
              <div className="text-center px-4">
                <p className="text-2xl font-black text-[#ffb400]">
                  {messages.filter(m => m.status === "unread").length}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Non lus</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 -mt-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full md:w-auto">
              <button 
                onClick={() => setFilter("all")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${filter === "all" ? "bg-white text-[#001e2b] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                Tous
              </button>
              <button 
                onClick={() => setFilter("unread")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${filter === "unread" ? "bg-white text-[#001e2b] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                Non lus
              </button>
              <button 
                onClick={() => setFilter("read")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${filter === "read" ? "bg-white text-[#001e2b] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                Lus
              </button>
            </div>

            <div className="relative w-full md:w-80">
              <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher par nom, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#004a99]/10 transition-all"
              />
            </div>
          </div>

          {/* Messages List */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#001e2b]/10 border-t-[#001e2b] rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Chargement des messages...</p>
              </div>
            ) : filteredMessages.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-4">Expéditeur</th>
                    <th className="px-8 py-4">Sujet</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Statut</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredMessages.map((msg) => (
                    <tr key={msg._id} className={`hover:bg-gray-50/80 transition-all group ${msg.status === 'unread' ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-[#001e2b] shadow-sm">
                            <BiUser size={20} />
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${msg.status === 'unread' ? 'text-[#001e2b]' : 'text-gray-600'}`}>{msg.name}</p>
                            <p className="text-xs text-gray-400 font-medium">{msg.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-xs">
                          <p className={`text-sm font-bold truncate ${msg.status === 'unread' ? 'text-[#001e2b]' : 'text-gray-600'}`}>{msg.subject}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-1">{msg.message}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                          <BiTime size={16} />
                          {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                          msg.status === 'unread' ? 'bg-[#ffb400]/10 text-[#ffb400]' : 
                          msg.status === 'read' ? 'bg-emerald-500/10 text-emerald-500' : 
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {msg.status === 'unread' ? 'Non lu' : 'Lu'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          {msg.status === 'unread' ? (
                            <button 
                              onClick={() => handleUpdateStatus(msg._id, 'read')}
                              className="p-2 bg-emerald-50 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                              title="Marquer comme lu"
                            >
                              <BiCheckCircle size={18} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleUpdateStatus(msg._id, 'unread')}
                              className="p-2 bg-amber-50 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all"
                              title="Marquer comme non lu"
                            >
                              <BiMessageSquareDetail size={18} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(msg._id)}
                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            title="Supprimer"
                          >
                            <BiTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <BiEnvelope size={32} />
                </div>
                <h3 className="text-sm font-extrabold text-[#001e2b] mb-1">Aucun message trouvé</h3>
                <p className="text-xs text-gray-400">Vos demandes de contact apparaîtront ici.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
