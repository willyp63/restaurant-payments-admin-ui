import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../../models/table.model';
import { TableService } from '../../services/table.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTableDialogComponent } from './new-table-dialog/new-table-dialog.component';

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

  constructor(
    private readonly _tableService: TableService,
    private readonly _dialog: MatDialog,
  ) {}

  ngOnInit() {
    this._tableService.getTables().subscribe((tables: Table[]) => {
      this.tables = tables;
      this.refreshTable();
    });
  }

  openNewTableDialog() {
    const dialogRef = this._dialog.open(NewTableDialogComponent, {
      width: '250px',
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((table: Table) => {
      if (table) {
        this.addNewTable(table);
      }
    });
  }

  removeTable(table: Table) {
    this._tableService.removeTable(table._id).subscribe(() => {
      this.tables.splice(this.tables.indexOf(table), 1);
      this.refreshTable();
    });
  }

  private addNewTable(table: Table) {
    this._tableService.addTable(table).subscribe((insertedTable: Table) => {
      this.tables.push(insertedTable);
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.dataSource.data = this.tables;
  }
}
