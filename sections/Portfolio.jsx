"use client";

import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
  Button,
  Modal,
} from "../components";
import { portfolioList } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { SectionWrapper } from "../wrapper";
import { fadeIn, staggerContainer } from "../utils/motion";
import { FaGithub } from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const categories = ["UI/UX", "Design Perancangan Sistem", "Website"];

const categoryDescriptions = {
  Website: "I created several website-based projects using modern frontend technologies.",
  "Design Perancangan Sistem": "These projects focus on system analysis, process design, and planning.",
  "UI/UX": "Design prototypes and user experiences I’ve crafted using tools like Figma.",
};

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Website");
  const [openModal, setOpenModal] = useState({ isOpen: false, selectedModal: null });
  const [selectedDesignFile, setSelectedDesignFile] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { theme } = useContext(ThemeContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("category");
    if (param) {
      const formatted = decodeURIComponent(param).toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      if (categories.includes(formatted)) {
        setActiveCategory(formatted);
      }
    }
  }, [searchParams]);

  const handleOpenModal = (index) => setOpenModal({ isOpen: true, selectedModal: index });
  const handleCloseModal = () => setOpenModal({ isOpen: false, selectedModal: null });

  const handleRenderModal = () => {
    const { isOpen, selectedModal } = openModal;
    if (selectedModal !== null && filteredList[selectedModal]) {
      const { title, subtitle, img, description } = filteredList[selectedModal];
      return (
        <Modal
          isOpen={isOpen}
          closeModal={handleCloseModal}
          title={title}
          subtitle={subtitle}
          img={img}
          description={description}
        />
      );
    }
    return null;
  };

  const filteredList = portfolioList.filter((item) => item.category === activeCategory);
  const isDesignCategory = activeCategory === "Design Perancangan Sistem";

  const truncateString = (string) => {
    const limit = 75;
    return string.length > limit ? string.slice(0, limit) + "..." : string;
  };

  const handleDesignClick = (file) => {
    setSelectedDesignFile(file);
  };

  const handleCloseDesignModal = () => {
    setSelectedDesignFile(null);
  };

  return (
    <section id="portfolio" className="pt-12 px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl mx-auto">
      <SectionTitle>Portfolio</SectionTitle>

      <motion.div
        variants={staggerContainer}
        viewport={{ once: true }}
        whileInView="show"
        initial="hidden"
        className="w-full"
      >
        <SectionSubtitle>Projects I Created</SectionSubtitle>
        <SectionDescription>{categoryDescriptions[activeCategory]}</SectionDescription>

        <div className="flex justify-center mt-8 mb-12 gap-8 border-b border-gray-300">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative pb-2 px-3 text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                ? "text-[#00B14F] after:scale-x-100"
                : "text-gray-500 hover:text-[#00B14F]"
                } after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#00B14F] after:transition-transform after:duration-300`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1.2)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredList.length > 0 ? (
              isDesignCategory ? (
                filteredList.slice(0, 3).map(({ img, title, file }, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-lg shadow-md border-2 transition duration-300 ${theme === "light"
                        ? "bg-white border-gray-200"
                        : "bg-[#1a202c] border-gray-700"
                      }`}
                    onClick={() => {
                      if (file) {
                        handleDesignClick(file); // hanya jika ada file
                      }
                    }}
                  >
                    {file ? (
                      // Gambar statis tanpa zoom
                      <img
                        src={img}
                        alt={`Design ${index}`}
                        className="w-full h-64 object-contain p-4 cursor-pointer"
                      />
                    ) : (
                      // Gambar langsung bisa zoom, tanpa modal atau klik fungsi
                      <Zoom>
                        <img
                          src={img}
                          alt={`Design ${index}`}
                          className="w-full h-64 object-contain p-4 cursor-zoom-in"
                        />
                      </Zoom>
                    )}
                    <div className="px-4 pb-4 text-center font-medium text-sm text-gray-600 dark:text-gray-300">
                      {title}
                    </div>
                  </div>
                ))
              ) : (
                filteredList.map(({ title, subtitle, img, description, github, live }, index) => (
                  <motion.div
                    key={`${activeCategory}-${index}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      duration: 0.7,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className={`${theme === "light"
                      ? "bg-white hover:border-[#00B14F] text-black"
                      : "bg-altSecondary hover:border-[#00B14F] text-white border-transparent"
                      } p-5 shadow-cardShadow flex flex-col gap-y-4 rounded-lg border-[1.5px] transition-all duration-300 group`}
                  >
                    <div
                      className="overflow-hidden rounded-xl h-[230px] border-[3px] relative group"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img
                        src={img}
                        alt="Portfolio Banner"
                        className="h-full w-full object-cover rounded-[9px] transition-all duration-300 group-hover:scale-105"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[#00B14F]/30 backdrop-blur-sm flex items-center justify-center rounded-[9px]"
                      >
                        {hoveredIndex === index && github && (
                          <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-[#00B14F] p-3 rounded-full shadow-lg hover:scale-110 transition"
                          >
                            <FaGithub size={28} />
                          </a>
                        )}
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <h3 className="font-semibold text-[1rem] sm:text-[1.1rem]">{title}</h3>
                      <div className="flex gap-2 flex-wrap">
                        {subtitle.map((iconPath, i) => (
                          <div
                            key={i}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-[#00B14F] transition-all"
                          >
                            <img src={iconPath} alt={`Icon ${i}`} className="w-5 h-5" />
                          </div>
                        ))}
                      </div>
                      <p className="text-[0.9em]">{truncateString(description)}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <Button
                        href="/"
                        onClick={() => handleOpenModal(index)}
                        type="primary"
                        size="small"
                        className="rounded-md font-medium"
                      >
                        View More
                      </Button>
                      {live && (
                        <Button
                          href={live}
                          target="_blank"
                          rel="noopener noreferrer"
                          type="outline-primary"
                          size="small"
                          className="rounded-md font-medium"
                        >
                          Live Preview
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))
              )
            ) : (
              <div className="col-span-full text-center text-gray-400">
                No project found in this category.
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {handleRenderModal()}

        {/* Modal for Design Preview (PDF) */}
        {selectedDesignFile && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 pt-[80px]"
            onClick={handleCloseDesignModal}
          >
            <div
              className="bg-white rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={selectedDesignFile}
                title="Design Preview"
                className="w-full h-[80vh] rounded-md border-none"
              ></iframe>
            </div>
          </div>
        )}

        <motion.div
          variants={fadeIn("up", "tween", 1.25, 0.5)}
          className="flex justify-center items-center w-full mt-10"
        >
          <Button
            href={
              isDesignCategory
                ? "/portfolio/all-design"
                : `/portfolio?category=${encodeURIComponent(activeCategory)}`
            }
            scroll={true}
            type="primary"
            size="normal"
            className="rounded-md shadow-lg"
          >
            View All {activeCategory} Projects
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SectionWrapper(Portfolio, "portfolio");
