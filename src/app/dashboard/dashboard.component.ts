import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../models/table.model';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Table>();
  newTableIdx = 0;
  tables = [];

  constructor(private readonly _tableService: TableService) {}

  ngOnInit() {
    this._tableService.getTables().subscribe((tables: Table[]) => {
      this.tables = tables;
      this.refreshTable();
    });
  }

  addNewTable() {
    this._tableService.addTable({ name: `Table${this.newTableIdx++}` }).subscribe((table: Table) => {
      this.tables.push(table);
      this.refreshTable();
    });
  }

  removeTable(table: Table) {
    this._tableService.removeTable(table).subscribe(() => {
      this.tables.splice(this.tables.indexOf(table), 1);
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.dataSource.data = this.tables;
  }
}
