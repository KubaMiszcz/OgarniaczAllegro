import { Order } from './../models/order';
import { OrderServiceService } from './../services/order-service.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  // showAddNewRow = true;
  showAddNewRow$ = new Observable<boolean>();
  // saveButtonLabel = '';
  // selectedOrder = new Order();

  constructor(
    private orderServiceService: OrderServiceService,
  ) { }

  ngOnInit(): void {
    // this.orderServiceService.selectedOrder$.subscribe(o => {
    // this.selectedOrder = o;
    // this.saveButtonLabel = o.id === 0 ? 'Save New order' : '';
    // });

  }

  toggleAddNewRow() {
    this.showAddNewRow$ = this.orderServiceService.showAddNewOrderRow$;

    // this.showAddNewRow = !this.showAddNewRow;
    // this.orderServiceService.showAddNewOrderRow$.next(this.showAddNewRow);
  }

  // saveOrder() {
  //   this.orderServiceService.saveNewOrder(this.selectedOrder);
  // }

  save() {
    localStorage.setItem('orders', JSON.stringify(this.orderServiceService.ordersList$.value));
  }

  load() {
    this.orderServiceService.ordersList$.next(JSON.parse(localStorage.getItem('orders') ?? ''));
    console.log(this.orderServiceService.ordersList$.value);
  }
}
