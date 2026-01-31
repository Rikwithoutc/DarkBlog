import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import { getProfile } from "../service/useServices";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfile();
        console.log("Logged in user profile:", user);
        if (user.msg) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#0a0a0a] transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <Navbar isLoggedIn={isLoggedIn} />

      <main>
        <Hero />

        {/* Visual Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent hover:via-zinc-700 transition-all duration-500" />

        <About />
      </main>

      {/* Enhanced Footer */}
      <footer className="py-10 text-center text-zinc-600 text-sm border-t border-zinc-900/50 hover:border-zinc-800/50 transition-all duration-300 bg-gradient-to-t from-zinc-950 to-transparent">
        <p className="hover:text-zinc-400 transition-colors duration-300">
          &copy; {new Date().getFullYear()} DarkBlog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
