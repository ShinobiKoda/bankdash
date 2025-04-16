"use client";

import React from "react";
import { useState } from "react";

export default function Security() {
  const [twoFactor, setTwoFactor] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5 w-full">
      <h3>Two factor authentitaction</h3>
      <div className="flex items-center gap-3 lg:items-start">
        <div
          className={`min-w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
            twoFactor ? "bg-green-500" : "bg-gray-300"
          }`}
          onClick={() => setTwoFactor(!twoFactor)}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
              twoFactor ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
        <span className="lg:mt-1">Enable Two Factor Authentication</span>
      </div>
      <div>
        <h3 className="mb-4">Change Password</h3>
        <form action="" className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2 max-w-[510px]">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              placeholder="********"
              className="p-3 border border-[#DFEAF2] rounded-lg outline-none"
            />
          </div>
          <div className="w-full flex flex-col gap-2 max-w-[510px]">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="********"
              className="p-3 border border-[#DFEAF2] rounded-lg outline-none"
            />
          </div>
          <div className="w-full flex lg:items-end lg:justify-end">
          <button
            type="submit"
            className="py-3 w-full lg:w-[190px] hover:opacity-90 cursor-pointer text-xl font-medium text-white bg-[#1814F3] my-5 rounded-xl border-none outline-none"
          >
            Save
          </button>
        </div>
        </form>
        <p></p>
      </div>
    </div>
  );
}
