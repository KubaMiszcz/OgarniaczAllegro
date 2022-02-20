import { CURRENT_USER as CURRENT_USER } from '../models/user.model';
import { EXAMPLE_ROWS, IOrder, Order } from '../models/order.model';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = new BehaviorSubject<IUser>(CURRENT_USER);

  constructor() {
    this.currentUser$.next(CURRENT_USER);
  }
}
