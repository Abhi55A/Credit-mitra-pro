import { NextResponse } from "next/server";

export async function GET(){

  const response = NextResponse.json({
    success:true,
    message:"Logout Successful"
  });


  response.cookies.set("admin","",{
    httpOnly:true,
    expires:new Date(0),
    path:"/"
  });


  return response;

}