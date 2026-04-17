'use client';

import React from "react";

const page = () => {
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden
      bg-[radial-gradient(circle_at_20%_20%,#1e3a8a_0%,transparent_40%),
           radial-gradient(circle_at_80%_30%,#2563eb_0%,transparent_40%),
           radial-gradient(circle_at_50%_80%,#1d4ed8_0%,transparent_50%),
           #020617]"
    >

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 opacity-[0.05] 
        bg-[linear-gradient(to_right,white_1px,transparent_1px),
        linear-gradient(to_bottom,white_1px,transparent_1px)]
        bg-[size:40px_40px]" />

      {/* GLOW BLOBS */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-md bg-white/5 relative z-10">
        <h1 className="text-xl font-semibold tracking-wide">🏦 NovaBank</h1>

        <button className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition">
          Login
        </button>
      </div>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center px-10 py-20 max-w-7xl mx-auto relative z-10">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Banking,
            <br />
            but <span className="text-blue-400">simpler.</span>
          </h1>

          <p className="text-white/60 mt-6 text-lg max-w-md">
            Manage your money, track your spending, and move funds instantly —
            all in one powerful platform.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-500 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition shadow-[0_0_25px_rgba(59,130,246,0.4)]">
              Get Started
            </button>

            <button className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="mt-10 md:mt-0 flex justify-center">
          <div className="w-[320px] h-[200px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl relative overflow-hidden">

            {/* shine */}
            <div className="absolute inset-0 bg-white/10 opacity-20 blur-xl" />

            <p className="text-sm opacity-80">Balance</p>
            <h2 className="text-2xl font-bold mt-2">$12,450.00</h2>

            <div className="mt-10 flex justify-between text-sm opacity-80">
              <span>**** 4832</span>
              <span>09/28</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-10 py-20 grid md:grid-cols-3 gap-8 relative z-10">

        {[
          {
            title: "Instant Payments",
            desc: "Send and receive money instantly with zero delays.",
          },
          {
            title: "Smart Insights",
            desc: "Understand your spending with powerful analytics.",
          },
          {
            title: "Bank-Level Security",
            desc: "Your data is protected with top-tier encryption.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-white/60 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center py-20 border-t border-white/10 relative z-10">

        <h2 className="text-3xl font-semibold mb-4">
          Ready to take control of your finances?
        </h2>

        <button className="bg-blue-500 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition shadow-[0_0_30px_rgba(59,130,246,0.4)]">
          Create Free Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-white/40 text-sm pb-10 relative z-10">
        © 2026 NovaBank • Secure Digital Banking
      </footer>

    </div>
  );
};

export default page;