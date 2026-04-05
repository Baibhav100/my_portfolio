import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "contact_submissions.xlsx");
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const newRow = {
      "Timestamp": timestamp,
      "Email": email,
      "Subject": subject,
      "Message": message,
    };

    let workbook;
    let worksheet;

    if (fs.existsSync(filePath)) {
      // Read existing file and append
      const fileBuffer = fs.readFileSync(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
      worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Get existing data as JSON, push new row, recreate sheet
      const existingData = XLSX.utils.sheet_to_json(worksheet);
      existingData.push(newRow);
      worksheet = XLSX.utils.json_to_sheet(existingData);

      // Style the header row with a wider column width
      worksheet["!cols"] = [
        { wch: 22 },  // Timestamp
        { wch: 30 },  // Email
        { wch: 30 },  // Subject
        { wch: 60 },  // Message
      ];

      workbook.Sheets[workbook.SheetNames[0]] = worksheet;
    } else {
      // Create new workbook
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([newRow]);

      worksheet["!cols"] = [
        { wch: 22 },
        { wch: 30 },
        { wch: 30 },
        { wch: 60 },
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    }

    // Write the file
    XLSX.writeFile(workbook, filePath);

    return NextResponse.json(
      { message: "Submission saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to save submission. Please try again." },
      { status: 500 }
    );
  }
}
