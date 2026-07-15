import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    const body = await request.json();


    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;


    if (
      body.email === adminEmail &&
      body.password === adminPassword
    ) {


      const response = NextResponse.json({

        success: true,
        message: "Login Successful",

      });


      response.cookies.set("admin", "authenticated", {

        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,

      });


      return response;


    }


    return NextResponse.json(
      {
        success:false,
        message:"Invalid Email or Password"
      },
      {
        status:401
      }
    );


  } catch(error) {


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