"use client";
import React, { useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

export default function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popoverRef.current) {
      popoverRef.current.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
    return () => {
      if (popoverRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        popoverRef.current.removeEventListener("click", (e) => {
          e.stopPropagation();
        });
      }
    };
  }, [popoverRef]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Izberi datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent ref={popoverRef} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
