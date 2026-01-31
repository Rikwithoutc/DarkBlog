import React, { useState } from "react";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Posts = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const [hoveredPostId, setHoveredPostId] = useState(null);

  const samplePosts = [
    {
      id: 1,
      author: "Admin",
      time: "1 day ago",
      content:
        "Welcome to the new dark-themed blog! This is the first post. Feel free to explore.",
    },
    {
      id: 2,
      author: "TechGuru",
      time: "5 hours ago",
      content:
        "Tailwind CSS makes styling so much faster. Loving the utility-first approach!",
    },
    {
      id: 3,
      author: "DesignDaily",
      time: "2 days ago",
      content:
        "Dark mode isn't just a trend; it's a necessity for eye strain reduction.",
    },
    {
      id: 4,
      author: "CodeNewbie",
      time: "3 hours ago",
      content:
        "Just finished my first React component. The state management feels like magic!",
    },
    {
      id: 5,
      author: "DevOps_Dan",
      time: "1 week ago",
      content:
        "Vercel deployment is seamless. High performance out of the box.",
    },
  ];

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <section className="bg-[#0a0a0a] py-16 px-4 md:px-8 min-h-screen animate-page-fade relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full animate-float"></div>
      <div
        className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/5 blur-[120px] rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <Navbar />
      <div className="max-w-3xl mx-auto pt-7 relative z-10">
        {/* Sign In Prompt Box */}
        <div
          className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/50 rounded-xl p-6 mb-12 text-center hover:border-purple-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-500 animate-fade-in-slow hover:scale-105"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="text-gray-400">
            <Link to="/sign-in">
              <span className="text-purple-400 font-medium cursor-pointer hover:text-purple-300 hover:underline transition-all duration-300 inline-block hover:scale-110">
                Sign in
              </span>
            </Link>{" "}
            to create a post and join the conversation.
          </p>
        </div>

        {/* Page Title */}
        <div className="mb-12 animate-slide-down">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Recent{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Posts
            </span>
          </h1>
          <p
            className="text-gray-400 text-lg animate-fade-in-slow"
            style={{ animationDelay: "0.2s" }}
          >
            Discover stories and insights from our community
          </p>
        </div>

        {/* Post List */}
        <div className="space-y-6">
          {samplePosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800/50 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-zinc-800/60 hover:to-zinc-900/60 hover:border-zinc-700 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:translate-y-[-6px] animate-slide-up-stagger group"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              onMouseEnter={() => setHoveredPostId(post.id)}
              onMouseLeave={() => setHoveredPostId(null)}
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4 relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden">
                  <span className="relative z-10">{post.author[0]}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                    {post.author}
                  </h4>
                  <p className="text-zinc-500 text-xs group-hover:text-zinc-400 transition-colors duration-300 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-zinc-500 rounded-full group-hover:bg-cyan-400 transition-colors duration-300"></span>
                    {post.time}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-100 transition-colors duration-300 text-sm md:text-base">
                {post.content}
              </p>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 group-hover:border-zinc-700/50 transition-all duration-300">
                <div className="flex items-center gap-8">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-pink-500 transition-all duration-300 text-sm group/btn hover:scale-125 relative"
                  >
                    <Heart
                      size={18}
                      className={`transition-all duration-300 ${likedPosts[post.id] ? "fill-pink-500 text-pink-500 scale-110 animate-heart-beat" : "group-hover:fill-pink-500"}`}
                    />
                    <span
                      className={`transition-all duration-300 ${likedPosts[post.id] ? "text-pink-500 font-semibold" : ""}`}
                    >
                      {likedPosts[post.id] ? "2" : "1"}
                    </span>
                    {likedPosts[post.id] && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-pink-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 animate-bounce">
                        ❤️
                      </span>
                    )}
                  </button>

                  {/* Comment Button */}
                  <button className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-all duration-300 text-sm group/comment hover:scale-125 relative">
                    <MessageSquare
                      size={18}
                      className="group-hover/comment:text-cyan-400 transition-all duration-300 group-hover/comment:rotate-12"
                    />
                    <span className="group-hover/comment:text-cyan-400 transition-colors duration-300">
                      Comment
                    </span>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-cyan-400 opacity-0 group-hover/comment:opacity-100 transition-opacity duration-300 animate-bounce">
                      💬
                    </span>
                  </button>
                </div>

                {/* Share Button */}
                <button className="text-zinc-500 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12 relative group/share">
                  <Share2 size={18} />
                  <span className="absolute -top-8 right-0 text-xs text-gray-300 opacity-0 group-hover/share:opacity-100 transition-opacity duration-300 animate-bounce whitespace-nowrap">
                    Share ✨
                  </span>
                </button>
              </div>

              {/* Post Index Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center text-xs text-zinc-400 group-hover:bg-purple-500/30 group-hover:text-purple-300 transition-all duration-300 opacity-0 group-hover:opacity-100">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div
          className="text-center mt-12 animate-fade-in-slow"
          style={{ animationDelay: "1s" }}
        >
          <button className="relative px-8 py-3 rounded-full font-semibold text-white border border-zinc-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden group">
            <span className="relative z-10 group-hover:text-cyan-300 transition-colors duration-300">
              Load More Posts
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes page-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up-stagger {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-slow {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heart-beat {
          0% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-page-fade {
          animation: page-fade 0.6s ease-in-out;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-slide-up-stagger {
          animation: slide-up-stagger 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-heart-beat {
          animation: heart-beat 0.6s ease-in-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Posts;
