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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableDetailsComponent } from './components/table-details/table-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';
import { FormsModule } from '@angular/forms';
import { NewTableDialogComponent } from './components/dashboard/new-table-dialog/new-table-dialog.component';
import { NewItemDialogComponent } from './components/table-details/new-item-dialog/new-item-dialog.component';
import { TableReceiptComponent } from './components/table-receipt/table-receipt.component';
import { FirstNamePipe } from './pipes/first-name.pipe';
import { LastNamePipe } from './pipes/last-name.pipe';
import { NewUserDialogComponent } from './components/table-details/new-user-dialog/new-user-dialog.component';

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
    NewUserDialogComponent,
    TableReceiptComponent,
    FirstNamePipe,
    LastNamePipe,
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
    NewUserDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
