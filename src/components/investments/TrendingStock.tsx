"use client"

import React from 'react'
import {useState, useEffect} from "react"
import { fetchUserData } from '@/lib/api'
import type { TrendingStock } from '@/types/types'

export default function TrendingStock() {
  const [trendingStock, setTrendingStock] = useState<TrendingStock[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getTrendingStock = async() => {
    try{
      const user = await fetchUserData();
      setTrendingStock(user.trending_stock);
    }catch(error){
      console.log("Error: ", error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getTrendingStock();
  });

  

  return (
    <section>
      
    </section>
  )
}
