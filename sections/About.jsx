"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { identity } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { SectionTitle, Button } from "../components";
import { SectionWrapper } from "../wrapper";
import { fadeIn, staggerContainer } from "../utils/motion";
import { BsDownload } from "react-icons/bs";

function About() {
  const { theme } = useContext(ThemeContext);
  const { name, region, description, picture, CV } = identity;

  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className={`relative w-full px-4 sm:px-10 lg:px-20 xl:px-32 py-20 overflow-hidden transition-colors duration-300 ${isDark
          ? "bg-gradient-to-b from-[#0f172a] via-[#00B14F0f] to-[#0f172a]"
          : "bg-gradient-to-b from-white via-[#00B14F1a] to-white"
        }`}
    >
      {/* Background Emoji & Tag */}
      <div className="absolute hidden xl:block top-[8%] right-[4%] text-9xl font-extrabold text-green-100 opacity-10 z-0 pointer-events-none">
        💻
      </div>
      <div className="absolute hidden xl:block bottom-[10%] right-[5%] text-7xl font-bold text-green-200 opacity-10 rotate-12 z-0">
        #DetailOriented
      </div>

      {/* Section Title */}
      <SectionTitle>Get to Know Me</SectionTitle>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10"
      >
        {/* Left - Image & Tags */}
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="relative flex flex-col items-center gap-4"
        >
          <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] rounded-3xl overflow-hidden border-4 border-green-500 shadow-xl">
            <img
              src={picture[1]}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Tag - Mobile Responsive */}
          <div className="block md:absolute md:top-[-1rem] md:left-[-2rem] bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-xl shadow">
            #UI/UX
          </div>

          {/* Mini Tags */}
          <div className="flex gap-3 mt-2 flex-wrap justify-center">
            <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full shadow-sm">
              #UIDesigner
            </span>
            <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full shadow-sm">
              #UXThinking
            </span>
            <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full shadow-sm">
              #UserCentered
            </span>
          </div>

          {/* Download Button */}
          <motion.div
            variants={fadeIn("up", "tween", 0.5, 1)}
            className="mt-4"
          >
            <Button
              href={CV}
              type="solid-primary"
              size="normal"
              download
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl shadow w-fit"
            >
              Download CV <BsDownload className="text-lg" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right - Text Content */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 1)}
          className="flex flex-col justify-center"
        >
          {/* Headline */}
          <h2
            className={`text-3xl font-extrabold mb-2 text-center md:text-left ${isDark ? "text-white" : "text-gray-900"
              }`}
          >
            Hi,👋 I’m <span className="text-green-600">{name}</span>
          </h2>

          {/* Region */}
          <p
            className={`text-sm md:text-base font-medium text-center md:text-left mb-3 ${isDark ? "text-gray-300" : "text-gray-700"
              }`}
          >
            Passionate about{" "}
            <span className="text-green-500">user-centered design, clean interfaces,</span>{" "}
            and solving real problems through the web — based in{" "}
            <span className="text-green-500">{region} 🌏</span>
          </p>

          {/* Description + Tag */}
          <div className="relative">
            <p
              className={`text-base md:text-lg leading-relaxed text-center md:text-left ${isDark ? "text-gray-300" : "text-gray-600"
                }`}
            >
              {description[1]}
            </p>

            <span className="absolute hidden lg:block top-[-1.5rem] right-[-3rem] bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full shadow-md animate-bounce whitespace-nowrap">
              🚀 Always Improving
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SectionWrapper(About, "about");
