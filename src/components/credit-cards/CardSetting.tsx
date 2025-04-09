"use client";
import React from "react";

import { FaLock, FaGoogle, FaAppStoreIos, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CardSetting() {
  const settings = [
    {
      name: "Block Card",
      description: "Instantly block your card",
      icon: <FaCreditCard className="text-[#FFBB38] text-xl" />,
      bgcolor: "#FFF5D9",
      tooltip: "Block Card",
    },
    {
      name: "Change Pin Code",
      description: "Choose another pin code",
      icon: <FaLock className="text-[#396AFF] text-xl" />,
      bgcolor: "#E7EDFF",
      tooltip: "Change Pin Code",
    },
    {
      name: "Add to Google Play",
      description: "Withdraw without any card",
      icon: <FaGoogle className="text-[#FF82AC] text-xl" />,
      bgcolor: "#FFE0",
      tooltip: "Google Play",
    },
    {
      name: "Add to Apple Play",
      description: "Withdraw without any card",
      icon: <FaAppStoreIos className="text-[#16DBCC] text-xl" />,
      bgcolor: "#DCFAF8",
      tooltip: "Apple Play",
    },
    {
      name: "Add to Apple Store",
      description: "Withdraw without any card",
      icon: <FaAppStoreIos className="text-[#16DBCC] text-xl" />,
      bgcolor: "#DCFAF8",
      tooltip: "Apple Store",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-xl text-[#343C6A]">Card Settings</h2>
      <div className="flex flex-col gap-6 shadow-lg rounded-xl p-8">
        {settings.map((setting, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  className="flex items-center gap-5 cursor-pointer hover:opacity-80 transition-opacity"
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
                    <span className="text-[#718EBF]">
                      {setting.description}
                    </span>
                  </p>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="bg-white shadow-lg rounded-lg p-4 text-black">
                <p>{setting.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </section>
  );
}
