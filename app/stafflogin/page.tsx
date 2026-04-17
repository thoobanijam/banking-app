'use client';
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { addCustomer, getAllCustomers, saveDB } from "@/lib/bankDB";

type Customer = {
  id: string;
  name: string;
  phone: string;
  accountNumber: string;
  ifsc: string;
  status: "PENDING" | "APPROVED" | "BLOCKED" | "ACTIVE";
  dailyTransactionCount: number;
  dailyTransactionTotal: number;
  createdAt: string;
};



export default function StaffDashboard() {
  const [localCustomers, setLocalCustomers] = useState<Customer[]>([]);
      const [open, setOpen] = useState(false);
       const [customers, setCustomers] = useState<Customer[]>([]);
 const [name, setName] = useState("");
 const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState<string>("");
const [dob, setDob] = useState("");
const [photo, setPhoto] = useState<string | null>(null);
  const [idProof, setIdProof] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);    
 const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
 const [loading, setLoading] = useState(true);
const pendingCustomers = customers.filter(c => c.status === "PENDING");
const approvedCustomers = customers.filter(c => c.status === "APPROVED");
  const [showApplications, setShowApplications] = useState(false);

  const [branch, setBranch] = useState("Kampala Main Branch");
  const router = useRouter();
const [showReport, setShowReport] = useState(false);
  
const [isClient, setIsClient] = useState(false);

 const handleLogout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("accountNumber");
  localStorage.removeItem("name");
  localStorage.removeItem("ifsc");

  router.replace("/login");
};
useEffect(() => {
  setLocalCustomers(getAllCustomers());
}, []);
// ✅ PROTECTED ROUTE FIX
 useEffect(() => {
  setIsClient(true);

  const auth = localStorage.getItem("auth");
  const parsed = auth ? JSON.parse(auth) : null;

  if (!parsed || parsed.role !== "STAFF") {
    router.replace("/login");
  }
}, []);
  // AGE CHECK
 const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();

  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

const checkEligibility = () => {
  if (!dob) {
    alert("Please select Date of Birth");
    return false;
  }

  const age = calculateAge(dob);

  if (age < 18) {
    alert("❌ Customer must be at least 18 years old.");
    return false;
  }

  alert("✅ Customer is eligible.");
  return true;
};

const pendingCount = customers.filter(c => c.status === "PENDING").length;

const approvedCount = customers.filter(c => c.status === "APPROVED").length;

const totalCustomers = customers.length;


const today = new Date();
today.setHours(0, 0, 0, 0);

const todayCustomers = customers.filter((c) => {
  return c.createdAt && new Date(c.createdAt) >= today;
});


const now = new Date();
const weekAgo = new Date();
weekAgo.setDate(now.getDate() - 7);

const weeklyCustomers = customers.filter((c) => {
  return c.createdAt && new Date(c.createdAt) >= weekAgo;
});

  // FETCH (IMPORTANT FOR REFRESH FIX)
const fetchCustomers = () => {
  const data = getAllCustomers();
  setCustomers(Array.isArray(data) ? data : []);
};

  useEffect(() => {
    fetchCustomers();
  }, []);

const handleAddCustomer = (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !phone || !dob || !aadhaar || !gender || !nationality) {
    alert("Fill all required fields");
    return;
  }

  const accountNumber =
    "AC" + Math.floor(100000 + Math.random() * 900000);

  const newCustomer = {
    name,
    phone,
    aadhaar,
    gender,
    nationality,
    dob,
    accountNumber,
  };

  const updatedDB = addCustomer(newCustomer);

  setCustomers(updatedDB); // ✅ REFRESH UI

  setOpen(false);
  setName("");
  setPhone("");
  setAadhaar("");
  setDob("");
  setGender("");
  setNationality("");

  alert("✅ Customer added with ₹5000 balance");
};

const handleUpload = (
  file: File | undefined,
  setter: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (!file) return;

  const url = URL.createObjectURL(file);
  setter(url);
};

const removeFile = (
  setter: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setter(null);
};

 // APPROVE (DB UPDATE)
