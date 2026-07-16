import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? "FOUND" : "NOT FOUND",
    DIRECT_URL: process.env.DIRECT_URL ? "FOUND" : "NOT FOUND",
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "NOT FOUND",
  });
}