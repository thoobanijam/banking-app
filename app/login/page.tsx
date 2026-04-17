'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const ADMIN_PHONE = "0700000000";
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: ADMIN_PHONE }),
    });

    alert("OTP sent!");
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: ADMIN_PHONE, otp }),
    });

    if (!res.ok) {
      alert("Invalid OTP");
      return;
    }

    localStorage.setItem(
      "auth",
      JSON.stringify({
        role: "STAFF",
        phone: ADMIN_PHONE,
        token: "admin-token-123",
      })
    );

    router.push("/stafflogin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f766e]
    px-4 sm:px-6 lg:px-8 ">

      {/* CARD */}
      <div className="
        w-full 
        max-w-xl sm:max-w-lg md:max-w-lg 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        shadow-2xl 
        rounded-2xl 
        p-6 sm:p-8 
        text-white
      ">

        {/* HEADER */}
        <div className="text-center mb-6 ">
          <div className="text-3xl sm:text-4xl mb-2">🏦</div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Admin Secure Login
          </h1>

          <p className="text-white/60 text-xs sm:text-sm mt-1">
            OTP verification required for staff access
          </p>
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <label className="text-xs sm:text-sm text-white/70">
            Registered Phone
          </label>

          <input
            value={ADMIN_PHONE}
            readOnly
            className="mt-1 w-full p-2.5 sm:p-3 
            rounded-lg bg-white/10 border border-white/20 
            text-white outline-none text-sm sm:text-base"
          />
        </div>

        {/* SEND OTP */}
        <button
          onClick={sendOtp}
          className="w-full py-2.5 sm:py-3 
          rounded-lg font-semibold 
          bg-gradient-to-r from-blue-500 to-cyan-400 
          hover:scale-[1.02] transition transform shadow-lg
          text-sm sm:text-base"
        >
          Send OTP
        </button>

        {/* OTP INPUT */}
        <div className="mt-5">
          <label className="text-xs sm:text-sm text-white/70">
            Enter OTP
          </label>

          <input
            className="mt-1 w-full p-2.5 sm:p-3 
            rounded-lg bg-white/10 border border-white/20 
            text-white placeholder-white/40 outline-none 
            focus:ring-2 focus:ring-cyan-400
            text-sm sm:text-base"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={verifyOtp}
          className="mt-5 w-full py-2.5 sm:py-3 
          rounded-lg font-semibold 
          bg-gradient-to-r from-green-500 to-emerald-400 
          hover:scale-[1.02] transition transform shadow-lg
          text-sm sm:text-base"
        >
          Verify & Login
        </button>

        {/* FOOTER */}
        <p className="text-center text-[10px] sm:text-xs text-white/50 mt-6">
          🔐 Secure banking authentication system
        </p>
      </div>
    </div>
  );
}