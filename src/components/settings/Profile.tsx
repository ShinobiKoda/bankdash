"use client";

import Image from "next/image";
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const [profilePic, setProfilePic] = useState("/images/profile-pic.svg");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
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
    }
  ]

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex items-center justify-center">
        <div className="relative">
          <div className="w-[170px] h-[170px] rounded-full overflow-hidden ">
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={170}
              height={170}
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
      <form>
        <div className="flex flex-col gap-5">
          {formElements.map((element, index)=>(
            <div className="flex flex-col gap-2" key={index}>
            <label htmlFor={element.for} className="text-lg font-normal">
              {element.label}
            </label>
            <input
              type={element.type}
              id={element.id}
              placeholder={element.placeholder}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1814F3] focus:border-transparent"
            />
          </div>
          ))}
        </div>
        <button type="submit" className="py-3 w-full text-xl font-medium text-white bg-[#1814F3] my-5 rounded-xl border-none outline-none">Save</button>
      </form>
    </div>
  );
}
