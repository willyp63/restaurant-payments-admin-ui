import { User } from './user.model';
import { TableItem } from './table-item.model';

export enum TableEventType {
  ItemPay,
  UserJoin,
  UserLeave,
}

export interface TableEvent {
  type: TableEventType;
  date: string;
}

export interface ItemPayEvent extends TableEvent {
  tableItem?: TableItem;
  user?: User;
}

export interface UserJoinEvent extends TableEvent {
  user?: User;
}

export interface UserLeaveEvent extends TableEvent {
  user?: User;
}
