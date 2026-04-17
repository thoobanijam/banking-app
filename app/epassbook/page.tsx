'use client';

import React, { useEffect, useState } from "react";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentCustomer } from "@/lib/bankDB";

export default function EPassbook() {
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
 const formatDateTime = (isoDate: string) => {
  const d = new Date(isoDate);

  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  let hours = d.getHours();
  let minutes = String(d.getMinutes()).padStart(2, "0");
  let seconds = String(d.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
};
useEffect(() => {
    const load = () => {
      const data = getCurrentCustomer();
      setCustomer(data);
    };

    load();

    // 🔥 LIVE SYNC
    window.addEventListener("bank-update", load);

    return () => window.removeEventListener("bank-update", load);
  }, []);

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex justify-center items-start py-4">

      {/* MOBILE FRAME */}
      <div className="w-full  bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 py-3 border-b text-black">
          <ArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-lg font-semibold text-black">EPassbook</h1>
        </div>

        {/* CARD */}
        <div className="m-4 p-4 rounded-xl border shadow-sm bg-white">
          <div className="text-sm text-black space-y-2">

            <div className="flex justify-between ">
              <span>Customer Name</span>
            <div className="flex justify-between">
 
  <span className="font-semibold">{customer.name}</span>
</div>
            </div>

            <div className="flex justify-between">
              <span>Account</span>
              <span>{customer.accountNumber}</span>
            </div>


            <div className="flex justify-between">
              <span>Balance</span>
              <span>{customer.balance}</span>
            </div>

            <div className="flex justify-between">
              <span>Balance</span>
              <span>{customer.balance}</span>
            </div>

            <p className="text-blue-600 text-xs mt-2 cursor-pointer">
              Get Full Account Details
            </p>

            <p className="text-[10px] text-gray-400 mt-2">
              Note: In case of OD account the balance shown is Utilized OD limit
            </p>

          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-4 text-xs bg-blue-500 text-white px-3 py-2 font-semibold">
          <span>Date</span>
          <span className="col-span-1">Details</span>
          <span>Amount</span>
          <span>Balance</span>
        </div>

        {/* TRANSACTIONS */}
        <div className="text-xs text-black">
         {customer.transactions?.map((tx: any, i: number) => (
          <div key={i} className="grid grid-cols-4 gap-x-6 px-4 py-3 border-b text-xs">
            <span className="pr-4">{tx.date}</span>
            <span className="truncate pl-4">{tx.details}</span>
            <span className={tx.type === "Dr" ? "text-red-500" : "text-green-600"}>
              {tx.amount}  { tx.type}
            </span>
            <span>{tx.balance}</span>
          </div>
        ))}

        {/* BOTTOM BUTTONS */}
        <div className="flex gap-3 p-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-full">
            <Download className="w-4 h-4" />
            Download
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-full">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
</div>
      </div>
    </div>
  );
}