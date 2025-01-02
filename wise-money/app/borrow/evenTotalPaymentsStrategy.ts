import { LoanCalculationStrategy } from "./loanCalculatorStrategy";

export class EvenTotalPaymentsStrategy implements LoanCalculationStrategy {
    calculate(loanAmount, interestRate, loanTerm) {
        const monthlyInterestRate = interestRate / 100 / 12;
        const monthlyPayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));
        let balance = loanAmount;
        const result = [];
        let totalInterest = 0;
        for (let i = 1; i <= loanTerm; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;
            totalInterest += interestPayment;
            result.push({
                period: i,
                payment: monthlyPayment.toFixed(2),
                endingBalance: balance.toFixed(2),
            });
        }

        return { result, totalInterest };
    }
}
