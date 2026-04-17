"use client";

import { useState } from "react";
import { customers as initialData } from "../../data/customers";
import { updateStatus } from "../../utils/customerActions";

export default function PendingPage() {
  const [customers, setCustomers] = useState(initialData);

  const pending = customers.filter((c) => c.status === "PENDING");

  const approve = (id: number) => {
    setCustomers((prev) => updateStatus(prev, id, "APPROVED"));
  };

  const reject = (id: number) => {
    setCustomers((prev) => updateStatus(prev, id, "REJECTED"));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🟡 Pending Customers</h1>

      {pending.map((c) => (
        <div
          key={c.id}
          className="flex justify-between border p-3 rounded mb-2"
        >
          <span>{c.name}</span>

          <div className="flex gap-2">
            <button
              onClick={() => approve(c.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(c.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}