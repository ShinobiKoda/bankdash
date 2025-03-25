"use client";

import React, { useState } from "react";
import Credit_Card from "../Card";
import type { CreditCard } from "@/types/types";

export default function AddCard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newCard, setNewCard] = useState<CreditCard | null>(null);

  const handleAddCard = (card: CreditCard): void => {
    setNewCard(card);
    setIsModalOpen(false);
  };

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-xl text-[#343C6A]">My cards</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:opacity-90 cursor-pointer text-[#343C6A] flex items-center gap-2 font-semibold"
        >
          <span>+</span>
          <span>Add Card</span>
        </button>
      </header>
      <Credit_Card newCard={newCard} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const card: CreditCard = {
                  name: formData.get("name") as string,
                  number: formData.get("number") as string,
                  balance: parseFloat(formData.get("balance") as string),
                  valid_thru: formData.get("valid_thru") as string,
                  bank: formData.get("bank") as string, // Added bank property
                };
                handleAddCard(card);
              }}
            >
              <div className="flex flex-col gap-3">
                <input
                  name="name"
                  placeholder="Card Holder Name"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="number"
                  placeholder="Card Number"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="balance"
                  type="number"
                  placeholder="Balance"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="valid_thru"
                  type="text"
                  placeholder="Valid Thru (MM/YY)"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="bank"
                  placeholder="Bank Name"
                  className="border p-2 rounded"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
