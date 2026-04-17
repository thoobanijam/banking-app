import { getAllCustomers, saveDB } from "./bankDB";

export const syncBankFromServer = async () => {
  const res = await fetch("/api/customer");
  const apiCustomers = await res.json();

  let db = getAllCustomers();

  apiCustomers.forEach((apiUser: any) => {
    const exists = db.find(
      (u: any) => u.accountNumber === apiUser.accountNumber
    );

    if (!exists) {
      db.push({
        ...apiUser,
        balance: apiUser.balance || 0,
        transactions: [],
        status: apiUser.status || "APPROVED",
        dailyTransactionCount: 0,
        dailyTransactionTotal: 0,
        createdAt: new Date().toISOString(),
      });
    }
  });

  saveDB(db);
};