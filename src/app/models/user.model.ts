import { TableItem } from './table-item.model';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email?: boolean;
  joinedTableAt?: string;
  leftTableAt?: string;
  paidForItems?: TableItem[];
}
