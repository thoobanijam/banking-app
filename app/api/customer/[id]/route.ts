import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH: approve / block customer
export async function PATCH(req: Request, context: any) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing customer ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // update status
    const updated = await prisma.customer.update({
      where: { id },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    );
  }
}