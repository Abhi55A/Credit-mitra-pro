import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {

  try {


    const cookie = request.headers.get("cookie");


    if(!cookie || !cookie.includes("customer=")){

      return NextResponse.json(
        {
          success:false,
          message:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    const customerId = cookie
    .split("customer=")[1]
    ?.split(";")[0];



    if(!customerId){

      return NextResponse.json(
        {
          success:false,
          message:"Customer session missing"
        },
        {
          status:401
        }
      );

    }





    const customer = await prisma.customer.findUnique({

      where:{
        id:customerId,
      },


      include:{
        applications:true,
      },


    });





    if(!customer){


      return NextResponse.json(
        {
          success:false,
          message:"Customer not found"
        },
        {
          status:404
        }
      );


    }







    const applications = customer.applications;



    const pending = applications.filter(

      (item)=>item.status==="Pending"

    ).length;



    const approved = applications.filter(

      (item)=>item.status==="Approved"

    ).length;



    const rejected = applications.filter(

      (item)=>item.status==="Rejected"

    ).length;







    return NextResponse.json({

      success:true,

      customer:customer.fullName,

      pending,

      approved,

      rejected,

      applications,

    });






  }catch(error){


    console.log(error);



    return NextResponse.json(

      {
        success:false,
        message:"Server Error"
      },

      {
        status:500
      }

    );


  }


}