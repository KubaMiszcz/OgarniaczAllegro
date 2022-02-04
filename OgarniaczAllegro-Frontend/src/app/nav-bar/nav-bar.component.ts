import { OrderServiceService } from './../services/order-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  saveButtonLabel = '';

  constructor(
    private orderServiceService: OrderServiceService,
  ) { }

  ngOnInit(): void {
    this.orderServiceService.editedOrder$.subscribe(o => {
      this.saveButtonLabel = (o.id === 0 ? 'Save' : 'Update') + ' order';
    })
  }

  addNewOrder() {
    this.orderServiceService.addNewOrder();
  }

  saveNewOrder() {
    this.orderServiceService.saveNewOrder();
  }

  save() {
    localStorage.setItem('orders', JSON.stringify(this.orderServiceService.ordersList$.value));
  }

  load() {
    this.orderServiceService.ordersList$.next(JSON.parse(localStorage.getItem('orders') ?? ''));
    console.log(this.orderServiceService.ordersList$.value);
  }
}
