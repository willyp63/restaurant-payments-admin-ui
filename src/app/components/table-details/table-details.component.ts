import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../../models/table.model';
import { TableService } from '../../services/table.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TableItem } from '../../models/table-item.model';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from './new-item-dialog/new-item-dialog.component';
import { TableItemService } from '../../services/table-item.service';
import { toCanvas } from 'qrcode';
import { PaymentService } from '../../services/payment.service';
import { User } from '../../models/user.model';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {
  tableDisplayedColumns: string[] = ['name', 'createdAt'];
  usersDisplayedColumns: string[] = ['name', 'joinedTableAt'];
  itemsDisplayedColumns: string[] = ['name', 'price', 'actions'];
  tableDataSource = new MatTableDataSource<Table>();
  itemsDataSource = new MatTableDataSource<TableItem>();
  usersDataSource = new MatTableDataSource<User>();
  tableId: string;
  items: TableItem[] = [];
  users: User[] = [];

  @ViewChild('qrCode') qrCodeEl: ElementRef;

  constructor(
    private readonly _tableService: TableService,
    private readonly _tableItemService: TableItemService,
    private readonly _userService: UserService,
    private readonly _paymentService: PaymentService,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.tableId = params['id'];

      this._tableService.getTableById(this.tableId).subscribe((table: Table) => {
        toCanvas(this.qrCodeEl.nativeElement, table._id);

        this.tableDataSource.data = [table];
        
      });

      this._tableService.getTableItems(this.tableId).subscribe((items: TableItem[]) => {
        this.items = items;
        this.refreshItemsTable();
      });

      this._tableService.getTableUsers(this.tableId).subscribe((users: User[]) => {
        this.users = users;
        this.refreshUsersTable();
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

  removeItem(item: TableItem) {
    this._tableItemService.removeTableItem(item._id).subscribe(() => {
      this.items.splice(this.items.indexOf(item), 1);
      this.refreshItemsTable();
    });
  }

  private addItemToTable(item: TableItem) {
    this._tableService.addItemToTable(this.tableId, item).subscribe((insertedItem: TableItem) => {
      this.items.push(insertedItem);
      this.refreshItemsTable();
    });
  }

  private addUserToTable(user: User) {
    this._userService.addUser(user).subscribe((insertedUser: User) => {
      this._tableService.addUserToTable(this.tableId, insertedUser).subscribe(() => {
        console.log('SUCCESS');
      });
    });
  }

  private refreshItemsTable() {
    this.itemsDataSource.data = this.items;
  }

  private refreshUsersTable() {
    this.usersDataSource.data = this.users;
  }

}
