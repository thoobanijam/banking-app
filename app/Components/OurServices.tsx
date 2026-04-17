'use client'
import React, { useState } from "react";
import {
  Home,
  Globe,
  Smartphone,
  HomeIcon,
  Building2,
  PiggyBank,
} from "lucide-react";

export default function BankQuickLinks() {
  const [active, setActive] = useState<string | null>(null);

  const items = [
    { title: "Banners", icon: Home },
    { title: "Internet Banking", icon: Globe },
    { title: "Mobile Banking", icon: Smartphone },
    { title: "Home Loan", icon: HomeIcon },
    { title: "Current Account", icon: Building2 },
    { title: "Saving Account", icon: PiggyBank },
  ];

  return (
    <div className="w-full bg-[#6cd4cd] py-4">

      <div className="flex justify-between items-center px-8 py-8 overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">

        {items.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              onClick={() => setActive(item.title)}
              className="flex flex-col items-center min-w-[200px] cursor-pointer h-70 hover:scale-115 transition-transform duration-200"
            >

              {/* CLICK HERE BADGE */}
              <div className="relative mt-6">
                <span className="absolute -top-0 left-[90%] -translate-x-1/2 bg-orange-500 text-white text-sm px-1 py-[3px] rounded-xl w-25 text-center animate-[float_1.5s_ease-in-out_infinite]">
                  Click here
                </span>

                {/* ICON CIRCLE */}
                <div className="w-34 h-34 rounded-full bg-[#b9f5f3] flex items-center justify-center shadow-md border-4 border-[#64817b] animate-[borderPulse_1.8s_ease-in-out_infinite]">
                  <Icon className="w-20 h-15 text-blue-900" />
                </div>
              </div>

              {/* LABEL */}
              <p className="mt-3 text-black font-medium text-lg text-center h-14">
                {item.title}
              </p>

              {/* UNDERLINE */}
              <div className="w-30 h-[4px] bg-white mt-2"></div>

            </div>
          );
        })}
      </div>

      {/* ================= CONTENT SECTION ================= */}
     {active && (
  <div className="mx-8 mb-6 p-7 rounded-3xl shadow-2xl 
  bg-gradient-to-br from-white via-blue-50 to-cyan-50 
  animate-[fadeIn_0.4s_ease-in-out] border border-blue-100">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6 border-b pb-4">
      <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2 animate-[slideDown_0.4s_ease]">
        🏦 {active}
      </h2>

      <button
        onClick={() => setActive(null)}
        className="text-red-500 font-semibold hover:scale-110 transition"
      >
        ✖ Close
      </button>
    </div>

    {/* ========== BANNERS ========== */}
    {active === "Banners" && (
      <div className="grid md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease]">

        <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 shadow-md hover:scale-105 transition border border-orange-200">
          <h3 className="font-bold text-orange-600 mb-3">🎉 Hot Offers</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>5% cashback on all debit card spends</li>
            <li>Zero maintenance savings account</li>
            <li>Festive personal loan discounts</li>
            <li>Referral bonus up to $50</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-100 to-red-100 shadow-md hover:scale-105 transition border border-red-200">
          <h3 className="font-bold text-red-600 mb-3">🔥 Bank Highlights</h3>
          <p className="text-gray-700 leading-relaxed">
            Enjoy next-generation digital banking with instant approvals,
            AI-powered fraud detection, and 24/7 customer support.
          </p>

          <div className="mt-4 bg-white p-3 rounded-xl shadow-sm text-sm text-gray-600">
            💡 Limited-time offers updated weekly
          </div>
        </div>

      </div>
    )}

    {/* ========== INTERNET BANKING ========== */}
    {active === "Internet Banking" && (
      <div className="grid md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease]">

        <div className="p-6 rounded-2xl bg-blue-100 shadow-md hover:scale-105 transition border border-blue-200">
          <h3 className="font-bold text-blue-700 mb-3">🌐 Online Banking</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Real-time balance & transactions</li>
            <li>Instant NEFT / RTGS / IMPS transfers</li>
            <li>Utility bill payments</li>
            <li>Download e-statements anytime</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-cyan-100 shadow-md hover:scale-105 transition border border-cyan-200">
          <h3 className="font-bold text-cyan-700 mb-3">🔐 Security Layer</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>OTP-based login system</li>
            <li>End-to-end encrypted transactions</li>
            <li>AI fraud detection engine</li>
            <li>Auto logout after inactivity</li>
          </ul>
        </div>

      </div>
    )}

    {/* ========== MOBILE BANKING ========== */}
    {active === "Mobile Banking" && (
      <div className="grid md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease]">

        <div className="p-6 rounded-2xl bg-green-100 shadow-md hover:scale-105 transition border border-green-200">
          <h3 className="font-bold text-green-700 mb-3">📱 Mobile Banking</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>UPI payments & QR scan</li>
            <li>Instant money transfer</li>
            <li>Recharge & bill payments</li>
            <li>24/7 banking access</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-100 shadow-md hover:scale-105 transition border border-emerald-200">
          <h3 className="font-bold text-emerald-700 mb-3">⚡ Smart Banking</h3>
          <p className="text-gray-700 leading-relaxed">
            Experience AI-powered banking with personalized insights,
            biometric login, and lightning-fast transactions.
          </p>

          <div className="mt-4 bg-white p-3 rounded-xl text-sm text-gray-600">
            📊 Spending analytics included
          </div>
        </div>

      </div>
    )}

    {/* ========== HOME LOAN ========== */}
    {active === "Home Loan" && (
      <div className="grid md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease]">

        <div className="p-6 rounded-2xl bg-purple-100 shadow-md hover:scale-105 transition border border-purple-200">
          <h3 className="font-bold text-purple-700 mb-3">🏠 Loan Benefits</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Low interest rates from 7.5%</li>
            <li>Up to 90% property financing</li>
            <li>Flexible EMI options</li>
            <li>Fast approval in 48 hours</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-100 shadow-md hover:scale-105 transition border border-indigo-200">
          <h3 className="font-bold text-indigo-700 mb-3">💡 Smart Loan System</h3>
          <p className="text-gray-700">
            Get instant eligibility check, AI-based approval scoring,
            and personalized loan offers based on your profile.
          </p>

          <div className="mt-4 bg-white p-3 rounded-xl text-sm text-gray-600">
            🏡 Dream home approval made easy
          </div>
        </div>

      </div>
    )}

    {/* ========== CURRENT ACCOUNT ========== */}
    {active === "Current Account" && (
      <div className="grid md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease]">

        <div className="p-6 rounded-2xl bg-gray-100 shadow-md hover:scale-105 transition border border-gray-200">
          <h3 className="font-bold text-gray-700 mb-3">🏢 Business Banking</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Unlimited transactions</li>
            <li>Overdraft facility</li>
            <li>Multi-user access</li>
            <li>Business debit card</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-100 shadow-md hover:scale-105 transition border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-3">📊 Business Tools</h3>
          <p className="text-gray-700">
            Designed for startups, traders, and enterprises with
            full financial control and real-time tracking.
          </p>
        </div>

      </div>
    )}

    {/* ========== SAVING ACCOUNT ========== */}
    {active === "Saving Account" && (
      <div className="grid md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease]">

        <div className="p-6 rounded-2xl bg-yellow-100 shadow-md hover:scale-105 transition border border-yellow-200">
          <h3 className="font-bold text-yellow-700 mb-3">💰 Savings Features</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>High interest earnings</li>
            <li>Zero balance option</li>
            <li>Free ATM withdrawals</li>
            <li>Mobile banking access</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-amber-100 shadow-md hover:scale-105 transition border border-amber-200">
          <h3 className="font-bold text-amber-700 mb-3">🔒 Safe Banking</h3>
          <p className="text-gray-700">
            Your money is protected with multi-layer security,
            instant alerts, and fraud prevention systems.
          </p>
        </div>

      </div>
    )}

  </div>
)}
    </div>
  );
}