import React from "react";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners

export default function BarChartLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full my-8">
      <ClipLoader color="#4C49ED" size={50} />
      <p className="mt-4 text-[#343C6A] text-sm">Loading chart...</p>
    </div>
  );
}
