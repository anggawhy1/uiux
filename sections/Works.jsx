"use client";

import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../components";
import { exprienceList } from "../constants/data";
import { SectionWrapper } from "../wrapper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";

function Works() {
  const { theme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Responsive logic
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    currentIndex >= exprienceList.length - itemsPerPage;

  const prevItem = () => {
    if (!isPrevDisabled) setCurrentIndex((prev) => prev - 1);
  };

  const nextItem = () => {
    if (!isNextDisabled) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section
      className={`pt-20 px-4 sm:px-sectionPadding transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0f172a]" : "bg-white"
      }`}
      id="works"
    >
      <div className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto">
        <SectionTitle>Experiences</SectionTitle>
        <SectionSubtitle>Work Experiences</SectionSubtitle>
        <SectionDescription>
          Here are some of my recent work experiences described in detail.
        </SectionDescription>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(exprienceList.length / itemsPerPage) * 100}%`,
              transform: `translateX(-${
                (100 / exprienceList.length) * currentIndex
              }%)`,
            }}
          >
            {exprienceList.map((item, index) => (
              <div
                key={item.work + index}
                className={`w-full md:w-1/2 p-4 transition-all duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <div
                  className={`rounded-xl shadow-xl p-6 border-t-4 border-[#00B14F] hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 ${
                    theme === "dark" ? "bg-[#1e293b]" : "bg-white"
                  }`}
                >
                  <h3 className="font-bold text-[1.3rem] mb-2">{item.work}</h3>

                  <div className="flex items-center flex-wrap gap-1 text-sm mb-3">
                    <span className="text-[#00B14F] font-medium">
                      {item.company}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-400">{item.time}</span>
                  </div>

                  {item.techStack && (
                    <div className="flex flex-wrap gap-3 mb-2">
                      {item.techStack.map((icon, i) => (
                        <img
                          key={i}
                          src={icon}
                          alt={`tech-${i}`}
                          className="w-6 h-6"
                        />
                      ))}
                    </div>
                  )}

                  {item.years && (
                    <p className="text-sm text-gray-400 mb-2">{item.years}</p>
                  )}

                  <p
                    className={`text-[0.95em] leading-relaxed ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 gap-4">
            <button
              onClick={prevItem}
              disabled={isPrevDisabled}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 shadow-md ${
                isPrevDisabled
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-[#00B14F] text-[#00B14F] hover:bg-[#00B14F] hover:text-white"
              }`}
            >
              <FiChevronLeft className="text-[1.5rem]" />
            </button>
            <button
              onClick={nextItem}
              disabled={isNextDisabled}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 shadow-md ${
                isNextDisabled
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-[#00B14F] text-[#00B14F] hover:bg-[#00B14F] hover:text-white"
              }`}
            >
              <FiChevronRight className="text-[1.5rem]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionWrapper(Works, "works");
