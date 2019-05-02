import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Table } from 'src/app/models';

@Component({
  selector: 'app-new-table-dialog',
  templateUrl: './new-table-dialog.component.html',
  styleUrls: ['./new-table-dialog.component.scss']
})
export class NewTableDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Table,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
