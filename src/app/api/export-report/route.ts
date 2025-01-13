// api/export-report.ts
import { exportReportToExcel } from "@/actions/excel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { startDate, endDate } = await request.json(); // Extracting startDate and endDate from the request body

    // Generate the Excel file
    const excelBuffer = await exportReportToExcel({ startDate, endDate });

    // Return the Excel file as a downloadable response
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=report.xlsx",
      },
    });
  } catch (error) {
    console.error("Error in export API route:", error);
    return new NextResponse("Error exporting report", { status: 500 });
  }
}
