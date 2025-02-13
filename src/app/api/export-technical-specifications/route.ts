// api/export-technical-specifications.ts
import { exportTechnicalSpecificationsToExcel } from "@/actions/excel";
import { TechnicalSpecificationsToExcelProps } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const requestBody: TechnicalSpecificationsToExcelProps =
      await request.json();

    // Generate the Excel file
    const excelBuffer = await exportTechnicalSpecificationsToExcel(requestBody);

    // Return the Excel file as a downloadable response
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          "attachment; filename=technical_specifications.xlsx",
      },
    });
  } catch (error) {
    console.error("Error in export API route:", error);
    return new NextResponse("Error exporting report", { status: 500 });
  }
}
