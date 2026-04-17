type ApprovedCustomer = {
  name: string;
  phone: string;
  accountNumber: string;
  ifsc: string;
  status: "APPROVED" | "BLOCKED";
};

export const approvedCustomers: ApprovedCustomer[] = [
  {
    name: "Devi",
    phone: "7128496385",
    accountNumber: "AC887410",
    ifsc: "BANK001",
     status: "APPROVED",
  },
  {
    name: "Devi",
    phone: "7128496385",
    accountNumber: "AC443333",
    ifsc: "BANK001",
     status: "APPROVED",
  },
  {
    name: "Vijay",
    phone: "78945612302",
    accountNumber: "AC757948",
    ifsc: "BANK001",
     status: "APPROVED",
  },
  {
    name: "sangeetha",
    phone: "07895213647",
    accountNumber: "AC142602",
    ifsc: "BANK001",
     status: "APPROVED",
  },
  {
    name: "sangeetha",
    phone: "07895213647",
    accountNumber: "AC681671",
    ifsc: "BANK001",
     status: "APPROVED",
  },
  {
    name: "Fathima Thooba",
    phone: "07010546992",
    accountNumber: "AC465451",
    ifsc: "BANK001",
     status: "APPROVED",
  },
];