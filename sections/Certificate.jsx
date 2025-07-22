"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle, SectionSubtitle, Button } from "../components";
import { certificateList } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { SectionWrapper } from "../wrapper";
import { fadeIn, staggerContainer } from "../utils/motion";

function Certificate() {
  const [selectedCert, setSelectedCert] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleCertClick = (cert) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  return (
    <section className="pt-10 px-4 sm:px-sectionPadding" id="certificate">
      <SectionTitle>Certificate</SectionTitle>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto"
      >
        <SectionSubtitle>My Certificates</SectionSubtitle>

        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1.2)}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full px-2 sm:px-0 gap-10 mt-10"
        >
          {certificateList.slice(0, 3).map(({ title, img, file }, index) => (
            <div
              key={index}
              className={`cursor-pointer overflow-hidden rounded-lg shadow-md transition duration-300 border-2 ${
                theme === "light"
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

        <div className="flex justify-center items-center w-full mt-10">
          <Button
            href="/certificate/all"
            scroll={true}
            type="primary"
            size="normal"
            className="rounded-md shadow-lg"
          >
            View All Certificates
          </Button>
        </div>
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

export default SectionWrapper(Certificate, "certificate");
