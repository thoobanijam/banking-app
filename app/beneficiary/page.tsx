'use client';

import React, { useState, useEffect } from "react";
import { getBeneficiaries, saveBeneficiaries } from "@/lib/beneficiaryDB";
import { ArrowLeft, Download, Share2 } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { approvedCustomers } from "@/lib/approvedCustomer";


export default function Beneficiary() {

  const [list, setList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
const router =useRouter()
  const [form, setForm] = useState({
    name: "",
    accountNumber: "",
    reAccount: "",
    ifsc: "",
    nickname: "",
  });

  useEffect(() => {
    setList(getBeneficiaries());
  }, []);

  const handleAdd = () => {
       if (!form.name || !form.accountNumber || !form.ifsc) {
      alert("Fill all fields");
      return;
    }
if (form.accountNumber !== form.reAccount) {
      alert("Account number mismatch");
      return;
    }
 const approved = approvedCustomers.find(
  (c) => c.accountNumber === form.accountNumber
);

// 🔴 CHECK IF ACCOUNT EXISTS FIRST
if (!approved) {
  alert("❌ Account not found in approved customers");
  return;
}

// 🔴 NAME CHECK (case insensitive)
if (approved.name.toLowerCase() !== form.name.toLowerCase()) {
  alert("❌ Name does not match bank records");
  return;
}

// 🔴 IFSC CHECK
if (approved.ifsc !== form.ifsc) {
  alert("❌ IFSC code incorrect");
  return;
}
    // 🔴 DUPLICATE CHECK
    const already = list.find(
      (b) => b.accountNumber === form.accountNumber
    );

    if (already) {
      alert("⚠️ Beneficiary already added");
      return;
    }
    const newList = [form, ...list];
    setList(newList);
    saveBeneficiaries(newList);

    setShowForm(false);
    setForm({
      name: "",
      accountNumber: "",
      reAccount: "",
      ifsc: "",
      nickname: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
        <div className="flex  items-center gap-2 mb-4">
 <ArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => router.back()}
          />
      <h1 className="text-xl font-bold ">My Beneficiary</h1></div>

      {/* LIST */}
      <div className="bg-white rounded-xl p-4 shadow space-y-4">
        {list.map((b, i) => (
          <div key={i} className="border-b pb-3">

            <h2 className="font-semibold">{b.name}</h2>
            <p className="text-sm text-gray-500">
              A/C {b.accountNumber}
            </p>
            <p className="text-sm text-gray-500">
              {b.ifsc}
            </p>

          </div>
        ))}

        {list.length === 0 && (
          <p className="text-gray-400 text-sm ">No beneficiaries added</p>
        )}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-full"
      >
        Add Beneficiary
      </button>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-black">

          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-3 ">

            <h2 className="font-semibold text-lg">Add Beneficiary</h2>

            <input placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="border p-2 w-full text-black" />

            <input placeholder="Account Number"
              value={form.accountNumber}
              onChange={(e) => setForm({...form, accountNumber: e.target.value})}
              className="border p-2 w-full text-black" />

            <input placeholder="Re-enter Account Number"
              value={form.reAccount}
              onChange={(e) => setForm({...form, reAccount: e.target.value})}
              className="border p-2 w-full text-black" />

            <input placeholder="IFSC"
              value={form.ifsc}
              onChange={(e) => setForm({...form, ifsc: e.target.value})}
              className="border p-2 w-full text-black" />

            <input placeholder="Nickname"
              value={form.nickname}
              onChange={(e) => setForm({...form, nickname: e.target.value})}
              className="border p-2 w-full text-black" />
<div className="flex justify-center items-center gap-4 rounded-xl">
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white w-full py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-green-500 text-white w-full py-2 rounded"
            >
              Close
            </button></div>

          </div>
        </div>
      )}

    </div>
  );
}