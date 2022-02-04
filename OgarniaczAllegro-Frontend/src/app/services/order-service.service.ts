import { EXAMPLE_ROWS, IOrder, Order } from './../models/order';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  ordersList$ = new BehaviorSubject<IOrder[]>([]);
  editedOrder$ = new BehaviorSubject<IOrder>(new Order());
  addNewOrderE = new EventEmitter<boolean>();

  constructor() {
    this.ordersList$.next(EXAMPLE_ROWS);
  }

  addNewOrder() {
    this.addNewOrderE.emit(true);
  }

  saveNewOrder() {
    let list = this.ordersList$.value
    list.push(this.editedOrder$.value);
    this.ordersList$.next(list);
  }
}
