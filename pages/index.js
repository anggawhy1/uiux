import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Home, About, Experiences, Works, Services, Portfolio, Certificate, GetInTouch,  Contact } from "../sections";

export default function MainPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <React.Fragment>
      <main className={`${theme === "light" ? "bg-[#fefefe] light" : "bg-[#0e1b31] dark"} overflow-x-hidden transition-all duration-300`}>
        <Home />
        <About />
        <Experiences />
        <Services />
        <Works />
        <Portfolio />
        <Certificate />
        <GetInTouch />
        {/* <Article /> */}
        <Contact />
      </main>
    </React.Fragment>
  );
}
