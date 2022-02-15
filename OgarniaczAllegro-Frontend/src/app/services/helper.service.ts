import { Injectable } from '@angular/core';
import { IDateYMD } from '../models/date-YMD';
import { IOrder } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  isObjectsEqual<T>(obj1: T, obj2: T) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  nameof = <T>(name: keyof T) => name;

  getDateYMD(timestamp: Date): IDateYMD {
    //todo what if no delivery? ''? null as timestamp?
    const date = new Date(timestamp);

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  getDeepCopy<T>(obj: T) {
    return JSON.parse(JSON.stringify(obj));
  }


}
