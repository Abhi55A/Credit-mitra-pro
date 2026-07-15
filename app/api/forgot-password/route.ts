import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { mobile, password } = body;

    const customer = await prisma.customer.findUnique({
      where: {
        mobile,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.customer.update({
      where: {
        mobile,
      },
      data: {
        password,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}