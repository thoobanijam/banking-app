'use client';

import React, { useEffect, useState } from "react";
import { getBeneficiaries } from "@/lib/beneficiaryDB";
import { getCurrentCustomer, getAllCustomers, updateCustomer } from "@/lib/bankDB";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { transferMoney } from "@/lib/bankDB";


export default function SendMoney() {
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [selectedAcc, setSelectedAcc] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  useEffect(() => {
    setBeneficiaries(getBeneficiaries());
  }, []);

 const handleSend = () => {
  if (!selectedAcc) return alert("⚠️ Select beneficiary");

  const amt = Number(amount);

  if (!amt || amt <= 0) {
    alert("Enter valid amount");
    return;
  }

  // ✅ SINGLE SOURCE OF TRUTH
  transferMoney(selectedAcc, amt);

  alert("✅ Money Sent");
  router.back();
};

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1>Send Money</h1>
      </div>

      <select
        value={selectedAcc}
        onChange={(e) => setSelectedAcc(e.target.value)}
        className="border p-2 w-full mb-3"
      >
        <option value=""
         className="text-black">Select Beneficiary</option>
        {beneficiaries.map((b, i) => (
          <option key={i} value={b.accountNumber}
          className="text-black">
            {b.name} - {b.accountNumber}
          </option>
        ))}
      </select>

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-3 "
      />

      <button
        onClick={handleSend}
        className="bg-green-500 text-white w-full py-2"
      >
        Send Money
      </button>
    </div>
  );
}