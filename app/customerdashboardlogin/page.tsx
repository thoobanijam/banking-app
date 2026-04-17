'use client';

import React, { useState, useEffect } from "react";
import { ensureBankDB, getAllCustomers } from "@/lib/bankDB";
import { useRouter } from "next/navigation";
import { initBankDB } from "@/lib/bankDB";

type Customer = {
  id: string;
  name: string;
  phone: string;
  accountNumber: string;
  ifsc: string;
  status: "APPROVED" | "BLOCKED";
};

export default function Page() {
  const router=useRouter()
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    account: "",
    name: "",
    ifsc: "",
  });
 useEffect(() => {
    initBankDB();
     ensureBankDB(); 
  }, []);

 

 const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  const db = getAllCustomers();
  
  console.log("DB USERS:", getAllCustomers());
console.log("INPUT:", accountNumber);

 const user = db.find(
  (c: Customer) =>
    (c.accountNumber || "")
      .toUpperCase()
      .trim() === accountNumber.toUpperCase().trim()
);

  if (!user) {
  setLoading(false);
  setError("❌ Account not found");
  return;
}

  // ❗ BLOCK FIRST
if (user.status === "BLOCKED") {
  setLoading(false);
  setError("⚠ Your account is BLOCKED");
  return;
}

// ❗ THEN APPROVAL
if (user.status !== "APPROVED") {
  setLoading(false);
  setError("❌ Account not approved yet");
  return;
}
  // success login
localStorage.setItem("accountNumber", user.accountNumber);
    localStorage.setItem("name", user.name);
  router.push("/transaction");
};

  return (
     <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f766e] flex flex-col
    px-4 sm:px-6 lg:px-8 ">

      {/* MAIN CARD */}
     <div className="
        w-full lg:max-w-[95%]
         sm:max-w-lg md:max-w-lg 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        shadow-2xl 
        rounded-2xl 
        p-6 sm:p-8 
        text-white border-4
      ">
        {/* HEADER */}
        <div className="mb-6  ">
          <div className="text-4xl text-center">🏦</div>
          <h1 className="text-2xl font-semibold text-white mt-2 text-center">
            Customer Portal 
          </h1>
          <p className="text-white/60 text-sm text-center">
            {loggedIn ? "Welcome back" : "Login using account number"}
          </p>
        </div>

        {/* 🔥 ONLY ONE UI */}
      
          <form onSubmit={handleLogin} className="space-y-4">

            <div className="text-left">
              <label className="text-white/70 text-sm">
                Account Number
              </label>

              <div className="mt-2 flex items-center px-4 py-3 rounded-xl border border-white/20 bg-white/5">
                <span className="text-white/50 mr-2">🔢</span>

                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="w-full bg-transparent outline-none text-white placeholder-white/40"
                />
              </div>
            </div>

           <div className="flex gap-3">
  <button
    type="submit"
    className="w-full py-3 rounded-xl font-semibold text-white
    bg-gradient-to-r from-cyan-400 to-blue-500"
  >
    {loading ? "Logging in..." : "Login"}
  </button>

  <button
    type="button"
    onClick={() => router.push("/")}
    className="w-full py-3 rounded-xl font-semibold text-white
    bg-gradient-to-r from-cyan-400 to-blue-500"
  >
    Back
  </button>
</div>
          </form>
        

{error && (
  <p className="text-red-500 text-center font-semibold mt-5">
    {error}
  </p>
)}
      </div>

    

    </div>
  );
}
{/* Name: Devi

Phone: 7128496385

Account No: AC443333

IFSC: BANK001

Status: APPROVED

Name: Vijay

Phone: 78945612302

Account No: AC757948

IFSC: BANK001

Status: APPROVED

Name: sangeetha

Phone: 07895213647

Account No: AC142602

IFSC: BANK001

Status: APPROVED

Name: sangeetha

Phone: 07895213647

Account No: AC681671

IFSC: BANK001

Status: APPROVED

Name: Fathima Thooba

Phone: 07010546992

Account No: AC465451

IFSC: BANK001

Status: APPROVED

Name: ram

Phone: 07010546952

Account No: AC743741

IFSC: BANK001

Status: APPROVED

Name: Zam

Phone: 07010546962

Account No: AC813366

IFSC: BANK001

Status: APPROVED

Name: Zam

Phone: 07010546962

Account No: AC267787

IFSC: BANK001

Status: APPROVED

Name: Zain

Phone: 07010546962

Account No: AC959403

IFSC: BANK001

Status: APPROVED

Name: Zain

Phone: 07010546962

Account No: AC453187

IFSC: BANK001

Status: APPROVED

Name: Nisha

Phone: 07894561230

Account No: AC536001

IFSC: BANK001

Status: APPROVED
*/}