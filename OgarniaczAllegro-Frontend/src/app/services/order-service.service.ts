import { EXAMPLE_ROWS, IOrder, Order } from '../models/order';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  ordersList$ = new BehaviorSubject<IOrder[]>([]);
  selectedOrder$ = new BehaviorSubject<IOrder>(new Order());
  showAddNewOrderRow$ = new BehaviorSubject<boolean>(true);

  constructor() {
    this.ordersList$.next(EXAMPLE_ROWS);
  }

  addNewOrder(order: IOrder) {
    order = { ...order };
    let list = this.ordersList$.value;
    if (order.id === 0) {
      order.id = Math.max(...list.map(o => o.id)) + 1;
      list.push(order);
    }
  }
}
