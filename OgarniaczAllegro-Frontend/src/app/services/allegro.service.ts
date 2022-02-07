import { IDateYMD } from './../models/dateYMD';
import { AllegroEnums } from './../allegro-stuff/models/allegro-enums';
import { OrderService } from './order.service';
import { HelperService } from './helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatusService } from './status.service';
import { environment } from 'src/environments/environment';
import { IAllegroAllOrders, IMyorder, IOrderGroup } from '../allegro-stuff/models/all-orders-models';
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

  getJSONFromAllegroOrdersResponse(source: string) {

    let beginJson = '"filter":';
    let endingJson = '"slots":';

    //for single order
    // let beginJson ='"myorderGroup":';
    // let endJson='"myorderGroup.$meta":';

    let foundedByBeginMark = source.split(beginJson);
    let possibleJsons: string[] = [];

    foundedByBeginMark.forEach(part => {
      let json = part.split(endingJson);
      if (json.length > 1) {
        possibleJsons.push(json[0]);
      }
    });

    if (possibleJsons.length > 1) {
      this.checkIfAllJsonsIdentical(possibleJsons)
    }

    // let finalJson = possibleJsons[0]?.slice(0, -1); //remove last char - comma
    let finalJson = possibleJsons[0];

    finalJson = '{' + beginJson + finalJson + endingJson + '{}}';

    return finalJson;
  }

  fillOrdersFromAllegroImport(importedList: IAllegroAllOrders, oldOrderList: IOrder[]) {
    importedList.myorders.orderGroups.forEach(group => {
      let existedOrderIdx = oldOrderList.findIndex(o => o.id === group.groupId);

      if (existedOrderIdx >= 0) {
        let order = this.getUpdatedOrder(oldOrderList[existedOrderIdx], group);
        oldOrderList[existedOrderIdx] = order;

      } else {
        oldOrderList.push(this.createOrderFromGroup(group));
      }

    });

    //show toast
    console.log(`first ${importedList.limit} order from ${importedList.myorders.total} imported sucessfully`);
  }




  private getUpdatedOrder(oldOrder: IOrder, group: IOrderGroup): IOrder {
    let order = group.myorders[0];

    return {
      ...oldOrder,
      isPackageDelivered: order.delivery.status === AllegroEnums.statusDELIVERED ? StatusEnum.Yes : StatusEnum.No,
      receivedDate: this.helperService.getDateYMD(order.delivery.timestamp),
    }
  }

  createOrderFromGroup(group: IOrderGroup) {
    // createOrderFromGroup(group: IOrderGroup): IOrder {
    // !!!!!!!!!!!!!!!!
    // dont use group.myorders, just go straight into 
    // group.myorders[0].order
    // myorders has alway one item: order
    // and there is all info about it

    let order = group.myorders[0];
    let name = order.offers.map(o => '- ' + o.title).join('\n');
    return {
      id: group.groupId,
      name: name,
      isAllegroPay: order.payment.method === AllegroEnums.AllegroPay ? StatusEnum.Yes : StatusEnum.No,
      orderItems: order.offers,
      orderValue: Number(order.totalCost.amount),
      isPackageDelivered: order.delivery.status === AllegroEnums.statusDELIVERED ? StatusEnum.Yes : StatusEnum.No,
      receivedDate: this.helperService.getDateYMD(order.delivery.timestamp),


      isFinished: StatusEnum.No

    }
  }



  private checkIfAllJsonsIdentical(list: string[]) {
    list.forEach(item => {
      if (list[0] !== item) {
        console.log('not identical');
        throw new Error('Jsons not identical.');
      }
    });
  }

}
