"use client";

import React from "react";
import Credit_Card from "../Card";
import { motion } from "framer-motion";

export default function CardSection() {
  return (
    <section className="flex flex-col gap-3 w-full">
      <header className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-xl text-[#343C6A]">My cards</h3>
        <button className="hover:opacity-90 cursor-pointer text-[#343C6A]">
          See All
        </button>
      </header>
      <Credit_Card />
    </section>
  );
}
