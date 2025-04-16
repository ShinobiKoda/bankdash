"use client";

import React, { useState } from "react";

export default function Preference() {
  const [digitalCurrencyToggle, setDigitalCurrencyToggle] = useState(false);
  const [merchantOrderToggle, setMerchantOrderToggle] = useState(false);
  const [recommendationsToggle, setRecommendationsToggle] = useState(false);

  return (
    <div className="w-full">
      <form className="flex flex-col gap-5 lg:flex-row justify-between">
        <div className="flex flex-col gap-2 lg:flex-1">
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            placeholder="USD"
            id="currency"
            name="currency"
            className="p-3 rounded-lg border border-[#DFEAF2]"
          />
        </div>
        <div className="flex flex-col gap-2 lg:flex-1">
          <label htmlFor="time-zone">Time Zone</label>
          <input
            type="text"
            placeholder="GMT+0"
            id="time-zone"
            name="time-zone"
            className="p-3 rounded-lg border border-[#DFEAF2]"
          />
        </div>
      </form>
      <div className="mt-5 flex flex-col gap-4">
        <label className="flex items-center gap-3">
          <div
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
              digitalCurrencyToggle ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => setDigitalCurrencyToggle(!digitalCurrencyToggle)}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                digitalCurrencyToggle ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span>I send or receive digital currency</span>
        </label>
        <label className="flex items-center gap-3">
          <div
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
              merchantOrderToggle ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => setMerchantOrderToggle(!merchantOrderToggle)}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                merchantOrderToggle ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span>I receive merchant order</span>
        </label>
        <label className="flex items-center gap-3 lg:items-start">
          <div
            className={`min-w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
              recommendationsToggle ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => setRecommendationsToggle(!recommendationsToggle)}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                recommendationsToggle ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="lg:mt-1">
            There are recommendations for my account
          </span>
        </label>
      </div>
    </div>
  );
}
