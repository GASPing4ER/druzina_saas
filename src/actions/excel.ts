"use server";
import * as XLSX from "xlsx";
import { getReportData } from "./statistics";
import { TechnicalSpecificationsToExcelProps } from "@/types";

// Export report function
export const exportReportToExcel = async ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}): Promise<Buffer> => {
  try {
    // Call the RPC function for project hours with startDate and endDate
    const { data } = await getReportData({ startDate, endDate });

    // Create sheets for each dataset
    if (data?.projectData && data.userData) {
      const projectSheet = XLSX.utils.json_to_sheet(data.projectData);
      const userSheet = XLSX.utils.json_to_sheet(data.userData);

      // Create a new workbook and append the sheets
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, projectSheet, "Projects");
      XLSX.utils.book_append_sheet(workbook, userSheet, "Users");

      // Generate the Excel file as a buffer
      const excelBuffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });

      return excelBuffer;
    } else {
      throw new Error("Error generating Excel report");
    }
  } catch (error) {
    console.error("Error generating Excel report:", error);
    throw new Error("Error generating Excel report");
  }
};

export const exportTechnicalSpecificationsToExcel = async (
  technicalSpecifications: TechnicalSpecificationsToExcelProps
): Promise<Buffer> => {
  try {
    // Convert data into a suitable format for Excel
    const formattedData = [
      {
        Format: technicalSpecifications.format || "",
        Obseg: technicalSpecifications.obseg || "",
        Material: technicalSpecifications.material || "",
        Tisk: technicalSpecifications.tisk || "",
        Vezava: technicalSpecifications.vezava || "",
        Pakiranje: technicalSpecifications.pakiranje || "",
        Naklada: technicalSpecifications.naklada || "",
      },
    ];
    // Create an Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tehnične specifikacije");

    // Generate the Excel file as a buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return excelBuffer;
  } catch (error) {
    console.error("Error generating Excel report:", error);
    throw new Error("Error generating Excel report");
  }
};
