"use client";

import React, { useState } from "react";
import { DatePicker } from "./DatePicker";

export default function AddNewCard() {
  const [formData, setFormData] = useState({
    cardType: "",
    name: "",
    cardNumber: "",
    expirationDate: "",
  });
  const [errors, setErrors] = useState({
    cardType: false,
    name: false,
    cardNumber: false,
    expirationDate: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({
      cardType: false,
      name: false,
      cardNumber: false,
      expirationDate: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      cardType: !formData.cardType,
      name: !formData.name,
      cardNumber: !formData.cardNumber,
      expirationDate: !formData.expirationDate,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Form submitted successfully:", formData);
      // Add further submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold text-xl text-[#343C6A]">Add New Card</h2>
      <div className="flex flex-col gap-5">
        <p className="text-[#718EBF] leading-8 max-w-[700px]">
          Credit Card generally means a plastic card issued by Scheduled
          Commercial Banks assigned to a Cardholder, with a credit limit, that
          can be used to purchase goods and services on credit or obtain cash
          advances.
        </p>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="card-type" className="text-lg">
              Card Type
            </label>
            <input
              type="text"
              id="card-type"
              name="cardType"
              placeholder="Classic"
              value={formData.cardType}
              onChange={handleInputChange}
              className="p-5 rounded-2xl border border-[#DFEAF2] text-md outline-none"
            />
            {errors.cardType && (
              <span className="text-red-500 text-sm">
                Card Type is required
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="My Cards"
              value={formData.name}
              onChange={handleInputChange}
              className="p-5 rounded-2xl border border-[#DFEAF2] text-md outline-none"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                Name on Card is required
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="card-number" className="text-lg">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              placeholder="**** **** ****"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="p-5 rounded-2xl border border-[#DFEAF2] text-md outline-none"
            />
            {errors.cardNumber && (
              <span className="text-red-500 text-sm">
                Card Number is required
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="expiration-date" className="text-lg">
              Expiration Date
              </label>
            <DatePicker />
            {errors.expirationDate && (
              <span className="text-red-500 text-sm">
                Expiration Date is required
              </span>
            )}
          </div>
        </div>
        <div className="w-full text-left">
          <button
            type="submit"
            className="py-3 px-8 text-lg rounded-lg bg-[#1814F3] outline-none border-none text-white font-medium cursor-pointer hover:opacity-90"
          >
            Add Card
          </button>
        </div>
      </div>
    </form>
  );
}
