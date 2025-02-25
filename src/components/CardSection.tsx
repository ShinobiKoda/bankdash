"use client";

import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

export default function CardSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-3"
    >
      <header className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">My cards</h3>
        <button className="hover:opacity-90 cursor-pointer">See All</button>
      </header>
      <Card />
    </motion.section>
  );
}
