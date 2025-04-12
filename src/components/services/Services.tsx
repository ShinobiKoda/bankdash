"use client";

import React from "react";
import {
  faShoppingBag,
  faHelmetSafety,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Services() {
  const services = [
    {
      title: "Life Insurance",
      description: "Unlimited Protection",
      icon: faHelmetSafety,
      iconBgColor: "#E7EDFF",
      iconColor: "#396AFF",
    },
    {
      title: "Shopping",
      description: "Buy, Think, Grow",
      icon: faShoppingBag,
      iconBgColor: "#FFF5D9",
      iconColor: "#FFBB38",
    },
    {
      title: "Safety",
      description: "We are your allies",
      icon: faShieldAlt,
      iconBgColor: "#DCFAF8",
      iconColor: "#16DBCC",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[320px] lg:max-w-full md:max-w-full cursor-grab hover:cursor-grabbing "
    >
      <CarouselContent>
        {services.map((service, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 -ml-8">
            <motion.div
              className="flex items-center gap-4 px-8 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: services[index].iconBgColor }}
              >
                <FontAwesomeIcon
                  icon={services[index].icon}
                  style={{ color: services[index].iconColor }}
                  className="text-lg"
                />
              </div>
              <p className="flex flex-col">
                <span className="font-lg font-semibold">{service.title}</span>
                <span className="text-[#718EBF] font-normal">
                  {service.description}
                </span>
              </p>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
