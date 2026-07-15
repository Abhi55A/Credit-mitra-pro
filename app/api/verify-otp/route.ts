import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { mobile, otp } = await request.json();

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

    if (customer.otp !== otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        {
          status: 401,
        }
      );
    }

    if (
      customer.otpExpiry &&
      customer.otpExpiry < new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP Expired",
        },
        {
          status: 401,
        }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("customerMobile", mobile, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error(error);

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