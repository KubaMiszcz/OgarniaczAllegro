import { OrderService } from '../services/order.service';
import { IOrder, Order } from './../models/order';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  ordersList: IOrder[] = [];
  editedOrder: IOrder = new Order();
  showAddNewRow = false;

  constructor(
    private orderService: OrderService,
  ) {
    this.orderService.showAddNewOrderRow$.subscribe(s => this.showAddNewRow = s);

    this.orderService.ordersList$.subscribe(ol => this.ordersList = ol);
    this.orderService.selectedOrder$.subscribe(o => this.editedOrder = o);
  }

  ngOnInit(): void { }

  selectRow(order: IOrder | null) {
    this.orderService.selectOrder(order);
  }

  isInEdit(order: IOrder) {
    return order.id === this.editedOrder.id;
  }

  addNewOrder(order: IOrder) {
    this.orderService.addNewOrder(order);
  }

  updateOrder(order: IOrder) {
    this.orderService.updateOrder(order);
  }

}
