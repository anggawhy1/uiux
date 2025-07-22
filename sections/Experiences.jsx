"use client";

import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCodeSlash, BsTools } from "react-icons/bs";
import { SectionTitle, SectionSubtitle } from "../components";
import { skillsList, toolsList } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { SectionWrapper } from "../wrapper";
import { fadeIn, staggerContainer, textVariants } from "../utils/motion";

function Experiences() {
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <section
      className={`pt-0 pb-20 w-screen px-4 sm:px-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0f172a]" : "bg-white"
      }`}
      id="experiences"
    >
      <motion.div
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.25 }}
        initial="hidden"
        whileInView="show"
        className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto flex flex-col gap-y-1"
      >
        {/* Section Title */}
        <SectionTitle>What I Use</SectionTitle>

        <motion.div
          variants={fadeIn("right", "tween", 0, 1)}
          className="grid lg:grid-cols-[65%_30%] grid-cols-1 gap-y-16 lg:gap-[5%]"
        >
          {/* Main Content (Tab + Grid) */}
          <div
            className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
              theme === "light" ? "bg-white text-black" : "bg-altSecondary text-white"
            }`}
          >
            {/* Tab Buttons */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {[
                { id: "skills", label: "Tech Stack", icon: <BsCodeSlash /> },
                { id: "tools", label: "Tools & Software", icon: <BsTools /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm shadow-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-green-500 text-white shadow-md scale-[1.03]"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="text-[1.2rem]">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Skills or Tools Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-8 place-items-center"
              >
                {(activeTab === "skills" ? skillsList : toolsList).map(
                  ({ SkillIcon, title, level }, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col justify-center items-center gap-y-4 group cursor-pointer"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        delay: index * 0.07,
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <div
                        className={`${
                          theme === "light"
                            ? "bg-white/80"
                            : "bg-altSecondary/30"
                        } p-6 shadow-md w-fit rounded-full transition-all duration-300 group-hover:-translate-y-2`}
                      >
                        <SkillIcon className="text-[5rem]" />
                      </div>

                      <div className="flex flex-col gap-y-2 text-center">
                        <h3 className="font-semibold lg:text-[1.1em] text-[1em]">
                          {title}
                        </h3>
                        <h4
                          className={`${
                            theme === "light" ? "text-light" : "text-altLight"
                          } font-normal`}
                        >
                          {level}
                        </h4>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Deskripsi Kanan */}
          <motion.div
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="flex flex-col justify-center items-center lg:items-end text-center lg:text-right"
          >
            <SectionSubtitle>My Daily Arsenal 🧰</SectionSubtitle>
            <motion.p
              variants={textVariants(1.3)}
              className={`font-normal text-[0.95rem] md:text-base leading-relaxed ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              } max-w-full lg:max-w-[350px]`}
            >
              These are the essential tools I use to build effective web interfaces, test features, and document systems in collaborative projects.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SectionWrapper(Experiences, "experiences");
