'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Download, Share2 } from "lucide-react";

type Customer = {
  name: string;
  ifsc: string;
  accountNumber: string;
  phone: string;
};

const Page = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
const router=useRouter()
  useEffect(() => {
    // Example: fetch from localStorage
    const data = localStorage.getItem("customer");

    if (data) {
      setCustomer(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-6">

      {/* HEADER */}
      

       <div className="flex items-center gap-3 px-4 py-3 border-b text-white cursor-pointer">
                <ArrowLeft
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => router.back()}
                />
                <h1 className="text-lg font-semibold text-white">  Bank Account Details</h1>
              </div>

      {/* CARD */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg space-y-4 cursor-pointer">

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-300">Customer Name</span>
          <span className="font-semibold">
            {customer?.name || "N/A"}
          </span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-300">IFSC Code</span>
          <span className="font-semibold">
            {customer?.ifsc || "N/A"}
          </span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-gray-300">Account Number</span>
          <span className="font-semibold">
            {customer?.accountNumber || "N/A"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">Phone Number</span>
          <span className="font-semibold">
            {customer?.phone || "N/A"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Page;