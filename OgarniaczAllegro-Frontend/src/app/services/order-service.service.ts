import { EXAMPLE_ROWS, IOrderRow } from './../models/order';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  ordersList$ = new BehaviorSubject<IOrderRow[]>([]);

  constructor() {
    this.ordersList$.next(EXAMPLE_ROWS);
  }
}
