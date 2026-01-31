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

    if(user.access_token){
      toast.success("Logged in successfully!");
      // const timer = setTimeout(() => {
      //   window.location.href = "/all-post";
      // }, 1500);
      
    }
    else {
      toast.error(user.message || "Login failed. Please try again.");
    }
  }

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
                <button className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors duration-300 hover:underline">
                  Forgot password?
                </button>
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

            {/* Remember Me Toggle */}
            <div
              className="flex items-center gap-2 px-1 animate-fade-in-slow"
              style={{ animationDelay: "0.4s" }}
            >
              <input
                type="checkbox"
                id="remember"
                className="accent-cyan-500 rounded cursor-pointer hover:accent-cyan-400 transition-all duration-300"
              />
              <label
                htmlFor="remember"
                className="text-xs text-gray-400 cursor-pointer hover:text-gray-300 transition-colors duration-300"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-900 font-bold py-4 rounded-xl mt-6 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 animate-fade-in-slow"
              style={{ animationDelay: "0.5s" }}
            >
              <LogIn size={20} />
              Sign In
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
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#121212] px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <div
            className="space-y-3 animate-fade-in-slow"
            style={{ animationDelay: "0.7s" }}
          >
            <button className="w-full bg-white text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-lg hover:shadow-gray-500/20">
              <Github size={20} />
              GitHub
            </button>

            <button className="w-full bg-white text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-lg hover:shadow-gray-500/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
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
