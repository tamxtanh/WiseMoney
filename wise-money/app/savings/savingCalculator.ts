//app/savings/savingCalculator.ts
import { InterestCalculationStrategy } from "./strategies";


export class SavingsCalculator {
    private strategy: InterestCalculationStrategy;

    constructor(strategy: InterestCalculationStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: InterestCalculationStrategy) {
        this.strategy = strategy;
    }

    calculate(
        principal: number,
        rate: number,
        time: number,
        periodicDeposit: number
    ) {
        return this.strategy.calculate(principal, rate, time, periodicDeposit);
    }
}
