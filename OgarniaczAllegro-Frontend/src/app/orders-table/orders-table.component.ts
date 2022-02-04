import { OrderServiceService } from './../services/order-service.service';
import { IOrder, EXAMPLE_ROWS, Order } from './../models/order';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  ordersList: IOrder[] = [];
  editedOrder = new Order();

  constructor(
    private orderServiceService: OrderServiceService,
  ) {
    this.orderServiceService.ordersList$.subscribe(ol => this.ordersList = ol);
    this.orderServiceService.editedOrder$.subscribe(o => this.editedOrder = o);
  }

  ngOnInit(): void { }

  selectRow(order: IOrder | null) {
    this.orderServiceService.editedOrder$.next(order ?? new Order());
  }

  isInEdit(order: IOrder) {
    return order.id === this.editedOrder.id;
  }
}
