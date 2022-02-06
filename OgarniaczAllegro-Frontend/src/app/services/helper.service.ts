import { Injectable } from '@angular/core';
import { IOrder } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  isObjectsEqual<T>(obj1: T, obj2: T) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  nameof = <T>(name: keyof T) => name;

}
