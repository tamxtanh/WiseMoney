export interface LoanCalculationStrategy {
    calculate(loanAmount: number, interestRate: number, loanTerm: number): {
        result: { period: number; payment: string; endingBalance: string }[];
        totalInterest: number;
    };
}
