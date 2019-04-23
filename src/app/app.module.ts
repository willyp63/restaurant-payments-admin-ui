import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditableFieldComponent } from './editable-field/editable-field.component';
import { FormsModule } from '@angular/forms';
import { NewTableDialogComponent } from './dashboard/new-table-dialog/new-table-dialog.component';
import { NewItemDialogComponent } from './table-details/new-item-dialog/new-item-dialog.component';
import { TableReceiptComponent } from './table-receipt/table-receipt.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'table/:id', component: TableDetailsComponent },
  { path: 'table/:id/receipt', component: TableReceiptComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableDetailsComponent,
    PageNotFoundComponent,
    EditableFieldComponent,
    NewTableDialogComponent,
    NewItemDialogComponent,
    TableReceiptComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
  ],
  entryComponents: [
    NewTableDialogComponent,
    NewItemDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
