import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableDetailsComponent } from './components/table-details/table-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableReceiptComponent } from './components/table-receipt/table-receipt.component';

import { NewTableDialogComponent } from './components/dashboard/new-table-dialog/new-table-dialog.component';
import { NewItemDialogComponent } from './components/table-details/new-item-dialog/new-item-dialog.component';
import { NewUserDialogComponent } from './components/table-details/new-user-dialog/new-user-dialog.component';

import { EditableFieldComponent } from './components/shared/editable-field/editable-field.component';

import { UserNamePipe } from './pipes/user-name/user-name.pipe';
import { ItemNamePipe } from './pipes/item-name/item-name.pipe';
import { DollarPipe } from './pipes/dollar/dollar.pipe';

@NgModule({
  declarations: [
    // Root Components
    AppComponent,
    NavBarComponent,

    // Route Components
    DashboardComponent,
    TableDetailsComponent,
    PageNotFoundComponent,
    TableReceiptComponent,

    // Shared Components
    EditableFieldComponent,

    // Dialog Components
    NewTableDialogComponent,
    NewItemDialogComponent,
    NewUserDialogComponent,

    // Pipes
    UserNamePipe,
    ItemNamePipe,
    DollarPipe,
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),

    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatTreeModule,
  ],
  entryComponents: [
    // Dialogs
    NewTableDialogComponent,
    NewItemDialogComponent,
    NewUserDialogComponent,
  ],
  providers: [
    // Pipes
    UserNamePipe,
    ItemNamePipe,
    CurrencyPipe,
    DollarPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
