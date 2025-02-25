import React from "react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="p-6 space-y-4">
          <li className="hover:text-gray-300" onClick={()=>setIsOpen(false)}>
            <Link href={"/dashboard/overview"}>Overview</Link>
          </li>
          <li className="hover:text-gray-300" onClick={()=>setIsOpen(false)}>
            <Link href={"/dashboard/transactions"}>Transactions</Link>
          </li>
        </ul>
      </aside>

      {/* Overlay (click outside to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
