import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const admin = request.headers.get("cookie");

    if (!admin || !admin.includes("admin=true")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file selected",
        },
        {
          status: 400,
        }
      );
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "File size must be less than 5MB",
        },
        {
          status: 400,
        }
      );
    }

    // Allowed types
    const allowed = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF, JPG, PNG allowed",
        },
        {
          status: 400,
        }
      );
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    const { error } = await supabase.storage
      .from("documents")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      console.error("SUPABASE UPLOAD ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
          error,
        },
        {
          status: 500,
        }
      );
    }

    const { data } = supabase.storage
      .from("documents")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: data.publicUrl,
    });

  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Upload failed",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}