"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard/Overview");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image 
        src={"/images/error 404-img.svg"}
        alt="404 Error"
        width={700}
        height={700}
      />
      <h1 className="text-2xl font-semibold text-[#565872]">OOPS! PAGE NOT FOUND</h1>
      <button
        onClick={handleRedirect}
        className="mt-6 px-6 py-3 bg-[#FB8133] text-white rounded-3xl hover:opacity-80 cursor-pointer"
      >
        BACK TO HOME
      </button>
    </div>
  );
}
