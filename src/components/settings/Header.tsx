"use client";

import React, { useState } from "react";
import Profile from "./Profile";
import Preference from "./Preference";
import Security from "./Security";

export default function Header() {
  const tabs = ["Edit Profile", "Preference", "Security"];
  const [activeTab, setActiveTab] = useState("Edit Profile");

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
    <div>
      <div className="flex gap-4 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-black ${
              activeTab === tab ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
