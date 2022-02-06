import { USER as CURRENT_USER } from './../models/user.model';
import { EXAMPLE_ROWS, IOrder, Order } from '../models/order';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = new BehaviorSubject<IUser>([]);

  constructor() {
    this.currentUser$.next(CURRENT_USER);
  }
}
