export const DAILY_LIMIT = 100000;
export const MAX_TRANSACTIONS_PER_DAY = 3;
export const PENALTY_RATE = 0.045;

export function calculatePenalty(amount: number) {
  return amount * PENALTY_RATE;
}