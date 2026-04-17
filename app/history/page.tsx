'use client';

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentCustomer } from "@/lib/bankDB";

export default function History() {
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const load = () => {
      const data = getCurrentCustomer();
      setCustomer(data);
    };

    load();

    window.addEventListener("bank-update", load);
    return () => window.removeEventListener("bank-update", load);
  }, []);

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-4 text-black">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-xl font-bold">Transaction History</h1>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow p-4">
        {customer.transactions?.length === 0 && (
          <p className="text-gray-400 text-sm">No transactions yet</p>
        )}

        {customer.transactions?.map((tx: any, i: number) => (
          <div key={i} className="border-b py-3">

            {/* DATE */}
            <p className="text-xs text-gray-500">{tx.date}</p>

            {/* DETAILS */}
            <p className="font-medium">{tx.details}</p>

            {/* AMOUNT + BALANCE */}
            <div className="flex justify-between text-sm mt-1">
              <span className={tx.type === "Dr" ? "text-red-500" : "text-green-600"}>
                ₹ {tx.amount} {tx.type}
              </span>

              <span className="text-gray-700">
                Balance: ₹ {tx.balance}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}