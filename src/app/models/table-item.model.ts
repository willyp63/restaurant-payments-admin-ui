import { User } from "./user.model";

export interface TableItem {
  _id: string;
  name: string;
  price: number;
  paidForAt?: string;
  paidForBy?: User;
}
