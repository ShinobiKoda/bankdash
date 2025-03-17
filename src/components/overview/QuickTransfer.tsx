
import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function QuickTransfer() {

  const transfer_recipients = [
    {
      image: "/images/transfer-pic1.svg",
      name: "Livia Bator",
      postion: "CEO"
    },
    {
      image: "/images/transfer-pic2.svg",
      name: "Randy Press",
      postion: "Director"
    },
    {
      image: "/images/transfer-pic3.svg",
      name: "Workman",
      postion: "Designer"
    },
    {
      image: "/images/transfer-pic3.svg",
      name: "Workman",
      postion: "Designer"
    },
    {
      image: "/images/transfer-pic3.svg",
      name: "Workman",
      postion: "Designer"
    },
  ]



  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm mb-[30rem]"
    >
      <CarouselContent>
        {transfer_recipients.map((recepient, index)=>(
          <CarouselItem key={index} className='basis-1/3'>
            <div key={index}>
            <img src={recepient.image} alt="" />
            <p>{recepient.name}</p>
            <p>{recepient.postion}</p>
          </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
