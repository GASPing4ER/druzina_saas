"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BarChartComponent } from "@/components";
import { StatisticsData } from "@/types";
import { getReportData } from "@/actions/statistics";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/actions/auth";

const StatistikaPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<StatisticsData | null>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Track loading state
  const router = useRouter(); // ✅ Use router for navigation

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUser();
        setUser(userResponse);
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setLoading(false); // ✅ Ensure loading state updates
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchStatisticsData = async () => {
      if (startDate && endDate) {
        const { data } = await getReportData({ startDate, endDate });
        setData(data);
      }
    };
    fetchStatisticsData();
  }, [startDate, endDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user?.user_metadata?.role !== "superadmin") {
    console.warn("🚫 User is not superadmin, redirecting...");
    router.push("/unauthorized");
    return null;
  }

  const handleExport = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/export-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to export report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-4">
        {/* Start Date Picker */}
        <div>
          <p>Start Date:</p>
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                {startDate ? format(startDate, "PPP") : "Select Start Date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date Picker */}
        <div>
          <p>End Date:</p>
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                {endDate ? format(endDate, "PPP") : "Select End Date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={
                  (date) => (startDate ? date < startDate : false) // Ensure end date is after start date
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex gap-10">
        {data?.projectData && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="uppercase">Število ur na projektih</h2>
            <BarChartComponent data={data.projectData} x_axis="project_name" />
          </div>
        )}
        {data?.userData && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="uppercase">Število ur na zaposlenega</h2>
            <BarChartComponent data={data.userData} x_axis="user_name" />
          </div>
        )}
      </div>

      {/* Export Button */}
      {startDate && endDate && (
        <Button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleExport}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Exporting..." : "Export Report to Excel"}
        </Button>
      )}
    </div>
  );
};

export default StatistikaPage;
