export type Customer = {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  dailyTransactionCount: number;
  dailyTransactionTotal: number;
  transactions: any[];
};

export const customers: Customer[] = [
  {
    id: 1,
    name: "Devi",
    accountNumber: "AC887410",
    balance: 5000,
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    transactions: [],
  },
  {
    id: 2,
    name: "Devi",
    accountNumber: "AC443333",
    balance: 6000,
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    transactions: [],
  },
  {
    id: 3,
    name: "Vijay",
    accountNumber: "AC757948",
    balance: 7000,
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    transactions: [],
  },
  {
    id: 4,
    name: "sangeetha",
    accountNumber: "AC142602",
    balance: 8000,
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    transactions: [],
  },
  {
    id: 5,
    name: "sangeetha",
    accountNumber: "AC681671",
    balance: 9000,
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    transactions: [],
  },
  {
    id: 6,
    name: "Fathima Thooba",
    accountNumber: "AC465451",
    balance: 10000,
    status: "APPROVED",
    dailyTransactionCount: 0,
    dailyTransactionTotal: 0,
    transactions: [],
  },
];