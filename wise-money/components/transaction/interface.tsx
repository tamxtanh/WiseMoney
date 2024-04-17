export interface Group {
    id: number;
    image: string;
    type: string;
    name: string;
    value: number;
}

export interface CategoryTransaction {
    id: number;
    image: string;
    type: string;
    category_name: string;
    name: string;
    value: number;
}

export interface ListTransactionADay {
    date: Date;
    total: number;
    transactions: CategoryTransaction[];
}

export interface DateTransaction {
    id: number;
    image: string;
    type: string;
    category_name: string;
    date: Date;
    value: number;
}