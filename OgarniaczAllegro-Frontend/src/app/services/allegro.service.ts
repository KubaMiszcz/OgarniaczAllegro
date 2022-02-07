import { OrderService } from './order.service';
import { HelperService } from './helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatusService } from './status.service';
import { environment } from 'src/environments/environment';
import { IAllegroAllOrders } from '../allegro-stuff/models/all-orders-models';
import { IOrder, Order } from '../models/order';
import { StatusEnum } from '../models/status.enum';


@Injectable({
  providedIn: 'root'
})
export class AllegroService {
  constructor(
    private statusService: StatusService,
    private helperService: HelperService,
    private http: HttpClient,
  ) { }

  fillOrdersFromAllegroImport(importedList: IAllegroAllOrders, oldOrderList: IOrder[]) {
    // let oldOrderList = this.orderService.ordersList$.value;

    importedList.myorders.orderGroups.forEach(group => {
      oldOrderList.find(o => o.id === group.groupId);
      if (oldOrderList.find(o => o.id === group.groupId)) {
        this.updateOrder();
      } else {
        group.myorders.forEach(o => {
          let order: IOrder = {
            id: group.groupId,
            name: `${o.seller.login} ${o.offers[0].title}`,
            orderValue: Number(o.totalCost),
            isFinished: StatusEnum.No
          }

          oldOrderList.push(order);
        })
      }
    });

    //show toast
    console.log(`first ${importedList.limit} order from ${importedList.myorders.total} imported sucessfully`);
  }


  updateOrder() {
    //todo
  }


}
