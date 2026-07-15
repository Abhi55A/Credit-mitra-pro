import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function POST(request: Request){

  try{

    const body = await request.json();


    const enquiry = await prisma.contactEnquiry.create({

      data:{
        name: body.name,
        mobile: body.mobile,
        loanType: body.loanType,
      }

    });


    return NextResponse.json({

      success:true,
      data:enquiry

    });


  }catch(error){

    console.log(error);


    return NextResponse.json({

      success:false,
      message:"Failed to submit enquiry"

    },
    {
      status:500
    });

  }

}




export async function GET(){

  try{


    const enquiries = await prisma.contactEnquiry.findMany({

      orderBy:{
        createdAt:"desc"
      }

    });


    return NextResponse.json({

      success:true,
      enquiries

    });


  }catch(error){


    console.log(error);


    return NextResponse.json({

      success:false,
      message:"Failed to fetch enquiries"

    },
    {
      status:500
    });


  }

}