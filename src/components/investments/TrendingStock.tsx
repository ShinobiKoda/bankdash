"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/api";
import type { TrendingStock } from "@/types/types";

export default function TrendingStock() {
  const [trendingStock, setTrendingStock] = useState<TrendingStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTrendingStock = async () => {
    try {
      const user = await fetchUserData();
      setTrendingStock(user.trending_stock);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrendingStock();
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-semibold text-xl text-[#333B69]">Trending Stock</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-left border-collapse shadow-lg rouded-xl h-full">
          <thead>
            <tr >
              <th className="p-2">SL No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Return</th>
            </tr>
          </thead>
          <tbody>
            {trendingStock.map((stock) => (
              <tr key={stock.sl_no}>
                <td className="p-2">
                  {stock.sl_no.toString().padStart(2, "0")}.
                </td>
                <td className="p-2">{stock.name}</td>
                <td className="p-2">${stock.price}</td>
                <td
                  className={`p-2 ${
                    stock.return_type === "positive"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stock.return_type === "positive" ? "+" : "-"}
                  {stock.return_value}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
