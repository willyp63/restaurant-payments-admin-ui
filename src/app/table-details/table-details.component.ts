import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../models/table.model';
import { TableService } from '../services/table.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TableItem } from '../models/table-item.model';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {
  tableDisplayedColumns: string[] = ['name', 'createdAt'];
  itemsDisplayedColumns: string[] = ['name', 'price'];
  tableDataSource = new MatTableDataSource<Table>();
  itemsDataSource = new MatTableDataSource<TableItem>();

  constructor(
    private readonly _tableService: TableService,
    private readonly _route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      const tableId = params['id'];

      this._tableService.getTableById(tableId).subscribe((table: Table) => {
        this.tableDataSource.data = [table];
        this.itemsDataSource.data = table.items;
      });
    });
  }

  onTableNameChange(table: Table, tableName: string) {
    this._tableService.updateTable(table._id, { name: tableName }).subscribe((updatedTable: Table) => {
      table.name = updatedTable.name;
    });
  }

}
