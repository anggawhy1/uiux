"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MdOutlineSchool } from "react-icons/md";
import { AiFillTrophy } from "react-icons/ai";
import { SectionTitle, SectionSubtitle } from "../components";
import { educationList, awardList } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { SectionWrapper } from "../wrapper";
import { fadeIn, textVariants, staggerContainer } from "../utils/motion";

function Services() {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="pt-12 px-4 sm:px-sectionPadding" id="services">
      {/* Section Title */}
      <SectionTitle>Educations</SectionTitle>

      {/* Section Container */}
      <motion.div
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.25 }}
        whileInView="show"
        initial="hidden"
        className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto pt-0"
      >
        {/* Educations & Awards Section */}
        <motion.div
          variants={fadeIn("left", "tween", 0.1, 1.1)}
          className="grid lg:grid-cols-[25%_65%] grid-cols-1 lg:gap-[10%] gap-10"
        >
          {/* Subtitle and Description */}
          <div className="flex flex-col justify-center items-center order-1 lg:text-start text-center">
            <SectionSubtitle>Educations 📘 & Awards 🌟</SectionSubtitle>
            <motion.p
              variants={textVariants(1.2)}
              className={`${theme === "light" ? "text-black" : "text-white"} font-normal lg:max-w-[750px] md:max-w-[650px] md:text-[1em] text-[0.9em]`}
            >
              There are some formal education & awards that I've reached below.
            </motion.p>
          </div>

          {/* Educations & Awards Content */}
          <div
            className={`${theme === "light"
              ? "bg-white text-black"
              : "bg-altSecondary text-white"
              } shadow-cardShadow p-6 sm:p-10 grid lg:grid-cols-2 grid-cols-1 gap-8 rounded-lg w-full mx-auto order-2`}
          >
            {/* Educations */}
            <div className="flex flex-col gap-y-6 relative">
              <motion.h3
                variants={fadeIn("right", "tween", 0.2, 0.5)}
                className={`bg-[#00B14F] font-medium text-white px-4 py-2 w-fit rounded-md flex items-center gap-x-2`}
              >
                <MdOutlineSchool /> Educations
              </motion.h3>
              {/* Garis dinamis sesuai konten */}
              <div
                className="absolute left-[6px] top-[70px] w-[4px] bg-[#FFC107]"
                style={{
                  height: `${(educationList.length - 1) * 130}px`,
                }}
              ></div>
              {educationList.map(({ years, school, competence }, index) => (
                <motion.div
                  variants={fadeIn("down", "tween", index * 0.2, 1.1)}
                  key={index}
                  className="flex flex-col gap-y-2 pb-2 relative pl-10"
                >
                  <div className="absolute left-[-4px] top-[6px] w-5 h-5 bg-[#FFC107] rounded-full border-[4px] border-white shadow-md" />
                  <h3 className="font-semibold text-[1em]">{school}</h3>
                  <h4 className="font-medium text-[0.9em]">{competence}</h4>
                  <span className={`${theme === "light" ? "text-light" : "text-altLight"} font-normal`}>
                    {years}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Awards */}
            <div className="flex flex-col gap-y-6 relative">
              <motion.h3
                variants={fadeIn("right", "tween", 0.2, 0.5)}
                className={`bg-[#00B14F] font-medium text-white px-4 py-2 w-fit rounded-md flex items-center gap-x-2`}
              >
                <AiFillTrophy /> Awards
              </motion.h3>
              {/* Garis dinamis sesuai konten */}
              <div
                className="absolute left-[6px] top-[70px] w-[4px] bg-[#FFC107]"
                style={{
                  height: `${(awardList.length - 1) * 130}px`,
                }}
              ></div>
              {awardList.map(({ years, award, place }, index) => (
                <motion.div
                  variants={fadeIn("down", "tween", index * 0.2, 1.2)}
                  key={index}
                  className="flex flex-col gap-y-2 pb-2 relative pl-10"
                >
                  <div className="absolute left-[-4px] top-[6px] w-5 h-5 bg-[#FFC107] rounded-full border-[4px] border-white shadow-md" />
                  <h3 className="font-semibold text-[1em]">{award}</h3>
                  <h4 className="font-medium text-[0.9em]">{place}</h4>
                  <span className={`${theme === "light" ? "text-light" : "text-altLight"} font-normal`}>
                    {years}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SectionWrapper(Services, "services");
