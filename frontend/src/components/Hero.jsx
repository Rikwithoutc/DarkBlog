import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import FloatingModel from "./FloatingModel";
import SplineComponent from "./Spline";

const Hero = () => {
  return (
    <div
      id="hero"
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden mt-15"
    >
      {/* Background 3D Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <FloatingModel />
        </Canvas>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-20 gap-8">
        {/* LEFT: TEXT CONTENT (Span 7 columns) */}
        <div className="lg:col-span-7 text-center lg:text-left pt-20 lg:pt-0">
          <h2 className="text-5xl md:text-7xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Share Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Thoughts
            </span>
            <br />
            With The World
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0">
            A minimalist dark-themed platform for writers, thinkers, and
            creators. Connect with others through the power of words.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/all-post">
              <button className="flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-white/5">
                Start Reading <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="/sign-in">
              <button className="bg-zinc-900 text-white border border-zinc-800 px-10 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all">
                Join Community
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT: 3D MODEL CENTERED */}
        <div className="lg:col-span-5 relative h-[400px] w-full flex items-center justify-center">
          {/* Subtle Glow */}
          <div className="absolute w-64 h-64 bg-purple-600/15 blur-[100px] rounded-full"></div>

          {/* Centered Spline Container */}
          <div className="w-full h-full flex items-center justify-center">
            <SplineComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
