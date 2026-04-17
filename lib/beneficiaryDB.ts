const getKey = () => {
  const acc = localStorage.getItem("accountNumber");
  return `beneficiaries_${acc}`;
};

export const getBeneficiaries = () => {
  if (typeof window === "undefined") return [];

  const key = getKey();
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const saveBeneficiaries = (data: any[]) => {
  const key = getKey();
  localStorage.setItem(key, JSON.stringify(data));
};