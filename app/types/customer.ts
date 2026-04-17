type Customer = {
  id: number;
  name: string;
  phone: string;
  accountNumber: string;
  ifsc: string;
  status: "PENDING" | "APPROVED" | "BLOCKED" | "ACTIVE";
  createdAt: string;

  balance?: number;
  transactions?: {
    id: string;
    amount: number;
    date: string;
    fee?: number;
  }[];
};