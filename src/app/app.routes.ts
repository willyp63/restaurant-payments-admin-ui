import { Routes } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TableDetailsComponent } from "./components/table-details/table-details.component";
import { TableReceiptComponent } from "./components/table-receipt/table-receipt.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

export const APP_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'table/:id', component: TableDetailsComponent },
  { path: 'table/:id/receipt', component: TableReceiptComponent },
  { path: '**', component: PageNotFoundComponent }
];
