import { NextResponse } from "next/server";
type OTPStore = Map<string, string>;

declare global {
  // eslint-disable-next-line no-var
  var otpStore: OTPStore | undefined;
}
const ADMIN_PHONE = "0700000000";

// temporary in-memory store
const otpStore = globalThis.otpStore || new Map();
globalThis.otpStore = otpStore;

export async function POST(req: Request) {
  const { phone } = await req.json();

  console.log("Incoming phone:", phone);
  console.log("Admin phone:", ADMIN_PHONE);

  if (phone !== ADMIN_PHONE) {
    return NextResponse.json(
      { error: "Not authorized admin" },
      { status: 403 }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(phone, otp);

  console.log("OTP for admin:", otp);

  return NextResponse.json({
    message: "OTP sent",
  });
}