import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? "FOUND" : "MISSING",
    DIRECT_URL: process.env.DIRECT_URL ? "FOUND" : "MISSING",
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "MISSING",
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "FOUND" : "MISSING",
  });
}