import { ICloneableTransaction } from "./ICloneableTransaction";
import { Transaction } from "./Transaction";

export class Income extends Transaction {
  clone(): ICloneableTransaction {
    return new Income(
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
