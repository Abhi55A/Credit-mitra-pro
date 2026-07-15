import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

  const customers = await prisma.customer.findMany({
    include: {
      applications: true,
    },
  });


  return NextResponse.json(customers);

}



export async function POST(request: Request) {

  try {

    const body = await request.json();


    let customer = await prisma.customer.findUnique({
      where: {
        mobile: body.mobile,
      },
    });



    if (!customer) {

      customer = await prisma.customer.create({

        data: {

          fullName: body.fullName,
          mobile: body.mobile,
          email: body.email || null,
          city: body.city || null,

        },

      });

    }



    const application = await prisma.loanApplication.create({

      data: {

        loanType: body.loanType,
        amount: Number(body.amount),

        customerId: customer.id,

      },

    });



    return NextResponse.json({

      success: true,

      message: "Loan Application Submitted Successfully",

      data: application,

    });



  } catch (error) {


    console.error(error);


    return NextResponse.json(

      {

        success: false,

        message: "Something went wrong",

      },

      {
        status: 500,
      }

    );


  }

}