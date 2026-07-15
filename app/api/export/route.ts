import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.loanApplication.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const excelData = applications.map((item) => ({
      Name: item.customer.fullName,
      Mobile: item.customer.mobile,
      Email: item.customer.email || "",
      City: item.customer.city || "",
      Income: item.customer.income || "",
      CIBIL: item.customer.cibil || "",
      Loan_Type: item.loanType,
      Amount: item.amount,
      Status: item.status,
      Apply_Date: item.createdAt.toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Loan Applications"
    );

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        "Content-Disposition":
          'attachment; filename="CreditMitra_Loan_Applications.xlsx"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Export failed",
      },
      {
        status: 500,
      }
    );
  }
}