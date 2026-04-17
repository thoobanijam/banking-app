'use client'
import React, { useState, useMemo,useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { RiHome3Line } from "react-icons/ri";
import OurServices from "./OurServices";
import { useRouter } from "next/navigation";

export default function BankingLanding() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router=useRouter()
 const [role, setRole] = useState<string | null>(null);

 const [amount, setAmount] = useState<number>(1000000);
  const [interest, setInterest] = useState<number>(7.1);
  const [tenure, setTenure] = useState<number>(15);

  
 // EMI CALCULATION
  const emi = useMemo(() => {
    const r = interest / 12 / 100;
    const n = tenure * 12;

    if (r === 0) return amount / n;

    const pow = Math.pow(1 + r, n);
    return Math.round((amount * r * pow) / (pow - 1));
  }, [amount, interest, tenure]);

  const totalPayable = emi * tenure * 12;


     const menuData = {
Digital:["IOB Mobile Banking","ION-UPI","ION Net Banking","Cards","Digital Initiatives"],
    Personal: ["Accounts", "Loans", "NRI", "Deposits"],
    Corporate: ["Business Banking", "Trade Finance", "Payments"],
    "Agri & Rural": ["Farmer Loans", "Agri Schemes"],
    MSME: ["Small Business Loans", "Credit Support"],
    FOREX: ["Currency Exchange", "International Transfer"],
    "Government Business": ["Tax Payment", "Govt Schemes"],
  };
useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setRole(parsed.role);
    }
  }, []);
const handleStaffClick = () => {
  if (typeof window === "undefined") return;

  const auth = localStorage.getItem("auth");

  if (!auth) {
    alert("❌ Please login first");
    router.push("/login");
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(auth);
  } catch {
    alert("❌ Invalid session");
    router.push("/login");
    return;
  }

  if (parsed.role !== "STAFF") {
    alert("❌ Access Denied: Only Bank Staff can login");
    return;
  }

  // ✅ OPEN LOGIN PAGE
  router.push("/login");
};

  return (
    <div className="bg-gray-50 text-gray-800 w-full min-h-screen overflow-x-hidden">

      {/* NAVBAR */}
     <header className="w-full bg-white border-b">

 
 

  {/* MAIN HEADER */}
  <div className="w-full flex flex-wrap md:flex-nowrap justify-between items-center px-4 sm:px-6 md:px-12 py-3 gap-4">
    {/* LEFT LOGO */}
    <div className="flex items-center gap-3">
      <img
        src="/img/banklogo.webp"
        alt="Bank Logo"
        className="w-[150px] h-auto object-contain"
      />
      <h1 className="text-2xl font-bold text-blue-900">
        Your Bank
      </h1>
    </div>
 {/* TOP BAR */}
   <div className="flex flex-col">
  <div className="w-full flex flex-wrap justify-center items-center px-6 py-4 text-xs bg-gray-100 text-gray-700 mb-4">

    {/* LEFT LINKS */}
    
    <div className="flex flex-wrap gap-4">
      <a href="#" className="hover:text-blue-900">About Us</a>
      <a href="#" className="hover:text-blue-900">Investor Relation Cell</a>
      <a href="#" className="hover:text-blue-900">Customer Corner</a>
      <span>Toll Free 18008904445 / 18004254445</span>
    </div>

    {/* UP LINKS */}
  
    <div className="flex gap-4 items-center mt-2 md:mt-0">
      <a href="#" className="hover:text-blue-900">Skip To Main Content</a>
      <select className="border px-2 py-1 rounded text-xs">
        <option>English</option>
        <option>Hindi</option>
      </select>
    </div>
  </div>
    {/* MAIN MENU */}
 <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">

      {Object.entries(menuData).map(([menu, items]) => (
        <div
          key={menu}
          className="relative"
          onMouseEnter={() => setOpenMenu(menu)}
          onMouseLeave={() => setOpenMenu(null)}
        >

          {/* MENU TITLE */}
          <button className="flex items-center gap-1 hover:text-blue-900">
            {menu}
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* DROPDOWN */}
          {openMenu === menu && (
            <div className="absolute top-6 left-0 bg-[#c4dfff] shadow-lg rounded-lg w-64 z-50">

              {items.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-white text-sm"
                >
                  <img
                    src="/img/drop.jpg"
                    alt="icon"
                    className="w-8 h-8 rounded-full"
                  />
                  {item}
                </a>
              ))}

            </div>
          )}

        </div>
      ))}

    </nav>
</div>
    {/* LOGIN BUTTON */}
    <button onClick={()=>router.push("/customerdashboardlogin")}
    className="bg-blue-900 text-white px-4 py-2 rounded-lg">
      Login
    </button>

  </div>

