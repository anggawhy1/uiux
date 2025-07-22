"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { portfolioList } from "../../constants/data";
import { ThemeContext } from "../../context/ThemeContext";
import { fadeIn, staggerContainer } from "../../utils/motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function AllDesignPage() {
  const { theme } = useContext(ThemeContext);
  const [selectedDesignFile, setSelectedDesignFile] = useState(null);

  const designList = portfolioList.filter(
    (item) => item.category === "Design Perancangan Sistem"
  );

  const handleOpenPdf = (file) => {
    setSelectedDesignFile(file);
  };

  const handleClosePdf = () => {
    setSelectedDesignFile(null);
  };

  return (
    <section className="pt-36 pb-20 px-5 lg:px-16">
      <h2 className="text-2xl font-bold text-center text-[#00B14F] mb-2">
        All Portfolio
      </h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto"
      >
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-8">
          These projects showcase system analysis, flowcharts, and process designs.
        </p>

        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8"
        >
          {designList.map(({ img, title, file }, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-lg shadow-md border-2 transition duration-300 ${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-[#1a202c] border-gray-700"
              }`}
              onClick={() => {
                if (file) {
                  handleOpenPdf(file);
                }
              }}
            >
              {file ? (
                <img
                  src={img}
                  alt={`Design ${index}`}
                  className="w-full h-64 object-contain p-4 cursor-pointer"
                />
              ) : (
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
          ))}
        </motion.div>

        {/* Modal PDF */}
        {selectedDesignFile && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 pt-[80px]"
            onClick={handleClosePdf}
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
      </motion.div>
    </section>
  );
}

export default AllDesignPage;
