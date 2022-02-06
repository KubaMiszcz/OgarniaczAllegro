import { OrderService } from './../services/order-service.service';
import { IOrder, Order } from './../models/order';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  ordersList: IOrder[] = [];
  editedOrder = new Order();
  showAddNewRow = false;

  constructor(
    private orderServiceService: OrderService,
  ) {
    this.orderServiceService.showAddNewOrderRow$.subscribe(s => this.showAddNewRow = s);

    this.orderServiceService.ordersList$.subscribe(ol => this.ordersList = ol);
    this.orderServiceService.selectedOrder$.subscribe(o => this.editedOrder = o);
  }

  ngOnInit(): void { }

  selectRow(order: IOrder | null) {
    this.orderServiceService.selectedOrder$.next(order ?? new Order());
  }

  isInEdit(order: IOrder) {
    return order.id === this.editedOrder.id;
  }

  onAddNew(value: IOrder) {
    this.orderServiceService.addNewOrder(value);
  }


  aa(event: any) {
    console.log(event);

  }
}
