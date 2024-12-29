import { LoanCalculationStrategy } from "./loanCalculatorStrategy";

export class LoanCalculatorContext {
    private strategy: LoanCalculationStrategy;

    setStrategy(strategy: LoanCalculationStrategy) {
        this.strategy = strategy;
    }

    calculate(loanAmount: number, interestRate: number, loanTerm: number) {
        if (!this.strategy) {
            throw new Error("Strategy not set");
        }
        return this.strategy.calculate(loanAmount, interestRate, loanTerm);
    }
}
