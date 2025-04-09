"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  onDateChange?: (date: Date | undefined) => void; // Update type to match Calendar's expectations
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined); // Use Date | undefined

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate); // Invoke callback
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-5 rounded-2xl border border-[#DFEAF2] text-md outline-none flex items-center gap-4">
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date} // Use updated state
          onSelect={handleDateSelect} // Use updated handler
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
