import { ICloneableTransaction } from "./ICloneableTransaction";

export abstract class Transaction implements ICloneableTransaction {
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

  constructor(
    id: number,
    amount: number,
    categoryId: number,
    note: string,
    date: Date,
    contactId: number,
    remindId: number,
    imageId: number,
    walletId: number,
    exception: boolean
  ) {
    this.id = id;
    this.amount = amount;
    this.categoryId = categoryId;
    this.note = note;
    this.date = date;
    this.contactId = contactId;
    this.remindId = remindId;
    this.imageId = imageId;
    this.walletId = walletId;
    this.exception = exception;
  }

  abstract clone(): ICloneableTransaction;
}
