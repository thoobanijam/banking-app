const KEY = "bankDB";

/* ---------------- INITIAL DATA ---------------- */
const initial = [
  {
    id: 1,
    name: "Devi",
    accountNumber: "AC887410",
    balance: 5000,
    transactions: [],
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Devi",
    accountNumber: "AC443333",
    balance: 6000,
    transactions: [],
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Vijay",
    accountNumber: "AC757948",
    balance: 7000,
    transactions: [],
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Sangeetha",
    accountNumber: "AC142602",
    balance: 8000,
    transactions: [],
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Sangeetha",
    accountNumber: "AC681671",
    balance: 9000,
    transactions: [],
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Fathima Thooba",
    accountNumber: "AC465451",
    balance: 10000,
    transactions: [],
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    createdAt: new Date().toISOString(),
  },
];

/* ---------------- INIT DB ---------------- */
export const initBankDB = () => {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem(KEY);

  if (!existing || JSON.parse(existing).length === 0) {
    localStorage.setItem(KEY, JSON.stringify(initial));
  }
};

/* ---------------- GET ALL CUSTOMERS ---------------- */
export const getAllCustomers = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

/* ---------------- SAVE DB ---------------- */
export const saveDB = (data: any[]) => {
  localStorage.setItem(KEY, JSON.stringify(data));

  // ✅ 🔥 ADD THIS LINE (VERY IMPORTANT)
  window.dispatchEvent(new Event("bank-update"));
};
/* ---------------- GET CURRENT USER ---------------- */
export const getCurrentCustomer = () => {
  const acc = localStorage.getItem("accountNumber");
  const db = getAllCustomers();
  return db.find((c: any) => c.accountNumber === acc);
};
/* ---------------- ADD CUSTOMER ---------------- */
export const addCustomer = (user: any) => {
  const db = getAllCustomers();

  const exists = db.some(
    (c: any) => c.accountNumber === user.accountNumber
  );

  if (exists) {
    alert("Customer already exists");
    return db;
  }

  const newCustomer = {
    id: crypto.randomUUID(), // ✅ FIXED ID
    name: user.name,
    phone: user.phone,
    aadhaar: user.aadhaar,
    gender: user.gender,
    nationality: user.nationality,
    dob: user.dob,
    accountNumber: user.accountNumber,
    ifsc: "BANK001",

    balance: 5000, // ✅ HERE IS YOUR FIX

    status: "PENDING",
    transactions: [],
    createdAt: new Date().toISOString(),
  };

  const updated = [...db, newCustomer];
  saveDB(updated);

  return updated;
};


export const syncBankFromServer = async () => {
  try {
    const res = await fetch("/api/customer");
    const apiCustomers = await res.json();

    if (!Array.isArray(apiCustomers)) return;

    let db = getAllCustomers();

    apiCustomers.forEach((apiUser: any) => {
      const index = db.findIndex(
        (u: any) => u.accountNumber === apiUser.accountNumber
      );

      const mappedUser = {
        id: apiUser.id || crypto.randomUUID(),
        name: apiUser.name,
        phone: apiUser.phone || "",
        accountNumber: apiUser.accountNumber,
        ifsc: apiUser.ifsc || "BANK001",
        balance: apiUser.balance || 0,
        transactions: db[index]?.transactions || [],
        status: apiUser.status || "APPROVED",
        dailyTransactionCount: db[index]?.dailyTransactionCount || 0,
        dailyTransactionTotal: db[index]?.dailyTransactionTotal || 0,
        createdAt: db[index]?.createdAt || new Date().toISOString(),
      };

      if (index === -1) {
        db.push(mappedUser);
      } else {
        db[index] = { ...db[index], ...mappedUser };
      }
    });

    saveDB(db);
  } catch (err) {
    console.error("Sync error:", err);
  }
};
export const transferMoney = (toAccount: string, amount: number) => {
  let db = getAllCustomers();
  const sender = getCurrentCustomer();

  if (!sender) {
    alert("User not found");
    return;
  }

  if (sender.status === "BLOCKED") {
    alert("⚠ Your account is BLOCKED");
    return;
  }

  const receiverIndex = db.findIndex(
    (u: any) => u.accountNumber === toAccount
  );

  if (receiverIndex === -1) {
    alert("Receiver not found");
    return;
  }

  const receiver = db[receiverIndex];

  if (amount <= 0) {
    alert("Invalid amount");
    return;
  }

  const date = new Date().toISOString();
  const today = new Date().toDateString();

  // ✅ today's transactions only
  const todayTransactions = (sender.transactions || []).filter(
    (t: any) => new Date(t.date).toDateString() === today
  );

  const transactionCount = todayTransactions.length;

  // 🚨 BLOCK ON 4TH TRANSACTION
  if (transactionCount >= 3) {
    const penalty = amount * 0.045;

    alert(
      `🚫 LIMIT REACHED!\n4th transaction not allowed.\nPenalty would be: ${penalty.toFixed(
        2
      )}`
    );

    // 🔴 BLOCK ACCOUNT
    const updatedDB = db.map((u: any) =>
      u.accountNumber === sender.accountNumber
        ? { ...u, status: "BLOCKED" }
        : u
    );

    saveDB(updatedDB);

    return;
  }

  // ✅ NORMAL TRANSFER
  if (sender.balance < amount) {
    alert("❌ Insufficient balance");
    return;
  }

  let updatedSender = { ...sender };
  let updatedReceiver = { ...receiver };

  updatedSender.balance -= amount;
  updatedReceiver.balance += amount;

  updatedSender.transactions = [
    {
      date,
      details: `To ${receiver.name}`,
      amount,
      type: "Dr",
      balance: updatedSender.balance,
    },
    ...(sender.transactions || []),
  ];

  updatedReceiver.transactions = [
    {
      date,
      details: `From ${sender.name}`,
      amount,
      type: "Cr",
      balance: updatedReceiver.balance,
    },
    ...(receiver.transactions || []),
  ];

  db = db.map((u: any) => {
    if (u.accountNumber === sender.accountNumber) return updatedSender;
    if (u.accountNumber === receiver.accountNumber) return updatedReceiver;
    return u;
  });

  saveDB(db);
};

// ensure db  //
export const ensureBankDB = () => {
  if (typeof window === "undefined") return;

  const data = localStorage.getItem(KEY);

  if (!data || data === "[]") {
    localStorage.setItem(KEY, JSON.stringify(initial));
  }
};