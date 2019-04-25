import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../models/table.model';
import { TableService } from '../services/table.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TableItem } from '../models/table-item.model';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from './new-item-dialog/new-item-dialog.component';
import { TableItemService } from '../services/table-item.service';
import { toCanvas } from 'qrcode';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {
  tableDisplayedColumns: string[] = ['name', 'createdAt'];
  itemsDisplayedColumns: string[] = ['name', 'price', 'paidFor', 'actions'];
  tableDataSource = new MatTableDataSource<Table>();
  itemsDataSource = new MatTableDataSource<TableItem>();
  tableId: string;
  items: TableItem[] = [];

  @ViewChild('qrCode') qrCodeEl: ElementRef;

  constructor(
    private readonly _tableService: TableService,
    private readonly _tableItemService: TableItemService,
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
        this.items = table.items;
        this.refreshTable();
      });
    });

    this._paymentService.onItemPaidFor().subscribe(this.onItemPaidFor.bind(this));
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
      this.refreshTable();
    });
  }

  payForItem(item: TableItem) {
    this._paymentService.payForItem(item._id);
  }

  onItemPaidFor(itemId: string) {
    this.items.find((item: TableItem) => item._id === itemId).paidFor = true;
    this.refreshTable();
  }

  private addItemToTable(item: TableItem) {
    this._tableService.addItemToTable(this.tableId, item).subscribe((insertedItem: TableItem) => {
      this.items.push(insertedItem);
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.itemsDataSource.data = this.items;
  }

}
