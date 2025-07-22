"use client";

import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { contactCardList } from "../constants/data";
import { ThemeContext } from "../context/ThemeContext";
import { SectionWrapper } from "../wrapper";
import { fadeIn, staggerContainer } from "../utils/motion";

function Contact() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const { theme } = useContext(ThemeContext);
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully!",
          timer: 2500,
        });
        setNameInput("");
        setEmailInput("");
        setMessageInput("");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 2500,
        })
      );
  };

  const socialIcons = [
    { Icon: FaFacebook, name: "Facebook" },
    { Icon: FaInstagram, name: "Instagram" },
    { Icon: FaTiktok, name: "TikTok" },
    { Icon: FaGithub, name: "GitHub" },
    { Icon: FaLinkedin, name: "LinkedIn" },
    { Icon: FaTwitter, name: "Twitter" },
  ];

  return (
    <section className="pt-10 px-4 sm:px-sectionPadding pb-28" id="contact">
      {/* Title */}
      <div className="text-center mb-12">
        <motion.h2
          variants={fadeIn("down", "tween", 0.1, 1)}
          className={`text-3xl lg:text-4xl font-semibold ${
            theme === "light" ? "text-[#00B14F]" : "text-[#00B14F]"
          }`}
        >
          Feel Free To Contact Me <span>📧</span>
        </motion.h2>
        <motion.p
          variants={fadeIn("down", "tween", 0.2, 1)}
          className={`mt-4 text-lg ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          I'm always open to discussing projects, partnerships, or just chatting!
        </motion.p>
      </div>

      {/* Tab Section */}
      <div className="text-center mb-8">
        <div className="inline-flex gap-4">
          {["chat", "social"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-lg font-medium rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#00B14F] text-white shadow-lg"
                  : theme === "light"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {tab === "chat" ? "💬 Contact Me" : "🌐 Social Media"}
            </button>
          ))}
        </div>
      </div>

      {/* Container */}
      <motion.div
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.25 }}
        whileInView="show"
        initial="hidden"
        className="xl:max-w-[71.875rem] lg:max-w-[62.5rem] w-[90%] mx-auto flex lg:flex-row flex-col gap-12"
      >
        {/* Left Section */}
        <motion.div
          variants={fadeIn("left", "tween", 0.1, 1)}
          className="lg:w-[40%] w-full flex justify-center items-center"
        >
          <AnimatePresence mode="wait">
            {activeTab === "chat" ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 gap-6"
              >
                {contactCardList.map(({ ContactIcon, title, contact, href }, index) => (
                  <Link href={href} key={index} target="_blank">
                    <motion.div
                      className={`p-5 rounded-lg shadow-lg hover:shadow-xl border-t-4 border-[#00B14F] transition-all duration-300 ${
                        theme === "light" ? "bg-white" : "bg-gray-900"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <ContactIcon className="text-[#00B14F] text-3xl mb-3" />
                        <h4
                          className={`font-semibold text-lg ${
                            theme === "light" ? "text-gray-700" : "text-white"
                          }`}
                        >
                          {title}
                        </h4>
                        <p
                          className={`text-sm ${
                            theme === "light" ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          {contact}
                        </p>
                        <span className="text-[#00B14F] mt-3 font-medium">
                          Send Me A Message
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-[#00B14F] to-yellow-500 p-5 rounded-lg shadow-lg grid grid-cols-3 gap-6"
              >
                {socialIcons.map(({ Icon, name }, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="bg-white p-6 rounded-full shadow-md hover:scale-105 transition-all duration-300">
                      <Icon className="text-[#00B14F] text-4xl" />
                    </div>
                    <p className="text-sm text-white">{name}</p>
                  </motion.div>
                ))}
                <p className="mt-6 col-span-3 text-center text-white text-2xl font-bold">
                  Don't hesitate to connect! 🌟
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Section - Contact Form */}
        <motion.div
          variants={fadeIn("right", "tween", 0.1, 1)}
          className={`flex-1 p-8 rounded-lg shadow-lg relative ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <h3
            className={`text-2xl font-semibold mb-6 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Let's Start a Conversation
          </h3>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className={`p-4 w-full rounded-lg border-[2px] ${
                theme === "light"
                  ? "border-gray-300 text-gray-800 bg-white"
                  : "border-gray-600 text-white bg-gray-800"
              } focus:ring-2 focus:ring-[#00B14F] focus:outline-none`}
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className={`p-4 w-full rounded-lg border-[2px] ${
                theme === "light"
                  ? "border-gray-300 text-gray-800 bg-white"
                  : "border-gray-600 text-white bg-gray-800"
              } focus:ring-2 focus:ring-[#00B14F] focus:outline-none`}
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className={`p-4 w-full h-36 rounded-lg border-[2px] ${
                theme === "light"
                  ? "border-gray-300 text-gray-800 bg-white"
                  : "border-gray-600 text-white bg-gray-800"
              } focus:ring-2 focus:ring-[#00B14F] focus:outline-none`}
              name="message"
              placeholder="Your Message"
              required
            ></textarea>
            <button
              type="submit"
              className={`w-fit flex items-center gap-x-3 px-6 py-3 shadow-lg rounded-md border-[1.5px] font-medium transition-all duration-300 ${
                theme === "light"
                  ? "bg-[#00B14F] text-white hover:bg-transparent hover:text-[#00B14F] hover:border-[#00B14F]"
                  : "bg-[#00B14F] text-white hover:bg-transparent hover:text-[#00B14F] hover:border-[#00B14F]"
              }`}
            >
              Send Message <FaPaperPlane />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SectionWrapper(Contact, "contact");
