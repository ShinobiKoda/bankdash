"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  faShoppingBag,
  faHelmetSafety,
  faShieldAlt,
  faMoneyBill,
  faMoneyBillTrendUp,
  faBriefcase,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BankServices() {
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
      title: "Debit and Credit cards",
      description: "Convenient payment solutions for your everyday needs.",
      icon: faUserAlt,
      iconBgColor: "#E7EDFF",
      iconColor: "#396AFF",
    },
    {
      title: "Life Insurance",
      description: "Comprehensive coverage to protect your loved ones.",
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

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="font-semibold text-xl text-[#333B69]">Bank Services List</h2>
      <div className="flex flex-col gap-6">
        {bankServices.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: bankServices[index].iconBgColor}}>
                <FontAwesomeIcon 
                  icon={bankServices[index].icon}
                  className="text-xl"
                  style={{color: bankServices[index].iconColor}}
                />
              </div>
              <p className="flex flex-col">
                <span>{service.title}</span>
                <span>{service.description}</span>
              </p>
            </div>
            <button className="py-2 px-8 rounded-3xl border-2 border-[#1814F3]">View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}
