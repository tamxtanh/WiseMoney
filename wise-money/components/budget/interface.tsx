export interface BudgetData {
    id: number;
    name: string;
    image_url: string;
    amount: number;
    start_date: Date;
    end_date: Date;
    current: number;
    is_done: boolean;
}