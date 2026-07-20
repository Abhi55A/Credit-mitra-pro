import { NextResponse } from "next/server";

export async function GET() {
  const db = process.env.DATABASE_URL || "";

  return NextResponse.json({
    startsWithPostgres: db.startsWith("postgresql://"),
    startsWithPostgresShort: db.startsWith("postgres://"),
    length: db.length,
    first20: db.substring(0, 20),
    last20: db.substring(Math.max(0, db.length - 20)),
  });
}