// InterestCalculationStrategy interface
export interface InterestCalculationStrategy {
    calculate(
        principal: number,
        rate: number,
        time: number,
        periodicDeposit: number
    ): {
        balance: number;
        totalInterest: number;
        resultTable: { interest: string; balance: string }[];
    };
}

// Base class for shared logic
abstract class BaseCycleCalculation implements InterestCalculationStrategy {
    protected periodsPerYear: number;

    constructor(periodsPerYear: number) {
        this.periodsPerYear = periodsPerYear;
    }

    calculate(principal: number, rate: number, time: number, periodicDeposit: number) {
        const n = this.periodsPerYear; // Cycles per year (e.g., 12 for monthly, 1 for yearly)
        let balance = principal;
        let totalInterest = 0;
        const resultTable = [];

        const totalCycles = Math.ceil(time * n);

        for (let cycle = 1; cycle <= totalCycles; cycle++) {
            // Apply interest based on the cycle
            const interestEarned = balance * rate;
            balance += interestEarned;
            totalInterest += interestEarned;

            // Apply periodic deposit
            balance += periodicDeposit;

            // Record the result for this cycle
            resultTable.push({
                interest: interestEarned.toFixed(2),
                balance: balance.toFixed(2),
            });
        }

        return { balance, totalInterest, resultTable };
    }
}

// Daily interest cycle
export class DailyCalculation extends BaseCycleCalculation {
    constructor() {
        super(365);
    }
}

// Weekly interest cycle
export class WeeklyCalculation extends BaseCycleCalculation {
    constructor() {
        super(52);
    }
}

// Monthly interest cycle
export class MonthlyCalculation extends BaseCycleCalculation {
    constructor() {
        super(12);
    }
}

// Yearly interest cycle
export class YearlyCalculation extends BaseCycleCalculation {
    constructor() {
        super(1);
    }
}

// StrategyFactory for selecting the appropriate strategy
export class StrategyFactory {
    static getStrategy(cycle: string): InterestCalculationStrategy {
        switch (cycle.toLowerCase()) {
            case "daily":
                return new DailyCalculation();
            case "weekly":
                return new WeeklyCalculation();
            case "monthly":
                return new MonthlyCalculation();
            case "yearly":
                return new YearlyCalculation();
            default:
                throw new Error(`Unsupported interest cycle: ${cycle}`);
        }
    }
}
