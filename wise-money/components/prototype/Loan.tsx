import { ICloneableTransaction } from "./ICloneableTransaction";
import { Transaction } from "./Transaction";

export class Loan extends Transaction {
  clone(): ICloneableTransaction {
    return new Loan(
      this.id,
      this.amount,
      this.categoryId,
      this.note,
      this.date,
      this.contactId,
      this.remindId,
      this.imageId,
      this.walletId,
      this.exception
    );
  }
}
