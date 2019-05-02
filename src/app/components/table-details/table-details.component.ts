import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { toCanvas } from 'qrcode';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

import { TableService } from 'src/app/services/table/table.service';
import { TableItemService } from 'src/app/services/table-item/table-item.service';
import { UserService } from 'src/app/services/user/user.service';

import { Table, TableItem, User, TableEvent, ItemPayEvent, TableEventType, UserJoinEvent, UserLeaveEvent } from 'src/app/models';

import { NewItemDialogComponent } from './new-item-dialog/new-item-dialog.component';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';

import { UserNamePipe } from 'src/app/pipes/user-name/user-name.pipe';
import { ItemNamePipe } from 'src/app/pipes/item-name/item-name.pipe';

interface UserNode {
  _id: string;
  isUser: boolean;
  name: string;
  children: UserNode[];
}

interface UserTreeNode {
  _id: string;
  name: string;
  numItems: number;
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {

  private nodeTransformer = (user: User): UserNode => {
    return {
      _id: user._id,
      isUser: true,
      name: this._userNamePipe.transform(user),
      children: user.paidForItems.map(item => ({
        _id: item._id,
        isUser: false,
        name: this._itemNamePipe.transform(item),
        children: [],
      })),
    };
  }
  
  private treeNodeTransformer = (node: UserNode, level: number): UserTreeNode => {
    return {
      _id: node._id,
      name: node.name,
      numItems: node.children.length,
      expandable: node.isUser,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<UserTreeNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.treeNodeTransformer, node => node.level, node => node.expandable, node => node.children);

  tableDisplayedColumns: string[] = ['name', 'createdAt'];
  usersDisplayedColumns: string[] = ['name', 'joinedTableAt', 'actions'];
  itemsDisplayedColumns: string[] = ['name', 'price', 'paidForAt', 'paidForBy', 'actions'];
  eventsDisplayedColumns: string[] = ['date', 'details'];

  tableDataSource = new MatTableDataSource<Table>();
  itemsDataSource = new MatTableDataSource<TableItem>();
  usersDataSource = new MatTreeFlatDataSource<UserNode, UserTreeNode>(this.treeControl, this.treeFlattener);
  eventsDataSource = new MatTableDataSource<TableEvent>();

  tableId: string;
  allUsers: User[] = [];
  usersAtTable: User[] = [];

  public readonly TableEventType = TableEventType;

  @ViewChild('qrCode') qrCodeEl: ElementRef;

  constructor(
    private readonly _tableService: TableService,
    private readonly _tableItemService: TableItemService,
    private readonly _userService: UserService,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _userNamePipe: UserNamePipe,
    private readonly _itemNamePipe: ItemNamePipe,
  ) {}

  hasChild = (_: number, node: UserTreeNode) => node.expandable;

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.tableId = params['id'];

      this._tableService.getTableById(this.tableId).subscribe((table: Table) => {
        toCanvas(this.qrCodeEl.nativeElement, table._id);
        this.tableDataSource.data = [table];
      });

      this._tableItemService.getTableItems(this.tableId).subscribe((items: TableItem[]) => {
        this.itemsDataSource.data = items;
        this.updateTableEvents();
      });

      this._userService.getTableUsers(this.tableId).subscribe((users: User[]) => {
        this.allUsers = users;
        this.usersAtTable = this.allUsers.filter(user => !user.leftTableAt);
        this.usersDataSource.data = this.usersAtTable.map(this.nodeTransformer);
        this.updateTableEvents();
      });
    });
  }

  onTableNameChange(table: Table, tableName: string) {
    this._tableService.updateTable(table._id, { name: tableName }).subscribe(() => {
      table.name = tableName;
    });
  }

  openNewItemDialog() {
    const dialogRef = this._dialog.open(NewItemDialogComponent, {
      width: '250px',
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((item: TableItem) => {
      if (item) {
        this.addItemToTable(item);
      }
    });
  }

  openNewUserDialog() {
    const dialogRef = this._dialog.open(NewUserDialogComponent, {
      width: '250px',
      data: { firstName: '', lastName: '', email: 'a@b.co', password: '123' },
    });

    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.addUserToTable(user);
      }
    });
  }

  onItemNameChange(item: TableItem, itemName: string) {
    this._tableItemService.updateTableItem(item._id, { name: itemName }).subscribe(() => {
      item.name = itemName;
    });
  }

  onItemPriceChange(item: TableItem, itemPrice: string) {
    this._tableItemService.updateTableItem(item._id, { price: +itemPrice }).subscribe(() => {
      item.price = +itemPrice;
    });
  }

  payForItem(item: TableItem, user: User) {
    this._tableItemService.payForTableItems(item._id, user._id);
  }

  removeItem(item: TableItem) {
    this._tableItemService.removeTableItem(item._id);
  }

  removeUser(user: User) {
    this._userService.removeUserFromTable(this.tableId, user);
  }

  private addItemToTable(item: TableItem) {
    this._tableItemService.addItemToTable(this.tableId, item);
  }

  private addUserToTable(user: User) {
    this._userService.addUser(user).subscribe((insertedUser: User) => {
      this._userService.addUserToTable(this.tableId, insertedUser);
    });
  }

  private updateTableEvents() {
    const itemPayEvents: ItemPayEvent[] = this.itemsDataSource.data
      .filter(item => !!item.paidForAt)
      .map(paidForItem => ({
          type: TableEventType.ItemPay,
          date: paidForItem.paidForAt,
          tableItem: paidForItem,
          user: paidForItem.paidForBy,
        }));
    
    const userJoinEvents: UserJoinEvent[] = this.allUsers
      .map(user => ({
          type: TableEventType.UserJoin,
          date: user.joinedTableAt,
          user,
        }));
    
    const userLeaveEvents: UserLeaveEvent[] = this.allUsers
      .filter(user => !!user.leftTableAt)
      .map(user => ({
        type: TableEventType.UserLeave,
        date: user.leftTableAt,
        user,
      }));

    this.eventsDataSource.data = [...itemPayEvents, ...userJoinEvents, ...userLeaveEvents]
      .sort((a, b) => a.date > b.date ? 1 : -1);
  }

}
