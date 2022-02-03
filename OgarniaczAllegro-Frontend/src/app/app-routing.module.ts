import { OrdersTableComponent } from './orders-table/orders-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'orders-table', component: OrdersTableComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: OrdersTableComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
