
/**
 * Calculates the monthly mortgage repayment (P&I).
 * @param {number} principal - The total loan amount.
 * @param {number} annualInterestRate - The annual interest rate as a percentage (e.g., 5.25).
 * @param {number} loanTermYears - The loan term in years.
 * @returns {number} The calculated monthly repayment.
 */
export function calculateMonthlyRepayment(principal: number, annualInterestRate: number, loanTermYears: number): number {
  // Convert annual rate to a monthly decimal
  const monthlyInterestRate = (annualInterestRate / 100) / 12;

  // Convert loan term from years to months
  const numberOfPayments = loanTermYears * 12;

  // Use the monthly repayment formula
  const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

  const monthlyRepayment = principal * (numerator / denominator);
  return monthlyRepayment;
}

/**
 * Calculates the total mortgage repayment over the loan term.
 * @param {number} monthlyRepayment - The monthly repayment amount.
 * @param {number} loanTermYears - The loan term in years.
 * @returns {number} The total amount repaid.
 */
export function calculateTotalRepayment(monthlyRepayment: number, loanTermYears: number): number {
  // Convert loan term from years to months
  const numberOfPayments = loanTermYears * 12;

  // Calculate total repayment
  const totalRepayment = monthlyRepayment * numberOfPayments;
  return totalRepayment;
}

/**
 * Calculates the monthly repayment for an interest-only mortgage.
 * @param {number} principal - The total loan amount.
 * @param {number} annualInterestRate - The annual interest rate as a percentage (e.g., 5.25).
 * @returns {number} The calculated monthly repayment.
 */
export function calculateInterestOnlyMonthlyRepayment(principal: number, annualInterestRate: number): number {
  // Convert annual rate to a monthly decimal
  const monthlyInterestRate = (annualInterestRate / 100) / 12;

  // Monthly repayment is just the interest on the principal
  const monthlyRepayment = principal * monthlyInterestRate;
  return monthlyRepayment;
}

/**
 * Calculates the total repayment for an interest-only mortgage.
 * @param {number} monthlyRepayment - The monthly repayment amount.
 * @param {number} loanTermYears - The loan term in years.
 * @param {number} principal - The original principal amount.
 * @returns {number} The total amount repaid.
 */
export function calculateInterestOnlyTotalRepayment(monthlyRepayment: number, loanTermYears: number, principal: number): number {
  // Convert loan term from years to months
  const numberOfPayments = loanTermYears * 12;

  // Calculate total repayment (interest + principal at end)
  const totalRepayment = (monthlyRepayment * numberOfPayments) + principal;
  return totalRepayment;
}