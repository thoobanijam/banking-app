import { getAllCustomers, saveDB } from "./bankDB";

const DAILY_LIMIT = 10000;
const MAX_TX = 3;
const PENALTY_RATE = 0.045;

export function processTransaction(customerId: string, amount: number) {
  const db = getAllCustomers();

  const updated = db.map((c: any) => {
    if (c.id !== customerId) return c;

    let count = c.dailyTransactionCount || 0;
    let total = c.dailyTransactionTotal || 0;
    let balance = c.balance || 50000;

    count += 1;
    total += amount;

    // ❌ CONDITION 1: DAILY LIMIT EXCEEDED
    if (total > DAILY_LIMIT) {
      return {
        ...c,
        status: "BLOCKED",
        reason: "Daily limit exceeded (10,000)",
      };
    }

    // ❌ CONDITION 2: 4th transaction rule
    if (count > MAX_TX) {
      const penalty = amount * PENALTY_RATE;
      balance -= penalty;

      return {
        ...c,
        status: "BLOCKED",
        balance,
        dailyTransactionCount: count,
        dailyTransactionTotal: total,
        reason: "4th transaction penalty applied (4.5%)",
      };
    }

    return {
      ...c,
      balance,
      dailyTransactionCount: count,
      dailyTransactionTotal: total,
    };
  });

  saveDB(updated);

  return {
    success: true,
    message: "Transaction processed",
  };
}