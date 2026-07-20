import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customerCount = await prisma.customer.count();

    return NextResponse.json({
      success: true,
      database: "CONNECTED",
      customerCount,
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      database: "FAILED",
      error: error.message,
      stack: error.stack,
    });
  }
}