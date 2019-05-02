import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { toCanvas } from 'qrcode';

import { TableService } from 'src/app/services/table/table.service';
import { Table } from 'src/app/models/table.model';

const SALES_TAX = .07;

@Component({
  selector: 'app-table-receipt',
  templateUrl: './table-receipt.component.html',
  styleUrls: ['./table-receipt.component.scss']
})
export class TableReceiptComponent implements OnInit, AfterViewChecked {
  table: Table;
  subtotal: number;
  tax: number;
  total: number;
  readyToPrint = false;

  @ViewChild('qrCode') qrCodeEl: ElementRef;

  constructor(
    private readonly _tableService: TableService,
    private readonly _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      const tableId = params['id'];

      this._tableService.getTableById(tableId).subscribe((table: Table) => {
        this.table = table;

        this.subtotal = 0; // table.items.reduce((total, item) => total + item.price, 0);
        this.tax = this.subtotal * SALES_TAX;
        this.total = this.subtotal + this.tax;

        toCanvas(this.qrCodeEl.nativeElement, table._id, () => {
          this.qrCodeEl.nativeElement.style = 'width: 256px; height: 256px';
          this.readyToPrint = true;
        });
      });
    });
  }

  ngAfterViewChecked() {
    if (this.readyToPrint) {
      this.readyToPrint = false;
      window.print();
    }
  }

}
