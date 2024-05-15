export interface Group {
  id: number;
  image_url: string;
  type: string;
  name: string;
  value: number;
}

export interface CategoryTransaction {
  id: number;
  image_url: string;
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
  image_url: string;
  category_name: string;
  type: string;
  date: Date;
  value: number;
}

export interface PercentageTransaction {
  id: number;
  image_url: string;
  category_name: string;
  percentage: number;
  value: number;
}

export interface DateTransactionWithoutImage {
  id: number;
  type: string;
  note: string;
  date: Date;
  value: number;
}

export interface TransactionListByCategory {
  id_category: number;
  category_name: string;
  total_transaction: number;
  image_url: string;
  total: number;
  transactions: DateTransactionWithoutImage[];
}
