"use client"

import React from 'react'
import type { Transfer } from '@/types/types'
import {useState, useEffect} from 'react';
import { fetchUserData } from '@/lib/api';


import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export default function BankTransfer() {

  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const getUserTransfers = async() => {
    try{
      const user = await fetchUserData();
      setTransfers(user.money_transfers)
    }catch(error){
      console.log("Error fetching transfers", error);
      return[]
    }
  }

  useEffect(()=>{
    getUserTransfers();
  }, [])

  return (
    <div>
      
    </div>
  )
}
