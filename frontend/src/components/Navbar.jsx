import { LogIn, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    setOpen(false);

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-zinc-950/80 px-6 py-5 border-b border-zinc-800/50 animate-fade-in">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => scrollToSection("hero")}
          className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          DarkBlog
        </h1>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-gray-400 text-sm font-medium">
          <button
            onClick={() => scrollToSection("hero")}
            className="relative hover:text-white transition-colors duration-300 px-3 py-1 rounded-md group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="relative hover:text-white transition-colors duration-300 px-3 py-1 rounded-md group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </button>
          <NavLink
            to="/all-post"
            className="relative hover:text-white transition-colors duration-300 px-3 py-1 rounded-md group"
          >
            All Posts
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </NavLink>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {location.pathname === "/" && (
            <>
              <Link to="/log-in">
                <button className="hidden sm:flex items-center gap-2 text-white hover:text-cyan-400 font-semibold transition-all duration-300 hover:translate-x-1 group">
                  <LogIn size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>Log In</span>
                </button>
              </Link>

              <Link to="/sign-in" className="hidden sm:block">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-900 px-5 py-2 rounded-2xl font-bold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white hover:text-cyan-400 transition-all duration-300 hover:rotate-90"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-zinc-900/95 backdrop-blur-lg rounded-2xl p-6 flex flex-col gap-4 text-gray-300 animate-slide-down border border-zinc-800/50">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-left hover:text-white hover:translate-x-2 transition-all duration-300"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-left hover:text-white hover:translate-x-2 transition-all duration-300"
          >
            About
          </button>
          <NavLink
            to="/all-post"
            onClick={() => setOpen(false)}
            className="hover:text-white hover:translate-x-2 transition-all duration-300"
          >
            All Posts
          </NavLink>

          {/* Mobile auth buttons */}
          {location.pathname === "/" && (
            <div className="flex flex-col gap-3 pt-4 border-t border-zinc-700">
              <Link to="/log-in" onClick={() => setOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 text-white border border-zinc-700 py-2 rounded-xl hover:bg-zinc-800/50 hover:border-cyan-500/50 transition-all duration-300 hover:translate-y-[-2px]">
                  <LogIn size={18} />
                  Log In
                </button>
              </Link>

              <Link to="/sign-in" onClick={() => setOpen(false)}>
                <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-900 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:translate-y-[-2px] active:scale-95">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-in-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
