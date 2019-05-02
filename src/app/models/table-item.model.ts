import { User } from './user.model';

export interface TableItem {
  _id: string;
  name: string;
  price: number;
  tableId?: string;
  paidForAt?: string;
  paidForBy?: User;
}
