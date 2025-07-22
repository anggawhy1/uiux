"use client";

import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Modal, SectionDescription, SectionSubtitle } from "../../components";
import { portfolioList } from "../../constants/data";
import { ThemeContext } from "../../context/ThemeContext";
import { SectionWrapper } from "../../wrapper";

function PortfolioPage() {
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    selectedModal: null,
  });
  const [filteredList, setFilteredList] = useState([]);
  const searchParams = useSearchParams();
  const { theme } = useContext(ThemeContext);

  // Ambil parameter category dari query string
  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (categoryParam) {
      const formatted = decodeURIComponent(categoryParam)
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const result = portfolioList.filter(
        (item) => item.category === formatted
      );
      setFilteredList(result);
    } else {
      // fallback jika tidak ada kategori, tampilkan semua
      setFilteredList(portfolioList);
    }
  }, [searchParams]);

  const handleOpenModal = (index) =>
    setOpenModal({ isOpen: true, selectedModal: index });

  const handleCloseModal = () =>
    setOpenModal({ isOpen: false, selectedModal: null });

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
  };

  const truncateString = (string) => {
    const stringLimit = 75;
    return string.length > stringLimit ? string.slice(0, stringLimit) + "..." : string;
  };

  return (
    <section className={`${theme === "light" ? "bg-[#fefefe]" : "bg-[#0e1b31]"} p-sectionPadding pb-32 transition-all duration-300`}>
      <div className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto mt-10 overflow-x-hidden">
        {/* Portfolio Page Subtitle & Description */}
        <SectionSubtitle>All Portfolio</SectionSubtitle>
        <SectionDescription>
          {{
            "Website": "These are the websites I've built using modern frontend technologies.",
            "Design Perancangan Sistem": "These projects showcase system analysis, flowcharts, and process designs.",
            "UI/UX": "These are UI/UX designs I’ve crafted using design tools like Figma.",
          }[filteredList[0]?.category || "Website"]}
        </SectionDescription>


        {/* Portfolio Page Container */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:w-full w-[80%] lg:mx-0 mx-auto gap-10 mt-16 ">
          {filteredList.map(({ title, subtitle, img, description, live }, index) => (
            <div
              key={index}
              className={`${theme === "light"
                ? "bg-white hover:border-[#00B14F] text-black"
                : "bg-altSecondary hover:border-[#00B14F] text-white border-transparent"
                } p-5 shadow-cardShadow flex flex-col gap-y-4 rounded-lg border-[1.5px] transition-all duration-300 group`}
            >
              <div className={`${theme === "light" ? "" : "border-altLight"} overflow-hidden rounded-xl h-[250px] border-[3px]`}>
                <img
                  src={img}
                  alt="Portfolio Banner"
                  className="h-full w-full object-cover rounded-[9px] transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <h3 className="font-semibold xl:text-[1.2em] lg:text-[1.1em] text-[1em]">{title}</h3>

                <div className="flex gap-3">
                  {Array.isArray(subtitle) &&
                    subtitle.map((iconPath, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#00B14F] transition-all duration-300"
                      >
                        <img src={iconPath} alt={`Icon ${i}`} className="w-4 h-4" />
                      </div>
                    ))}
                </div>

                <p className="font-normal text-[0.9em]">{truncateString(description)}</p>
              </div>
              <div className="flex items-center gap-x-5 xl:max-w-[85%] w-full mt-4">
                <Button
                  href={"/portfolio"}
                  onClick={() => handleOpenModal(index)}
                  type="primary"
                  size="small"
                  className="rounded-md text-center font-medium tracking-wide"
                >
                  View More
                </Button>
                <Button
                  href={live ?? "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  type="outline-primary"
                  size="small"
                  className="rounded-md font-medium text-center"
                >
                  Live Preview
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Modal Render */}
        <React.Fragment>{handleRenderModal()}</React.Fragment>

        {/* Back To Main Page Button */}
        <div className="flex justify-center items-center w-full mt-10">
          <Button
            href={"/#portfolio"}
            scroll={true}
            type="primary"
            size="normal"
            className="rounded-md shadow-lg"
          >
            Back To Main Page
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SectionWrapper(PortfolioPage, "portfolio");
