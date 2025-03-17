import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function QuickTransfer() {
  const transfer_recipients = [
    {
      image: "/images/transfer-pic1.svg",
      name: "Livia Bator",
      postion: "CEO",
    },
    {
      image: "/images/transfer-pic2.svg",
      name: "Randy Press",
      postion: "Director",
    },
    {
      image: "/images/transfer-pic3.svg",
      name: "Workman",
      postion: "Designer",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg text-[#DDDDDD]">Quick Transfer</h2>
      <div className="flex justify-between items-center">
        {transfer_recipients.map((recepient, index) => (
          <div key={index} className="flex flex-col gap-2 text-center items-center">
            <Image
              src={recepient.image}
              alt="Recepient profile-pic"
              height={40}
              width={40}
            />
            <p className="flex flex-col">
              <span className="text-base">{recepient.name}</span>
              <span className="text-[#718EBF]">{recepient.postion}</span>
            </p>
          </div>
        ))}
        <div className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 cursor-pointer">
          <ArrowRight className="h-[13px] w-[18px]"/>
        </div>
      </div>
    </div>
  );
}
