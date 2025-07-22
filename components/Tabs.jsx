// components/Tabs.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Tabs = ({ items = [], active, setActive }) => {
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  return (
    <div className="relative flex gap-2 flex-wrap justify-center mb-6">
      {items.map(({ id, label, icon }) => (
        <button
          key={id}
          ref={(el) => (tabRefs.current[id] = el)}
          onClick={() => setActive(id)}
          className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
            active === id
              ? "text-green-600"
              : "text-gray-600 dark:text-white hover:text-green-500"
          }`}
        >
          <span className="text-lg">{icon}</span>
          {label}
        </button>
      ))}

      <motion.div
        layout
        className="absolute bottom-0 h-[3px] bg-green-500 rounded-full transition-all duration-300"
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
      />
    </div>
  );
};

export default Tabs;
