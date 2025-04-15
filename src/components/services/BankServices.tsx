"use client";

import React, { useState } from "react";
import {
  faShieldAlt,
  faMoneyBill,
  faMoneyBillTrendUp,
  faBriefcase,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { motion } from "framer-motion"; // Import Framer Motion

export default function BankServices() {
  const [activeButton, setActiveButton] = useState<number | null>(2); // Default active button is the third one (index 2)

  const handleButtonClick = (index: number) => {
    setActiveButton(index); // Update the active button state
  };

  const bankServices = [
    {
      title: "Business Loans",
      description: "Flexible loan options to help grow your business.",
      icon: faMoneyBill,
      iconBgColor: "#FFE0EB",
      iconColor: "#FF82AC",
    },
    {
      title: "Checking accounts",
      description: "Manage your daily transactions with ease.",
      icon: faBriefcase,
      iconBgColor: "#FFF5D9",
      iconColor: "#FFBB38",
    },
    {
      title: "Savings account",
      description: "Secure your future with high-interest savings accounts.",
      icon: faMoneyBillTrendUp,
      iconBgColor: "#FFE0EB",
      iconColor: "#FF82AC",
    },
    {
      title: "Debit, Credit cards",
      description: "Convenient payment solutions for your everyday needs.",
      icon: faUserAlt,
      iconBgColor: "#E7EDFF",
      iconColor: "#396AFF",
    },
    {
      title: "Life Insurance",
      description: "Protect your loved ones.",
      icon: faShieldAlt,
      iconBgColor: "#DCFAF8",
      iconColor: "#16DBCC",
    },
    {
      title: "Business Loans",
      description: "Flexible loan options to help grow your business.",
      icon: faMoneyBill,
      iconBgColor: "#FFE0EB",
      iconColor: "#FF82AC",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation for children
        ease: "easeInOut", // Smooth easing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    }, // Smooth easing
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.6 },
    }, // Smooth easing
  };

  return (
    <TooltipProvider>
      <section className="w-full flex flex-col gap-4 my-4">
        <motion.h2
          className="font-semibold text-xl text-[#333B69]"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Bank Services List
        </motion.h2>
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bankServices.map((service, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: bankServices[index].iconBgColor }}
                >
                  <FontAwesomeIcon
                    icon={bankServices[index].icon}
                    className="text-xl"
                    style={{ color: bankServices[index].iconColor }}
                  />
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex flex-col w-[127px]">
                      <span className="font-medium truncate">
                        {service.title}
                      </span>
                      <span className="md:whitespace-normal md:overflow-visible md:text-clip whitespace-nowrap overflow-hidden text-ellipsis text-[#718EBF] lg:truncate">
                        {service.description.split(" ").slice(0, 2).join(" ")}
                        ...
                      </span>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{service.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="hidden lg:flex flex-col text-center">
                <span className="font-medium">Lorem Ipsum</span>
                <span className="text-[#718EBF]">Many Publishing</span>
              </p>
              <p className="hidden lg:flex flex-col text-center">
                <span className="font-medium">Lorem Ipsum</span>
                <span className="text-[#718EBF]">Many Publishing</span>
              </p>
              <p className="hidden lg:flex flex-col text-center">
                <span className="font-medium">Lorem Ipsum</span>
                <span className="text-[#718EBF]">Many Publishing</span>
              </p>
              <button
                onClick={() => handleButtonClick(index)} // Add click handler
                className={`font-medium cursor-pointer lg:px-8 lg:py-2 lg:rounded-3xl lg:border-2 ${
                  activeButton === index
                    ? "text-[#1814F3] lg:border lg:border-[#1814F3]"
                    : "text-[#718EBF] lg:border lg:border-[#718EBF]"
                }`}
              >
                View Details
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </TooltipProvider>
  );
}
