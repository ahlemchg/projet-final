import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import PageHeader from "./PageHeader.jsx";
import { BiUser, BiTrash, BiEditAlt, BiLoaderAlt } from "react-icons/bi";
import { userRequest } from "../requestMethods";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userRequest.get("users");
        setUsers(res.data.filter((u) => !u.isAdmin));
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userRequest.delete(`users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleToggleAdmin = async (user) => {
    try {
      const res = await userRequest.put(`users/${user._id}`, {
        isAdmin: !user.isAdmin,
      });
      if (res.status === 200) {
        setUsers(users.map((u) => (u._id === user._id ? res.data : u)));
      }
    } catch (err) {
      console.error("Error toggling admin role:", err);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />

      <PageHeader title="Users Management" breadcrumbs={[{ label: "Users" }]} />

      <div className="container mx-auto px-4 lg:px-10 pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BiLoaderAlt
              className="animate-spin text-gray-300 mb-4"
              size={40}
            />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Loading users...
            </p>
          </div>
        ) : users.length > 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 border-b border-gray-50">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      User
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Email
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Joined Date
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">
                      Role
                    </th>
                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#001e2b]/5 text-[#001e2b] rounded-full flex items-center justify-center font-bold text-sm">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-bold text-[#001e2b]">
                            {user.username}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-gray-600">
                          {user.email}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <button
                          onClick={() => handleToggleAdmin(user)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                            user.isAdmin
                              ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                              : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </button>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <BiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="p-5 bg-white rounded-full shadow-sm text-gray-400 mb-4">
              <BiUser size={40} />
            </div>
            <h3 className="text-lg font-bold text-[#001e2b]">No users yet</h3>
            <p className="text-gray-400 text-sm mt-1">
              A list of all registered users will be shown here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
