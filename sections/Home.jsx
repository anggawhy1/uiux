"use client";

import Tabs from "../components/Tabs";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { BsArrowDownCircle, BsRocketTakeoff } from "react-icons/bs";
import { identity } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { SectionWrapper } from "../wrapper";
import { slideIn, staggerContainer, textVariants, zoomIn } from "../utils/motion";

function Home() {
  const { theme } = useContext(ThemeContext);
  const { name, division, description, picture } = identity;
  const [isHovered, setIsHovered] = useState(false);

  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className={`w-screen min-h-screen flex items-center pt-32 pb-24 relative transition-colors duration-300 
        ${isDark
          ? "bg-gradient-to-b from-[#0f172a] via-[#00B14F0f] to-[#0f172a]"
          : "bg-gradient-to-b from-white via-[#00B14F1a] to-white"
        } px-4 sm:px-8 md:px-sectionPadding`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        {/* Profile Image */}
        <motion.div
          variants={slideIn("left", "tween", 0.1, 1)}
          className="flex justify-center items-center"
        >
          <div
            className={`relative rounded-full overflow-hidden shadow-xl transition-all duration-300 
              ${isHovered ? "ring-0" : "ring-4 ring-green-500"}
              w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={picture[0]}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={picture[0]}
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          variants={slideIn("right", "tween", 0.1, 1)}
          className="text-center md:text-left space-y-6"
        >
          <motion.h2
            variants={textVariants(1.1)}
            className={`text-[16px] sm:text-[18px] font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            🚀 Let’s build something meaningful together!
          </motion.h2>

          <motion.h1
            variants={textVariants(1.2)}
            className="text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] font-bold leading-tight text-green-600"
          >
            {name}
          </motion.h1>

          <motion.h3
            variants={textVariants(1.3)}
            className={`text-lg sm:text-xl font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
          >
            <Typewriter
              options={{
                strings: division,
                autoStart: true,
                loop: true,
              }}
            />
          </motion.h3>

          <motion.p
            variants={textVariants(1.4)}
            className={`text-sm sm:text-md leading-relaxed max-w-lg mx-auto md:mx-0 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {description[0]}
          </motion.p>

          <motion.div variants={zoomIn(1.5, 0.75)}>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full text-white bg-green-600 hover:bg-green-700 shadow-md transition"
            >
              Get in Touch
              <BsRocketTakeoff className="text-lg" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down */}
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1.1)}
        initial="hidden"
        whileInView="show"
        className="absolute bottom-10 left-0 right-0 text-center"
      >
        <Link
          href="/#about"
          scroll={false}
          className={`inline-flex items-center gap-2 text-sm sm:text-md animate-bounce font-medium transition 
            ${isDark ? "text-white" : "text-green-600"}`}
        >
          Scroll to About
          <BsArrowDownCircle className="text-[20px]" />
        </Link>
      </motion.div>
    </section>
  );
}

export default SectionWrapper(Home, "home");
