"use client";

import Image from "next/image";
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@/hooks/use-toast";

type FormKeys =
  | "name"
  | "user-name"
  | "email"
  | "password"
  | "dob"
  | "present-address"
  | "permanent-address"
  | "city"
  | "postal-code"
  | "country";

export default function Profile() {
  const { toast } = useToast();

  const [profilePic, setProfilePic] = useState("/images/profile-pic.svg");
  const [formData, setFormData] = useState<Record<FormKeys, string>>({
    name: "",
    "user-name": "",
    email: "",
    password: "",
    dob: "",
    "present-address": "",
    "permanent-address": "",
    city: "",
    "postal-code": "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FormKeys, string>>>({});

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Clear error for the field
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<FormKeys, string>> = {};

    // Validate all fields
    (Object.keys(formData) as FormKeys[]).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Clear form and errors
      setFormData({
        name: "",
        "user-name": "",
        email: "",
        password: "",
        dob: "",
        "present-address": "",
        "permanent-address": "",
        city: "",
        "postal-code": "",
        country: "",
      });
      setErrors({});

      // Show success toast
      toast({
        title: "Success",
        description: "Your profile has been saved successfully.",
        variant: "default", // Ensure this matches the supported variants in your toast configuration
        duration: 3000,
      });
    }
  };

  const formElements = [
    {
      label: "Name",
      type: "text",
      placeholder: "Charelene Reed",
      id: "name",
      for: "name",
    },
    {
      label: "User Name",
      type: "text",
      placeholder: "Charelene Reed",
      id: "user-name",
      for: "user-name",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "charelenereed@gmail.com",
      id: "email",
      for: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "**********",
      id: "password",
      for: "password",
    },
    {
      label: "Date of Birth",
      type: "date",
      placeholder: "25 January 1990",
      id: "dob",
      for: "dob",
    },
    {
      label: "Present Address",
      type: "text",
      placeholder: "San Jose, California, USA",
      id: "present-address",
      for: "present-address",
    },
    {
      label: "Permanent Address",
      type: "text",
      placeholder: "San Jose, California, USA",
      id: "permanent-address",
      for: "permanent-address",
    },
    {
      label: "City",
      type: "text",
      placeholder: "San Jose",
      id: "city",
      for: "city",
    },
    {
      label: "Postal Code",
      type: "text",
      placeholder: "95131",
      id: "postal-code",
      for: "postal-code",
    },
    {
      label: "Country",
      type: "text",
      placeholder: "United States",
      id: "country",
      for: "country",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_4fr] lg:mt-[4rem]">
      <div className="w-full flex items-center justify-center lg:items-start lg:justify-start lg:flex-1">
        <div className="relative">
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden ">
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={200}
              height={200}
              className=""
            />
          </div>
          <div className="w-12 h-12 rounded-full bg-[#1814F3] absolute bottom-0 right-0 flex items-center justify-center z-20 cursor-pointer hover:opacity-80">
            <label htmlFor="profile-pic-input" className="cursor-pointer">
              <FontAwesomeIcon icon={faEdit} className="text-white" />
            </label>
            <input
              id="profile-pic-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
          {formElements.map((element, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <label htmlFor={element.for} className="text-lg font-normal">
                {element.label}
              </label>
              <input
                type={element.type}
                id={element.id}
                placeholder={element.placeholder}
                value={formData[element.id as FormKeys]}
                onChange={handleInputChange}
                className={`border ${
                  errors[element.id as FormKeys]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-3 focus:outline-none focus:ring-2 ${
                  errors[element.id as FormKeys]
                    ? "focus:ring-red-500"
                    : "focus:ring-[#1814F3]"
                } focus:border-transparent`}
              />
              {errors[element.id as FormKeys] && (
                <span className="text-red-500 text-sm">
                  {errors[element.id as FormKeys]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex lg:items-end lg:justify-end">
          <button
            type="submit"
            className="py-3 lg:w-[190px] w-full text-xl font-medium text-white bg-[#1814F3] my-5 rounded-xl border-none outline-none hover:opacity-90 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
