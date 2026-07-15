import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get Customer Profile
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
          message: "Customer not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      customer,
    });

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

// Update Customer Profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const customer = await prisma.customer.update({
      where: {
        mobile: body.mobile,
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        city: body.city,
        address: body.address,
        state: body.state,
        pincode: body.pincode,
        occupation: body.occupation,
        income: body.income ? Number(body.income) : null,
      },
    });

    return NextResponse.json({
      success: true,
      customer,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Profile Update Failed",
      },
      {
        status: 500,
      }
    );
  }
}