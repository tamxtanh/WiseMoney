import { Loan } from "./Loan";
import { Debt } from "./Debt";
import { Income } from "./Income";
import { Expense } from "./Expense";

// Raw data type definition (example)
interface RawData {
  type: string;
  id: number;
  amount: number;
  categoryId: number;
  note: string;
  date: Date;
  contactId: number;
  remindId: number;
  imageId: number;
  walletId: number;
  exception: boolean;
}

export class TransactionCreator {
  // Function to map raw data to the appropriate transaction type
  mapRawDataToTransaction(raw: RawData): Loan | Debt | Income | Expense {
    switch (raw.type) {
      case "loan":
        return new Loan(
          raw.id,
          raw.amount,
          raw.categoryId,
          raw.note,
          raw.date,
          raw.contactId,
          raw.remindId,
          raw.imageId,
          raw.walletId,
          raw.exception
        );
      case "debt":
        return new Debt(
          raw.id,
          raw.amount,
          raw.categoryId,
          raw.note,
          raw.date,
          raw.contactId,
          raw.remindId,
          raw.imageId,
          raw.walletId,
          raw.exception
        );
      case "income":
        return new Income(
          raw.id,
          raw.amount,
          raw.categoryId,
          raw.note,
          raw.date,
          raw.contactId,
          raw.remindId,
          raw.imageId,
          raw.walletId,
          raw.exception
        );
      case "expense":
        return new Expense(
          raw.id,
          raw.amount,
          raw.categoryId,
          raw.note,
          raw.date,
          raw.contactId,
          raw.remindId,
          raw.imageId,
          raw.walletId,
          raw.exception
        );
      default:
        throw new Error(`Unknown transaction type: ${raw.type}`);
    }
  }
}
