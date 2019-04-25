import { TableItem } from './table-item.model';

export interface Table {
  _id: string;
  name: string;
  createdAt: string;
  items?: TableItem[];
}
