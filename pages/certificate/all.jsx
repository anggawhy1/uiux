"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle, SectionSubtitle } from "../../components";
import { certificateList } from "../../constants/data";
import { ThemeContext } from "../../context/ThemeContext";
import { fadeIn, staggerContainer } from "../../utils/motion";

function AllCertificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleCertClick = (cert) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  return (
    <section
      className={`${theme === "light" ? "bg-[#fefefe]" : "bg-[#0e1b31]"
        } pt-36 pb-20 px-5 lg:px-16 transition-all duration-300`}
      id="certificate"
    >
      <SectionTitle>All Certificates</SectionTitle>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="xl:max-w-sectionWidth mx-auto"
      >
        <SectionSubtitle>List of All My Certificates</SectionSubtitle>

        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1.2)}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10"
        >
          {certificateList.map(({ title, img, file }, index) => (
            <div
              key={index}
              className={`cursor-pointer overflow-hidden rounded-lg shadow-md transition duration-300 border-2 ${theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-[#1a202c] border-gray-700"
                }`}
              onClick={() => handleCertClick({ title, file })}
            >
              <img
                src={img}
                alt={title}
                className="w-full h-64 object-contain p-4"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 pt-[80px]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={selectedCert.file}
              title={selectedCert.title}
              className="w-full h-[80vh] rounded-md border-none"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

export default AllCertificates;