const approveCustomer = (id: string) => {
  const db = getAllCustomers();

  const updated = db.map((c: any) =>
    c.id === id ? { ...c, status: "APPROVED" } : c
  );

  saveDB(updated);
  setCustomers(updated);

  alert("✅ Customer approved successfully");
};
if (!isClient) return null;


 
 const blockCustomer = (accountNumber: string) => {
  const db = getAllCustomers();

  const updated = db.map((c: any) =>
    c.accountNumber === accountNumber
      ? { ...c, status: "BLOCKED" }
      : c
  );

  saveDB(updated);
  setCustomers(updated);

  alert("🚫 Customer blocked successfully");
};

 const unblockCustomer = (accountNumber: string) => {
  const db = getAllCustomers();

  const updated = db.map((c: any) =>
    c.accountNumber === accountNumber
      ? { ...c, status: "APPROVED" }
      : c
  );

  saveDB(updated);
  setCustomers(updated);

  alert("✅ Customer unblocked successfully");
};
    return (
    <div className="min-h-screen bg-[#f2f3f7] font-sans text-[#1f2940]">
      {/* Top Navbar */}
      <header className="w-full bg-[#2457ad] shadow-sm border-b border-blue-800">
        <div className="max-w-[1400px] mx-auto px-8 h-[92px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="text-white text-5xl leading-none">🏛️</div>
            <h1 className="text-white text-[28px] font-bold tracking-tight">
              Staff Dashboard
            </h1>
          </div>

          <div className="flex items-center text-white text-[18px] font-semibold">
            <button className="px-8 hover:opacity-90 transition">Settings</button>
            <div className="h-10 w-px bg-white/20" />
            <button 
            onClick={handleLogout}
            className="px-8 hover:opacity-90 transition">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1320px] mx-auto px-10 pt-12 pb-16">
        {/* Welcome */}
        <section>
          <h2 className="text-[58px] md:text-[40px] font-bold flex items-center gap-4 text-[#20293d] leading-none">
            <span className="text-[52px]">👋</span>
            Welcome, Officer
          </h2>

          <p className="mt-8 text-[26px] text-[#2b3348] font-medium">
            <span className="font-bold">Branch:</span> Kampala Main Branch
          </p>
        </section>

        <div className="mt-8 border-t border-[#d8dce5]" />

        {/* Quick Stats */}
        <section className="mt-10">
          <h3 className="text-[34px] font-bold text-[#1f2940] mb-8">
            Quick Stats:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pending */}
            <div className="rounded-md overflow-hidden border border-[#d8dce5] bg-white shadow-sm">
              <div className="bg-[#efd778] px-7 py-6 flex items-center gap-5">
                <div className="w-15 h-15 rounded-full border-4 border-[#b08f2f] flex items-center justify-center text-[#b08f2f] text-3xl">
                  ◷
                </div>
                <span className="text-[24px] font-medium text-[#24314f]">
                  Pending Applications
                </span>
              </div>
              <div className="bg-white py-6 text-center text-[56px] font-bold text-[#1c2438]">
              {pendingCount}
              </div>
            </div>

            {/* Approved */}
            <div className="rounded-md overflow-hidden border border-[#d8dce5] bg-white shadow-sm">
              <div className="bg-[#63b266] px-7 py-6 flex items-center gap-5">
                <div className="w-18 h-14 rounded-full bg-white flex items-center justify-center text-[#63b266] text-3xl font-bold">
                  ✓
                </div>
                <span className="text-[24px] font-medium text-white">
                  Approved Today
                </span>
              </div>
              <div className="bg-white py-6 text-center text-[56px] font-bold text-[#1c2438]">
              {approvedCount}
              </div>
            </div>

            {/* Customers */}
            <div className="rounded-md overflow-hidden border border-[#d8dce5] bg-white shadow-sm">
              <div className="bg-[#4f89dc] px-7 py-6 flex items-center gap-5">
                <div className="text-white text-5xl">👥</div>
                <span className="text-[24px] font-medium text-white">
                  Total Customers
                </span>
              </div>
              <div className="bg-white py-6 text-center text-[56px] font-bold text-[#1c2438]">
             {totalCustomers}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 border-t border-[#d8dce5]" />

        {/* Actions Row 1 */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
         <button
        onClick={() => setOpen(true)}
        className="h-[92px] rounded-md bg-[#4690f0] text-white text-[24px] font-bold flex items-center px-8 gap-5 shadow-sm border border-[#5fa0f5] hover:bg-[#3d84df] transition"
      >
        <span className="text-[54px] leading-none">＋</span>
        Add New Customer
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-full">
          
          <div className="bg-white w-[450px] max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-lg relative">
            {/* Close button */}
            <button
             type="button"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Banking Staff - Add Customer
            </h2>

            <form onSubmit={handleAddCustomer}
            className="flex flex-col gap-3">
 

           <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border p-2 rounded"
/>

             <input
  type="text"
  placeholder="Adhaar Number"
  value={aadhaar}
  onChange={(e) => setAadhaar(e.target.value)}
  className="border p-2 rounded"
/>

              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 rounded"
              />
              <select
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  className="border p-2 rounded"
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
               <input
                type="text"
                placeholder="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="border p-2 rounded"
              />
              <input
  type="date"
  className="border p-2 rounded"
  value={dob}
  min="1965-01-01"
  max="2026-12-31"
  onChange={(e) => setDob(e.target.value)}
/>

              <select className="border p-2 rounded text-gray-700">
    <option value="">Select Account Type</option>
    <option value="savings">Savings Account</option>
    <option value="current">Current Account</option>
    <option value="fixed">Fixed Deposit</option>
  </select>
               <input
                type="text"
                placeholder="Address"
                className="border p-2 rounded"
              />
              
   {/* 📸 PHOTO */}
      <div className="border p-3 rounded">
        <div className="flex justify-between items-center">
          <span>Upload Photo</span>

          <label className="w-10 h-10 flex items-center justify-center text-black text-2xl cursor-pointer border rounded-full">
            +
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleUpload(e.target.files?.[0], setPhoto)
              }
            />
          </label>
        </div>

        {photo && (
          <div className="relative w-20 h-20 mt-3">
            <img
              src={photo}
              className="w-20 h-20 object-cover rounded border"
            />

            {/* ❌ Delete */}
            <button
              onClick={() => removeFile(setPhoto)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      {/* 🪪 ID PROOF */}
      <div className="border p-3 rounded">
        <div className="flex justify-between items-center">
          <span>Upload ID Proof</span>

          <label className="w-10 h-10 flex items-center justify-center text-black text-2xl cursor-pointer border rounded-full">
            +
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) =>
                handleUpload(e.target.files?.[0], setIdProof)
              }
            />
          </label>
        </div>

        {idProof && (
          <div className="relative w-20 h-20 mt-3">
            <img
              src={idProof}
              className="w-20 h-20 object-cover rounded border"
            />

            <button
              onClick={() => removeFile(setIdProof)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      {/* ✍️ SIGNATURE */}
      <div className="border p-3 rounded">
        <div className="flex justify-between items-center">
          <span>Upload Signature</span>

          <label className="w-10 h-10 flex items-center justify-center text-black text-2xl cursor-pointer border rounded-full">
            +
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleUpload(e.target.files?.[0], setSignature)
              }
            />
          </label>
        </div>

        {signature && (
          <div className="relative w-20 h-20 mt-3">
            <img
              src={signature}
              className="w-20 h-20 object-cover rounded border"
            />

            <button
              onClick={() => removeFile(setSignature)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
{/* 📋 CUSTOMER LIST */}
      <div className="mt-6 space-y-2">
  {pendingCustomers.map((c) => (
    <div key={c.id} className="flex justify-between border p-3">
      <div>
        <p><b>Name:</b> {c.name}</p>
        <p><b>Phone:</b> {c.phone}</p>
        <p><b>Account No:</b> {c.accountNumber}</p>
        <p><b>IFSC:</b> {c.ifsc}</p>
        <p><b>Status:</b> {c.status}</p>
      </div>

      <button
        onClick={() => approveCustomer(c.id)}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Approve
      </button>
    </div>
  ))}
</div>

              <div className="flex gap-2 mt-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded w-full"
                >
                  Verify & Add
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded w-full"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
      

    
    <button
  onClick={() => setShowApplications(true)}
  className="h-[92px] rounded-md bg-[#eef0f5] border border-[#cdd2db] text-[#2c3549] text-[24px] font-medium flex items-center px-8 gap-5 shadow-sm hover:bg-[#e7eaf0] transition"
>
  <span className="text-[44px]">📄</span>
  View Applications
</button>
{showApplications && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white w-[500px] max-h-[80vh] overflow-y-auto p-6 rounded-lg">
      
      <h2 className="text-xl font-bold mb-4">Approved Customers</h2>

      {approvedCustomers.length === 0 && (
        <p>No approved customers</p>
      )}

      <div className="space-y-3">
      {approvedCustomers.map((c, index) => (
           <div
    key={c.accountNumber || c.phone || index}
    className="border p-3"
  >
            <p><b>Name:</b> {c.name}</p>
            <p><b>Phone:</b> {c.phone}</p>
            <p><b>Account No:</b> {c.accountNumber}</p>
            <p><b>IFSC:</b> {c.ifsc}</p>
            <p><b>Status:</b> {c.status}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowApplications(false)}
        className="mt-4 bg-gray-300 px-4 py-2 rounded w-full"
      >
        Close
      </button>
    </div>
  </div>
)}
          <button className="h-[92px] rounded-md bg-[#eef0f5] border border-[#cdd2db] text-[#2c3549] text-[24px] font-medium flex items-center px-8 gap-5 shadow-sm hover:bg-[#e7eaf0] transition">
            <span className="text-[44px]">🔍</span>
            Search Customer
          </button>
        </section>

        <div className="mt-8 border-t border-[#d8dce5]" />

        {/* Actions Row 2 */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="h-[92px] rounded-md bg-[#eef0f5] border border-[#cdd2db] text-[#2c3549] text-[24px] font-medium flex items-center px-8 gap-5 shadow-sm hover:bg-[#e7eaf0] transition">
            <span className="text-[44px]">🪪</span>
            KYC Verification
          </button>

          <button className="h-[92px] rounded-md bg-[#eef0f5] border border-[#cdd2db] text-[#2c3549] text-[24px] font-medium flex items-center px-8 gap-5 shadow-sm hover:bg-[#e7eaf0] transition">
            <span className="text-[44px]">💳</span>
            Create Account
          </button>

          <button   onClick={() => setShowReport(true)}
          className="h-[92px] rounded-md bg-[#eef0f5] border border-[#cdd2db] text-[#2c3549] text-[24px] font-medium flex items-center px-8 gap-5 shadow-sm hover:bg-[#e7eaf0] transition">
            <span className="text-[44px]">📊</span>
            Reports
          </button>
        {/* 📊 CUSTOMER REPORT */}
{showReport && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto p-6 rounded-lg">

      <h2 className="text-xl font-bold mb-4">Customer Report</h2>

      {getAllCustomers().map((c: any, index: number) => (
        <div
          key={c.accountNumber || index}
          className="border p-3 mb-3"
        >
          <p><b>Name:</b> {c.name}</p>
          <p><b>Phone:</b> {c.phone}</p>
          <p><b>Account No:</b> {c.accountNumber}</p>
          <p><b>IFSC:</b> {c.ifsc}</p>
          <p><b>Status:</b> {c.status}</p>

          <div className="flex gap-2 mt-2">
            {c.status === "BLOCKED" ? (
              // 🔴 ONLY UNBLOCK
              <button
                onClick={() => unblockCustomer(c.accountNumber)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Unblock
              </button>
            ) : (
              // 🟢 BOTH BUTTONS
              <>
                <button
                  onClick={() => blockCustomer(c.accountNumber)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Block
                </button>

                <button
                  onClick={() => unblockCustomer(c.accountNumber)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Unblock
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowReport(false)}
        className="mt-4 bg-gray-300 px-4 py-2 rounded w-full"
      >
        Close
      </button>

    </div>
  </div>
)}
        </section>
      </main>
    </div>
  );
}
