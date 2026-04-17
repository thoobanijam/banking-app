import { NextResponse } from "next/server";
import { processTransaction } from "@/lib/transactionEng";

export async function POST(req: Request) {
  const { customerId, amount } = await req.json();

  try {
    const result = processTransaction(customerId, amount);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}