import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { mobile } = await request.json();

    const customer = await prisma.customer.findUnique({
      where: {
        mobile,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number not registered",
        },
        {
          status: 404,
        }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.customer.update({
      where: {
        mobile,
      },
      data: {
        otp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      otp: otp,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );

  }
}