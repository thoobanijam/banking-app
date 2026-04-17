"use client";

import { useEffect } from "react";
import { initBankDB, syncBankFromServer } from "@/lib/bankDB";

export default function ClientInit() {
 useEffect(() => {
  initBankDB();

  setTimeout(() => {
    syncBankFromServer();
  }, 500);
}, []);

  return null;
}