import { Customer } from "../data/customers";

export const updateStatus = (
  customers: Customer[],
  id: number,
  status: Customer["status"]
) => {
  return customers.map((c) =>
    c.id === id ? { ...c, status } : c
  );
};