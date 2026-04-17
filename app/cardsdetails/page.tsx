'use client';

import React, { useEffect, useState } from "react";

type Customer = {
  name: string;
  ifsc: string;
  accountNumber: string;
  phone: string;
};

const Page = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("customer");
    if (data) {
      setCustomer(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center p-6">

      {/* CARD */}
      <div className="w-full max-w-md rounded-3xl p-6 shadow-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden">

        {/* decorative glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-black/20 rounded-full blur-2xl"></div>

        {/* BANK TITLE */}
        <h1 className="text-lg font-semibold tracking-widest">
          VIRTUAL BANK CARD
        </h1>

        {/* CHIP */}
        <div className="w-12 h-8 bg-yellow-400 rounded-md mt-4"></div>

        {/* DETAILS */}
        <div className="mt-6 space-y-4">

          <div>
            <p className="text-xs opacity-80">Card Holder</p>
            <p className="text-xl font-bold">
              {customer?.name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs opacity-80">Account Number</p>
            <p className="tracking-widest font-semibold">
              {customer?.accountNumber || "XXXX XXXX XXXX"}
            </p>
          </div>

          <div className="flex justify-between gap-4">

            <div>
              <p className="text-xs opacity-80">IFSC</p>
              <p className="font-semibold">
                {customer?.ifsc || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-80">Phone</p>
              <p className="font-semibold">
                {customer?.phone || "N/A"}
              </p>
            </div>

          </div>

        </div>

        {/* CARD FOOT */}
        <div className="mt-6 text-xs opacity-70 tracking-widest">
          DIGITAL BANK CARD
        </div>

      </div>
    </div>
  );
};

export default Page;