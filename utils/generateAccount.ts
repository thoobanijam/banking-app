export function generateAccountNumber() {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

export const branchIFSC: Record<string, string> = {
  "Kampala Main Branch": "BANK0001234",
  "City Branch": "BANK0005678",
};