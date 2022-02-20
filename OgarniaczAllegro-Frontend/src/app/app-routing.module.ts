import { OrdersTableComponent } from './orders-table/orders-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportOrderComponent } from './import-all-orders/import-all-orders.component';

const routes: Routes = [
  { path: 'orders-table', component: OrdersTableComponent },
  { path: 'archived-orders', component: OrdersTableComponent },
  { path: 'import-all-orders', component: ImportOrderComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: OrdersTableComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