</header>

      {/* HERO */}
      <section className="bg-[#6bd1cd] text-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 w-full">
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Banking Made Simple, Secure & Fast
            </h2>
            <p className="mt-4 text-white/80">
              Manage savings, loans, investments and payments anytime, anywhere.
            </p>

            <div className="mt-6 flex gap-4">
              <button onClick={()=>router.push("/customerdashboardlogin")}
              className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold">
                Open Account
              </button>
              <button onClick={()=>router.push("/learnmore")}
              className="border border-white px-5 py-2 rounded-lg">
                Learn More
              </button>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Quick Services</h3>
            <ul className="space-y-2 text-white/90 text-sm ">
              <li className="hover:scale-105 transition-transform duration-300">✔ Home Loan Application</li>
              <li className="hover:scale-105 transition-transform duration-300">✔ Personal Loan Eligibility</li>
              <li className="hover:scale-105 transition-transform duration-300">✔ Card Blocking</li>
              <li className="hover:scale-105 transition-transform duration-300">✔ Account Opening (e-KYC)</li>
              <li className="hover:scale-105 transition-transform duration-300">✔ Internet Banking Access</li>
            </ul>
          </div>

        </div>
      </section>

      {/* SERVICES */}
     <OurServices/>

      {/* INTEREST RATES */}
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 px-6 md:px-24 py-20 border-t w-full overflow-hidden">

  {/* Background glow */}
  <div className="absolute inset-0 opacity-30">
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-300 rounded-full blur-3xl"></div>
    <div className="absolute top-40 right-0 w-72 h-72 bg-cyan-300 rounded-full blur-3xl"></div>
  </div>

  <div className="relative w-full">

    {/* Heading */}
    <h2 className="text-4xl font-extrabold text-gray-800 mb-12 tracking-tight">
      💰 Interest Rates
    </h2>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-10 w-full">

      {/* Card */}
      {[
        { title: "Home Loan", rate: "7.10%", color: "from-green-400 to-emerald-600" },
        { title: "Vehicle Loan", rate: "7.55%", color: "from-cyan-400 to-blue-600" },
        { title: "Personal Loan", rate: "10.25%", color: "from-purple-400 to-pink-600" },
      ].map((item, i) => (
        
        <div
          key={i}
          className="group relative p-[2px] rounded-3xl bg-gradient-to-r hover:scale-[1.03] transition duration-500"
        >

          {/* Gradient border card */}
          <div className="bg-white rounded-3xl p-7 shadow-md group-hover:shadow-2xl transition relative overflow-hidden">

            {/* glow line animation */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-200 blur-2xl opacity-0 group-hover:opacity-60 transition"></div>

            {/* Title */}
            <p className="text-gray-500 text-sm">{item.title}</p>

            {/* Rate */}
            <h3 className="text-4xl font-extrabold text-green-600 mt-3 group-hover:scale-110 transition">
              {item.rate}
            </h3>

            {/* Animated bar */}
            <div className="mt-5 h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-700"></div>

            {/* Badge */}
            <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
              LIVE
            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>
      {/* NEWS */}
     <section className="relative py-24 px-6 md:px-24 bg-gradient-to-b from-gray-100 via-white to-gray-100 w-full overflow-hidden">

  {/* Background glow */}
  <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-300 blur-3xl opacity-25 rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-300 blur-3xl opacity-20 rounded-full"></div>

  <div className="relative w-full cursor-pointer">

    {/* Heading */}
    <h2 className="text-4xl font-extrabold text-gray-800 mb-12 flex items-center gap-3">
      📰 Latest Updates
      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full animate-pulse">
        LIVE
      </span>
    </h2>

    {/* News list */}
    <div className="space-y-6">

      {[
        { text: "System maintenance notice for digital banking services", type: "Important" },
        { text: "New changes in debit card benefits", type: "Update" },
        { text: "Important loan policy update for customers", type: "Policy" },
        { text: "Cyber security awareness advisory", type: "Security" },
      ].map((news, i) => (
        
        <div
          key={i}
          className="group relative flex items-start gap-5 p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >

          {/* shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

          {/* Timeline line */}
          <div className="absolute left-7 top-0 h-full w-[2px] bg-gradient-to-b from-green-400 via-cyan-400 to-green-400 opacity-30 animate-pulse"></div>

          {/* Dot */}
          <div className="relative mt-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-ping absolute"></div>
            <div className="w-3 h-3 rounded-full bg-green-600 relative"></div>
          </div>

          {/* Content */}
          <div className="flex-1 z-10">

            {/* Tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {news.type}
              </span>
            </div>

            {/* Text */}
            <p className="text-gray-700 font-medium group-hover:text-gray-900 transition">
              {news.text}
            </p>

            {/* underline animation */}
            <div className="mt-2 h-[2px] w-0 group-hover:w-32 bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500 rounded-full"></div>
          </div>

          {/* NEW badge */}
          {i === 0 && (
            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-bounce">
              BREAKING
            </span>
          )}

        </div>
      ))}

    </div>
  </div>
</section>

      {/* LOAN CALCULATOR */}
   <section className="relative py-20 w-full px-6 md:px-24 bg-gradient-to-br from-gray-100 via-white to-gray-100 overflow-hidden">

      {/* Background orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-300 blur-3xl opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-300 blur-3xl opacity-20 rounded-full animate-pulse"></div>

      <div className="relative w-full">

        {/* Heading */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
            🧮 Loan Calculator
          </h2>

          <span className="text-xs px-4 py-1 rounded-full bg-green-100 text-green-700 animate-pulse shadow-sm">
            LIVE EMI ENGINE
          </span>
        </div>

        {/* Main Card */}
        <div className="relative grid md:grid-cols-2 gap-12 p-10 rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-gray-200 shadow-2xl overflow-hidden">

          {/* animated border glow */}
          <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 animate-pulse opacity-30"></div>

          {/* Inputs */}
          <div className="relative space-y-8">

            {/* Loan Amount */}
            <div className="group bg-white/70 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>💰</span> Loan Amount
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full mt-2 p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />

              <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 mt-2 group-hover:w-full transition-all duration-500 rounded-full"></div>
            </div>

            {/* Interest Rate */}
            <div className="group bg-white/70 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>📊</span> Interest Rate
              </label>

              <input
                type="number"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full mt-2 p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />

              <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 mt-2 group-hover:w-full transition-all duration-500 rounded-full"></div>
            </div>

            {/* Tenure */}
            <div className="group bg-white/70 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>⏳</span> Tenure (Years)
              </label>

              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full mt-2 p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />

              <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 mt-2 group-hover:w-full transition-all duration-500 rounded-full"></div>
            </div>

          </div>

          {/* Result Panel (UNCHANGED UI) */}
          <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-blue-50 via-white to-cyan-50 border border-blue-200 shadow-xl overflow-hidden">

            {/* floating glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-300 blur-3xl opacity-30 rounded-full animate-pulse"></div>

            {/* badge */}
            <div className="absolute top-5 right-5 text-xs px-3 py-1 bg-blue-600 text-white rounded-full animate-bounce shadow-md">
              AUTO CALC
            </div>

            <p className="text-gray-500 text-sm">Monthly EMI</p>

            <h3 className="text-5xl font-extrabold text-blue-900 mt-2 animate-pulse">
              ₹{emi.toLocaleString()}
            </h3>

            {/* progress bar style */}
            <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse"></div>
            </div>

            <p className="text-gray-500 text-sm mt-8">Total Payable</p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              ₹{totalPayable.toLocaleString()}
            </h3>

            {/* floating info box */}
            <div className="mt-6 p-4 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition">
              <p className="text-xs text-gray-500">
                Tip: Lower interest rate saves up to 18% total repayment
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
      {/* FOOTER */}
   <footer className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white py-16 w-full px-6 md:px-24 overflow-hidden">

  {/* Background glow */}
  <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-400 blur-3xl opacity-20 rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-400 blur-3xl opacity-10 rounded-full"></div>

  <div className="relative w-full grid md:grid-cols-3 gap-10 text-sm">

    {/* STAFF PORTAL */}
    <div className="col-span-2 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition">

      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        🔐 Bank Staff Portal
        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full animate-pulse">
          RESTRICTED
        </span>
      </h3>

      <p className="text-white/70 mb-6">
        Secure access for authorized bank employees only. All activities are monitored and logged for compliance.
      </p>

      {/* Staff actions */}
      <div className="grid md:grid-cols-2 gap-4">

      <div
  onClick={handleStaffClick}
  className={`p-4 text-xl rounded-xl border transition cursor-pointer
    ${role !== "STAFF"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-white/5 hover:bg-white/10"
    }`}
>
  👨‍💼 Staff Login
</div>
        <div className="p-4 text-xl rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
          📊 Dashboard Access
        </div>

        <div className="p-4 text-xl rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
          🧾 Customer Records
        </div>

        <div className="p-4 text-xl rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
          🛡️ Compliance Tools
        </div>

      </div>

    </div>

    {/* SECURITY PANEL */}
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition">

      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
        🛡️ Security Center
      </h3>

      <p className="text-white/70 mb-4">
        All staff actions are encrypted and monitored in real time.
      </p>

      <div className="space-y-3 text-white/70">
        <p>• Role-based authentication</p>
        <p>• 2FA required login</p>
        <p>• Audit logging enabled</p>
        <p>• Fraud detection active</p>
      </div>

      <div className="mt-5 text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 inline-block animate-pulse">
        SYSTEM SECURE
      </div>

    </div>

  </div>

  {/* Divider */}
  <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

  {/* Bottom */}
  <div className="text-center text-white/50 text-xs">
    © 2026 Bank Internal System • Staff Only Access
  </div>

</footer>

    </div>
  );
}