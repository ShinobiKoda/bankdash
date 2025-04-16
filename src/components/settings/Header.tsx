"use client";

import React, { useState, useEffect, useRef } from "react";
import Profile from "./Profile";
import Preference from "./Preference";
import Security from "./Security";

export default function Header() {
  const tabs = ["Edit Profile", "Preference", "Security"];
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]); // Explicitly typed

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabRefs.current[activeIndex];
    if (activeTabElement) {
      setIndicatorStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Edit Profile":
        return <Profile />;
      case "Preference":
        return <Preference />;
      case "Security":
        return <Security />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between mb-5 border-b">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => {
              tabRefs.current[index] = el; // Assign without returning
            }}
            onClick={() => setActiveTab(tab)}
            className={`relative z-10 py-2 font-medium ${
              activeTab === tab ? "text-[#1814F3]" : "text-[#718EBF]"
            }`}
          >
            {tab}
          </button>
        ))}
        <div
          className="absolute bottom-0 h-[2px] bg-[#1814F3] transition-all duration-300"
          style={indicatorStyle}
        />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
