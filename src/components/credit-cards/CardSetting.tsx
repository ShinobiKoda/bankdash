"use client"
import React from "react";

import { FaLock, FaGoogle, FaAppStoreIos, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CardSetting() {
  const settings = [
    {
      name: "Block Card",
      description: "Instantly block your card",
      icon: <FaCreditCard className="text-[#FFBB38] text-xl" />,
      bgcolor: "#FFF5D9",
    },
    {
      name: "Change Pin Code",
      description: "Choose another pin code",
      icon: <FaLock className="text-[#396AFF] text-xl" />,
      bgcolor: "#E7EDFF",
    },
    {
      name: "Add to Google Play",
      description: "Withdraw without any card",
      icon: <FaGoogle className="text-[#FF82AC] text-xl" />,
      bgcolor: "#FFE0",
    },
    {
      name: "Add to Apple Play",
      description: "Withdraw without any card",
      icon: <FaAppStoreIos className="text-[#16DBCC] text-xl" />,
      bgcolor: "#DCFAF8",
    },
    {
      name: "Add to Apple Store",
      description: "Withdraw without any card",
      icon: <FaAppStoreIos className="text-[#16DBCC] text-xl" />,
      bgcolor: "#DCFAF8",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-xl text-[#343C6A]">Card Settings</h2>
      <div className="flex flex-col gap-6">
        {settings.map((setting, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: settings[index].bgcolor }}
            >
              {setting.icon}
            </div>
            <p className="flex flex-col">
              <span className="font-medium text-lg">{setting.name}</span>
              <span className="text-[#718EBF]">{setting.description}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
