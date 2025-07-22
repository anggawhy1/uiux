"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";

export default function Modal({ isOpen, closeModal, title, subtitle, img, description, ...props }) {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div
      onClick={closeModal}
      className="z-[100] fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-[20px] transition-all duration-300"
      {...props}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${isOpen ? "animate-fromTopAnimation" : "animate-toTopAnimation"} ${
          theme === "light" ? "bg-white text-black" : "bg-altSecondary text-white"
        } relative shadow-xl max-w-[600px] m-5 p-10 rounded-[10px] transition-all duration-300`}
      >
        {/* Close Button */}
        <MdClose
          onClick={closeModal}
          className="absolute top-0 right-0 m-5 cursor-pointer rounded-full border border-light text-[20px] text-red-500"
        />

        {/* Title */}
        <h3 className="text-[1.5em] font-bold mb-2">{title}</h3>

        {/* Image Preview (sekarang di atas icon) */}
        <Image
          src={img}
          height={350}
          width={550}
          alt="Modal Banner"
          className="w-full my-5 rounded-[10px]"
        />

        {/* Subtitle as tech icons */}
        {Array.isArray(subtitle) && (
          <div className="flex gap-3 mt-3 mb-4">
            {subtitle.map((iconPath, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#00B14F] transition-all duration-300"
              >
                <img
                  src={iconPath}
                  alt={`Tech Icon ${i}`}
                  className="w-5 h-5"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-[1em] font-normal">{description}</p>
      </div>
    </div>
  );
}
