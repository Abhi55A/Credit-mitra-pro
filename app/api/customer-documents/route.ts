import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

async function uploadFile(
  file: File | null,
  folder: string
): Promise<string |null> {
  if (!file) return null;

  const fileName = `${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("documents")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const mobile = formData.get("mobile") as string;

    const aadhaar = formData.get("aadhaar") as File | null;
    const pan = formData.get("pan") as File | null;
    const salarySlip = formData.get("salarySlip") as File | null;
    const bankStatement = formData.get("bankStatement") as File | null;

    const aadhaarUrl = await uploadFile(aadhaar, mobile);
    const panUrl = await uploadFile(pan, mobile);
    const salarySlipUrl = await uploadFile(salarySlip, mobile);
    const bankStatementUrl = await uploadFile(bankStatement, mobile);

    const customer = await prisma.customer.findUnique({
      where: {
        mobile,
      },
      include: {
        applications: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        {
          status: 404,
        }
      );
    }

    if (customer.applications.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Loan application not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.loanApplication.update({
      where: {
        id: customer.applications[0].id,
      },
      data: {
        aadhaarUrl,
        panUrl,
        salarySlipUrl,
        bankStatementUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Documents uploaded successfully",
      data: {
        aadhaarUrl,
        panUrl,
        salarySlipUrl,
        bankStatementUrl,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}