'use client';

import React, { useEffect, useState } from "react";
import { transferMoney } from "@/lib/bankDB";
import { QrCode } from "lucide-react";

import { approvedCustomers } from "@/lib/approvedCustomer";
import {
  Bell,
  Search,
  Power,
  RefreshCcw,
  Send,
  Home,
  Banknote,        // Bank / money
  CreditCard,      // Cards
  User,            // Person / profile
  History,         // Transactions history
  ArrowRightLeft,  // Transfer / send money
  Wallet,          // Wallet / balance
  Smartphone,      // Mobile banking
      FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentCustomer, saveDB,getAllCustomers, } from "@/lib/bankDB";


export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

   const [name, setName] = useState("");

  // ✅ safe client-side load
 useEffect(() => {
  const load = () => {
    const user = getCurrentCustomer();
    if (user) {
      setBalance(user.balance);
      setName(user.name); // ✅ THIS FIXES YOUR NAME ISSUE
    }
  };

  load();

  window.addEventListener("bank-update", load);
  return () => window.removeEventListener("bank-update", load);
}, []);

 const refreshBalance = () => {
  const user = getCurrentCustomer();

  if (user) {
    setBalance(user.balance ?? 0);
    setName(user.name ?? "");
  }
};

 const payTransferItems = [
  { name: "Send Money", icon: Send, onClick: () => router.push("/send") },
  { name: "Direct Pay", icon: ArrowRightLeft, onClick: () => router.push("/directpay") },
  { name: "My Beneficiary", icon: User, onClick: () => router.push("/beneficiary") },
  { name: "ePassbook", icon: FileText, onClick: () => router.push("/epassbook") }, // ✅ HERE
  { name: "Bill Pay", icon: CreditCard, onClick: () => router.push("/billpay") },
  { name: "Recharge", icon: Smartphone, onClick: () => router.push("/recharge") },
  { name: "Cardless Cash", icon: Wallet, onClick: () => router.push("/cash") },
  { name: "History", icon: History, onClick: () => router.push("/history") },
];
 const [loggedIn, setLoggedIn] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
   const router = useRouter();

  const handleClick = (title: string) => {
    alert(`Opening ${title} page...`);
  };
const handleLogout = () => {
  // logout only user session
  localStorage.removeItem("accountNumber");

  setLoggedIn(false);
  setAccountNumber("");
  setName("");

  router.push("/customerdashboardlogin");
};


  return (
    <div className="min-h-screen bg-[#f4f6fb]">
<div className="px-12 py-4">
      {/* TOP NAVBAR */}
      <div className="flex justify-between items-center px-3 py-3 bg-white shadow-sm ">
        <div className="flex items-center gap-2  ">
          <User className="w-5 h-5 text-gray-600" />
         <h1 className="font-semibold text-gray-800">
    {name}
</h1>
        </div>

        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-600" />
          <Bell className="w-5 h-5 text-gray-600" />

          {/* POWER ICON (instead of logout button) */}
          <Power  onClick={handleLogout}
          className="w-5 h-5 text-red-500 cursor-pointer" />
        </div>
      </div>

      {/* TAB BAR */}
      <div className="flex gap-3 px-3 py-3 overflow-x-auto bg-white">
        {["Overall", "SB/CA/OD", "Deposits", "Loans", "Credit Cards"].map(
          (tab) => (
            <button
              key={tab}
              className="px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm whitespace-nowrap"
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* BALANCE CARD */}
      <div className="mx-4 mt-4 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Overall Balance</h2>

          <div className="flex gap-3 items-center">
            <RefreshCcw
              className="w-5 h-5 cursor-pointer"
              onClick={refreshBalance}
            />
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="bg-white/20 px-3 py-1 rounded-full text-sm"
            >
              {showBalance ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-3">
          {showBalance ? `₹ ${balance}` : "₹ "}
        </h1>

        <div className="mt-3 text-sm opacity-80">
          Savings A/C • OD A/C • Deposits • Loan A/C
        </div>
      </div>

      {/* AD BANNER */}
      <div className="mx-4 mt-4 bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">
          Take a Smart Step Towards Long Term Security
        </p>
        <div className="mt-2 text-blue-600 font-bold">
          ₹5 Lakh Life Cover @ ₹995/year
        </div>
      </div>

      {/* PAY & TRANSFER */}
      <div className="mx-4 mt-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-700">
            Pay & Transfer
          </h2>
          <span className="text-blue-600 text-sm">More</span>
        </div>

        <div className="grid lg:grid-cols-8 gap-4 sm:grid-cols-4 xs:grid-cols-2
        bg-white p-4 rounded-xl shadow">
          {payTransferItems.map((item, i) => {
            const Icon = item.icon;

            return (
              
              <div
                key={i}
                onClick={item.onClick}
                className="flex flex-col items-center text-center cursor-pointer "
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center px-4 py-4">
                  <Icon className="w-12 h-12 text-blue-600" />
                </div>
                <p className="text-md mt-2 text-gray-600">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* UPI SECTION */}
      <div className="mx-4 mt-5 mb-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-700">UPI</h2>
          <span className="text-blue-600 text-sm">More</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-around">
          <div className="flex flex-col items-center">
            <QrCode className="w-6 h-6 text-blue-600" />
            <p className="text-xs mt-1">Scan</p>
          </div>

          <div className="flex flex-col items-center">
            <Banknote className="w-6 h-6 text-blue-600" />
            <p className="text-xs mt-1">Pay</p>
          </div>

          <div className="flex flex-col items-center">
            <ArrowRightLeft className="w-6 h-6 text-blue-600" />
            <p className="text-xs mt-1">Transfer</p>
          </div>
        </div>
      </div>

      {/* FLOATING QR BUTTON (like your image) */}
     <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-6">

      {/* LEFT SIDE ICONS */}
      <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg w-[400px] justify-center gap-x-20">

        <button className="flex flex-col items-center text-gray-400 text-xs">
          <Home onClick={()=>router.push("/transaction")}
          className="w-8 h-8" />
          
        </button>

        <button onClick={()=>router.push("/banknotes")}
        className="flex flex-col items-center text-gray-400 text-xs">
          <Banknote className="w-8 h-8" />
          
        </button>

       

       
      </div>

      {/* CENTER QR BUTTON */}
      <div className="relative">
        <div className="w-20 h-20 bg-[#3894e1] rounded-full flex items-center justify-center shadow-xl">

          {/* ROTATING SQUARE */}
          <div className="w-12 h-12 border-2 border-white rounded-md flex flex-col items-center justify-center animate-spin-slow">
            <QrCode className="w-5 h-5 text-white" />
            <span className="text-[6px] font-semibold text-white leading-none mt-[2px]">
              Scan & Pay
            </span>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE ICONS */}
      <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg w-[400px] justify-center gap-x-20">

       
        <button className="flex flex-col items-center text-gray-400 text-xs">
          <User onClick={()=>router.push("/userdetails")}
          className="w-8 h-8" />
          
        </button>
 <button className="flex flex-col items-center text-gray-400 text-xs">
          <CreditCard onClick={()=>router.push("/cardsdetails")}
          className="w-8 h-8" />
      
        </button>
      </div>

    </div>
      </div>
    </div>
  );
}