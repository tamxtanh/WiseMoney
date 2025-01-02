import { LoanCalculationStrategy } from "./loanCalculatorStrategy";

export class EvenPrincipalPaymentsStrategy implements LoanCalculationStrategy {
    calculate(loanAmount, interestRate, loanTerm) {
        const monthlyInterestRate = interestRate / 100 / 12;
        const principalPayment = loanAmount / loanTerm;
        let balance = loanAmount;
        const result = [];
        let totalInterest = 0;

        for (let i = 1; i <= loanTerm; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const monthlyPayment = principalPayment + interestPayment;
            balance -= principalPayment;
            if (balance < 0) balance = 0;

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
