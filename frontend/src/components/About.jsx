import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const glowPulse = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const About = () => {
  return (
    <section
      id="about"
      className="py-24 px-8 md:px-24 bg-[#0a0a0a] text-gray-300 relative overflow-hidden"
    >
      {/* Background Accent */}
      <motion.div
        variants={glowPulse}
        animate="animate"
        className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -z-10"
      />

      <motion.div
        className="max-w-4xl"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Title */}
        <motion.h2
          variants={itemUp}
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          About DarkBlog
        </motion.h2>

        {/* Intro */}
        <motion.div className="space-y-6 text-lg leading-relaxed">
          <motion.p variants={itemUp}>
            <span className="text-white font-semibold">
              Welcome to DarkBlog,
            </span>{" "}
            a sanctuary for ideas and stories. We believe that content shines
            brightest against a dark canvas. Our platform is designed to be
            distraction-free, allowing your words to take center stage.
          </motion.p>

          <motion.p variants={itemUp}>
            Whether you're a developer sharing snippets, a poet weaving verses,
            or a storyteller recounting adventures, DarkBlog provides the perfect
            atmosphere for your expression.
          </motion.p>
        </motion.div>

        {/* Mission */}
        <motion.div variants={itemUp} className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            Our Mission
          </h3>
          <p className="text-lg leading-relaxed">
            To create a community where unauthorized users can explore freely,
            and authorized users can engage deeply. We prioritize privacy,
            simplicity, and performance.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
