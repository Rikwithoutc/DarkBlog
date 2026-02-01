import React, { useState } from "react";
import { LogIn, Mail, Lock, ArrowLeft, Github } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { postLogin } from "../service/useServices";

const LoginPage = ({ onBack }) => {
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Add your login logic here
    const user = await postLogin(formData);
    console.log("User logged in:", user);

    if (user.access_token) {
      localStorage.setItem("accessToken", user.access_token);
      toast.success("Logged in successfully!");
      const timer = setTimeout(() => {
        window.location.href = "/all-post";
      }, 1500);
    } else {
      toast.error(user.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-7 relative overflow-hidden animate-page-fade">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <div className="w-full max-w-md z-10 animate-slide-up">
        {/* Back Button */}
        <NavLink to="/">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all duration-300 group hover:translate-x-[-8px]"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </button>
        </NavLink>

        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-zinc-800/50 p-8 rounded-3xl backdrop-blur-xl shadow-2xl hover:border-zinc-700/50 transition-all duration-500 hover:shadow-cyan-500/10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in-slow">
              Welcome Back
            </h2>
            <p
              className="text-gray-400 animate-fade-in-slow"
              style={{ animationDelay: "0.1s" }}
            >
              Log in to your DarkBlog account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div
              className="space-y-2 animate-fade-in-slow"
              style={{ animationDelay: "0.2s" }}
            >
              <label className="text-sm text-gray-300 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    focusedField === "email"
                      ? "text-cyan-400 scale-110"
                      : "text-zinc-500"
                  }`}
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:bg-zinc-800/80 transition-all duration-300 placeholder:text-zinc-600 hover:border-zinc-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div
              className="space-y-2 animate-fade-in-slow"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-between items-center px-1">
                <label className="text-sm text-gray-300">Password</label>
              </div>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    focusedField === "password"
                      ? "text-cyan-400 scale-110"
                      : "text-zinc-500"
                  }`}
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:bg-zinc-800/80 transition-all duration-300 placeholder:text-zinc-600 hover:border-zinc-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-900 font-bold py-4 rounded-xl mt-6 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 animate-fade-in-slow"
              style={{ animationDelay: "0.5s" }}
            >
              <LogIn size={20} />
              Log In
            </button>
          </form>

          {/* Social Login Divider */}
          <div
            className="relative my-8 animate-fade-in-slow"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/50"></div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8 hover:text-gray-400 transition-colors duration-300">
            Don't have an account?{" "}
            <Link to="/sign-in">
              <span className="text-cyan-400 cursor-pointer hover:underline font-medium transition-colors duration-300">
                Create one
              </span>
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes page-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-page-fade {
          animation: page-fade 0.6s ease-in-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 0.6s ease-in-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
