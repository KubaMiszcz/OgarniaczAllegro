import { Injectable } from '@angular/core';
// import { IDateYMD } from '../models/date-YMD.model';
import _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class HelperService {


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



  getValueFromEnum<T1, T2>(sourceEnum: T1, value: T2): string | undefined {
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


}
