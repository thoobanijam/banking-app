import { NextResponse } from "next/server";

const ADMIN_PHONE = "0700000000";

const otpStore = globalThis.otpStore || new Map();
globalThis.otpStore = otpStore;

export async function POST(req: Request) {
  const { phone, otp } = await req.json();

  const savedOtp = otpStore.get(phone);

  console.log("Entered OTP:", otp);
  console.log("Saved OTP:", savedOtp);

  if (phone !== ADMIN_PHONE) {
    return NextResponse.json(
      { error: "Not admin" },
      { status: 403 }
    );
  }

  if (!savedOtp || savedOtp !== otp) {
    return NextResponse.json(
      { error: "Invalid OTP" },
      { status: 403 }
    );
  }

  otpStore.delete(phone);

  return NextResponse.json({
    user: {
      phone,
      role: "ADMIN",
    },
    token: "admin-token-123",
  });
}