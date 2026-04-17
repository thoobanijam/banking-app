'use client';

import React from "react";
import {
  Banknote,
  UserX,          // de-register
  Settings,       // manage / settings
  Eye,            // view balance
  FileText,       // statement
  KeyRound,       // MPIN
  Lock,           // passcode
  Hash,           // MMID
  User,           // my account
} from "lucide-react";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const items = [
    { label: "De-Register", icon: <UserX className="w-5 h-5" /> },
    { label: "Manage", icon: <Settings className="w-5 h-5" /> },
    { label: "View Balance / Statement", icon: <FileText className="w-5 h-5" /> },
    { label: "Change MPIN", icon: <KeyRound className="w-5 h-5" /> },
    { label: "Change Passcode", icon: <Lock className="w-5 h-5" /> },
    { label: "MMID", icon: <Hash className="w-5 h-5" /> },
    { label: "My Account", icon: <User className="w-5 h-5" /> },
  ];
const router = useRouter()
  return (
    <div className="min-h-screen bg-[white] text-black p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
         <ArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => router.back()}
          />
        Banking
      </h1>

      {/* MENU LIST */}
      <div className="flex flex-col gap-4 ">

        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition cursor-pointer"
          >
            <div className="text-blue-400">{item.icon}</div>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default page;