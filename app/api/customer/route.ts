import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET (SECURED)
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    // 🔐 safer token extraction
    const token = authHeader?.split(" ")[1];

    if (!token || token !== "admin-token-123") {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

// ✅ POST (CREATE CUSTOMER)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        phone: body.phone,
        aadhaar: body.aadhaar,
        gender: body.gender,
        nationality: body.nationality,
        dob: body.dob,
        branch: body.branch,
        accountNumber:
          "AC" + Math.floor(100000 + Math.random() * 900000),
        ifsc: "BANK001",
        status: "PENDING",
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}