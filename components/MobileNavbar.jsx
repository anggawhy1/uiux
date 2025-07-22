"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { linkList } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function MobileNavbar({ handleMobileNavClose, isMobileNavOpen }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const bgColor = theme === "light" ? "bg-white" : "bg-[#1a202c]";
  const textColor = theme === "light" ? "text-black" : "text-white";
  const hoverColor = theme === "light" ? "hover:text-[#00B14F]" : "hover:text-[#00B14F]";

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex justify-center items-center"
        >
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative ${bgColor} w-[85%] max-w-[500px] mx-auto rounded-2xl p-10 shadow-2xl flex flex-col items-center gap-8`}
          >
            {/* Close Button */}
            <button
              onClick={handleMobileNavClose}
              className="absolute top-4 right-4 p-2 rounded-full border text-red-500 hover:bg-red-100 transition"
            >
              <IoClose size={24} />
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col items-center gap-6">
              {linkList.map(({ title, href }, index) => (
                <Link
                  href={`/#${href}`}
                  key={index}
                  scroll={false}
                  onClick={handleMobileNavClose}
                  className={`text-lg font-semibold ${textColor} ${hoverColor} transition`}
                >
                  {title}
                </Link>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`mt-4 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-md ${textColor}`}
            >
              {theme === "light" ? <BsMoonFill size={18} /> : <BsSunFill size={18} />}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
