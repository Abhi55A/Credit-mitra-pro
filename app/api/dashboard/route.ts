import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


async function checkAdmin(request: Request){

  const cookie = request.headers.get("cookie");


  if(!cookie || !cookie.includes("admin=authenticated")){

    return false;

  }


  return true;

}



// GET Dashboard Data + Search
export async function GET(request: Request) {

  try {


    const isAdmin = await checkAdmin(request);


    if(!isAdmin){

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



    const { searchParams } = new URL(request.url);


    const search = searchParams.get("search") || "";



    const customers = await prisma.customer.findMany({

      where: search
        ? {

            OR:[

              {

                fullName:{
                  contains:search,
                  mode:"insensitive",
                },

              },


              {

                mobile:{
                  contains:search,
                },

              },


            ],

          }

        : undefined,



      include:{

        applications:true,

      },



      orderBy:{

        createdAt:"desc",

      },


    });



    const applications = customers.flatMap((customer)=>

      customer.applications.map((app)=>(

        {

          id:app.id,

          fullName:customer.fullName,

          mobile:customer.mobile,

          email:customer.email,

          city:customer.city,

          loanType:app.loanType,

          amount:app.amount,

          status:app.status,

          createdAt:app.createdAt,


          aadhaarUrl:app.aadhaarUrl,

          panUrl:app.panUrl,

          salarySlipUrl:app.salarySlipUrl,

          bankStatementUrl:app.bankStatementUrl,


        }

      ))

    );



    return NextResponse.json({

      total:applications.length,


      pending:applications.filter(
        (a)=>a.status==="Pending"
      ).length,


      approved:applications.filter(
        (a)=>a.status==="Approved"
      ).length,


      rejected:applications.filter(
        (a)=>a.status==="Rejected"
      ).length,


      applications,


    });



  }catch(error){


    console.error(error);


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





// UPDATE Loan Status

export async function PATCH(request:Request){

  try{


    const isAdmin = await checkAdmin(request);


    if(!isAdmin){

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



    const body = await request.json();



    const application = await prisma.loanApplication.update({

      where:{
        id:body.id,
      },


      data:{

        status:body.status,

      },


    });



    return NextResponse.json({

      success:true,

      data:application,

    });



  }catch(error){


    console.error(error);


    return NextResponse.json(

      {
        success:false,
        message:"Update Failed"
      },

      {
        status:500
      }

    );


  }

}







// DELETE Loan Application

export async function DELETE(request:Request){

  try{


    const isAdmin = await checkAdmin(request);


    if(!isAdmin){

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



    const body = await request.json();



    await prisma.loanApplication.delete({

      where:{
        id:body.id,
      },

    });



    return NextResponse.json({

      success:true,

      message:"Application Deleted",

    });



  }catch(error){


    console.error(error);



    return NextResponse.json(

      {
        success:false,
        message:"Delete Failed"
      },

      {
        status:500
      }

    );


  }

}