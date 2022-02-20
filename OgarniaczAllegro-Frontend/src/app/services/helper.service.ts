import { Injectable } from '@angular/core';
// import { IDateYMD } from '../models/date-YMD.model';
import _ from 'lodash';
import { IMyOrderAllAllegro } from '../models/allegro-models/all-orders.model';
import { IOrder } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  addDaysToTimestamp(timestamp: Date, days: number) {
    if (!timestamp) {
      return timestamp;
    }

    const date = new Date(timestamp);
    const newDate = date.setDate(date.getDate() + days);

    return new Date(newDate);
  }

  subtractDaysToTimestamp(timestamp: Date, days: number) {
    return this.addDaysToTimestamp(timestamp, -days);
  }



  isObjectsEqual<T>(obj1: T, obj2: T) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  nameof = <T>(name: keyof T) => name;

  // getDateYMD(timestamp: Date): IDateYMD {
  //   //todo what if no delivery? ''? null as timestamp?
  //   const date = new Date(timestamp);

  //   return {
  //     year: date.getFullYear(),
  //     month: date.getMonth() + 1,
  //     day: date.getDate(),
  //   };
  // }

  getDeepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }



  getValueFromEnum<T1, T2>(sourceEnum: T1, value: T2): string | undefined { //km return T1
    const keys = Object.keys(sourceEnum);
    const values = Object.values(sourceEnum);

    const idx = keys.findIndex(k => String(k) === String(value));

    return values[idx];
  }

  getKeyFromEnum<T1, T2>(sourceEnum: T1, value: T2): string | undefined {
    const keys = Object.keys(sourceEnum);
    const values = Object.values(sourceEnum);

    const idx = values.findIndex(k => String(k) === String(value));

    return keys[idx];
  }


  mergeJsons<T1, T2>(obj1: T1, obj2: T2): string | undefined {
    return JSON.stringify({ ...obj1, ...obj2 });
  }

}
