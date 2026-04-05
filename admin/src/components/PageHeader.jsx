import React from "react";
import { BiChevronRight, BiPlusCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const PageHeader = ({
  title,
  breadcrumbs,
  showAddButton,
  addButtonText,
  onAddClick,
  showProfile = true,
}) => {
  return (
    <div className="container mx-auto px-4 lg:px-10 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#001e2b]">{title}</h1>
          <nav className="flex items-center gap-2 text-[11px] font-medium text-gray-400 mt-1">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            {breadcrumbs &&
              breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BiChevronRight />
                  <span
                    className={
                      index === breadcrumbs.length - 1 ? "text-gray-600" : ""
                    }
                  >
                    {crumb.path ? (
                      <Link to={crumb.path} className="hover:text-[#001e2b]">
                        {crumb.label}
                      </Link>
                    ) : (
                      crumb.label
                    )}
                  </span>
                </React.Fragment>
              ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {/* User Profile Info - Moved here from Navbar */}
          {showProfile && (
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-bold text-[#001e2b] leading-tight">
                  Admin User
                </p>
                <p className="text-[10px] text-gray-500 font-medium">
                  Super Admin
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#001e2b] text-white flex items-center justify-center font-bold text-sm shadow-md">
                AU
              </div>
            </div>
          )}

          {showAddButton && (
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 bg-[#001e2b] text-white px-6 py-3 rounded-lg font-extrabold text-[11px] uppercase tracking-widest hover:bg-[#00354d] transition-all shadow-lg shadow-[#001e2b]/20"
            >
              <BiPlusCircle size={18} /> {addButtonText || "Add New"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
