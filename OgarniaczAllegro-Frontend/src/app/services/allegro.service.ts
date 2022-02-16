import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAllegroAllOrders, IOrderGroup } from '../allegro-stuff/models/all-orders-models';
import { IOrder } from '../models/order';
import { StatusEnum } from '../models/constants/status.enum';
import { AllegroEnums } from '../allegro-stuff/models/allegro-enums';
import { HelperService } from './helper.service';
import { StatusService } from './status.service';


@Injectable({
  providedIn: 'root'
})
export class AllegroService {


  constructor(
    private statusService: StatusService,
    private helperService: HelperService,
    private http: HttpClient,
  ) { }

  getJSONFromAllegroAllOrdersResponse(source: string): string {
    const beginningSubstring = '"filter":';
    const endingSubstring = '"slots":';

    return this.getJSONFromAllegroResponse(source, beginningSubstring, endingSubstring);


    //for single order
    // let beginJson ='"myorderGroup":';
    // let endJson='"myorderGroup.$meta":';

    // const foundedByBeginMark = source.split(beginningSubstring);
    // const possibleJsons: string[] = [];

    // foundedByBeginMark.forEach(part => {
    //   const json = part.split(endingSubstring);
    //   if (json.length > 1) {
    //     possibleJsons.push(json[0]);
    //   }
    // });

    // if (possibleJsons.length > 1) {
    //   this.checkIfAllJsonsIdentical(possibleJsons);
    // }

    // // let finalJson = possibleJsons[0]?.slice(0, -1); //remove last char - comma
    // let finalJson = possibleJsons[0];

    // finalJson = '{' + beginningSubstring + finalJson + endingSubstring + '{}}';

    // return finalJson;
  }

  getJSONFromAllegroSingleOrderResponse(source: string) {
    const beginningSubstring = '"myorderGroup":';
    const endingSubstring = '"myorderGroup.$meta":';

    return this.getJSONFromAllegroResponse(source, beginningSubstring, endingSubstring);
  }


  public fillOrdersFromAllegroImport(importedList: IAllegroAllOrders, oldOrderList: IOrder[]): IOrder[] {
    console.log(
      JSON.stringify(importedList.myorders.orderGroups.find(o => o.groupId === 'c6d77471-a24a-3c73-b37f-c9fab6bed611'))
    );


    importedList.myorders.orderGroups.forEach(group => {
      const existedOrderIdx = oldOrderList.findIndex(o => o.id === group.groupId);

      if (existedOrderIdx >= 0) {
        const order = this.getUpdatedOrder(oldOrderList[existedOrderIdx], group);
        oldOrderList[existedOrderIdx] = order;

      } else {
        oldOrderList.push(this.createOrderFromGroup(group));
      }
    });

    //show toast
    console.log(`first ${importedList.limit} order from ${importedList.myorders.total} imported sucessfully`);

    return oldOrderList;
  }



























  private getUpdatedOrder(oldOrder: IOrder, group: IOrderGroup): IOrder {
    const order = group.myorders[0];

    return {
      ...oldOrder,
      isNew: false,
      isPackageDelivered: order.delivery.status === AllegroEnums.statusDELIVERED ? StatusEnum.Yes : StatusEnum.No,
      receivedDate: this.helperService.getDateYMD(order.delivery.timestamp),
    };
  }

  private createOrderFromGroup(group: IOrderGroup): IOrder {
    // createOrderFromGroup(group: IOrderGroup): IOrder {
    // !!!!!!!!!!!!!!!!
    // dont use group.myorders, just go straight into
    // group.myorders[0].order
    // myorders has alway one item: order
    // and there is all info about it

    const order = group.myorders[0];
    const name = order.offers.map(o => '- ' + o.title).join('\n');

    return {
      id: group.groupId,
      name: name,
      isNew: true,
      isAllegroPay: order.payment.method === AllegroEnums.AllegroPay ? StatusEnum.Yes : StatusEnum.No,
      orderItems: order.offers,
      orderValue: Number(order.totalCost.amount),
      isPackageDelivered: order.delivery.status === AllegroEnums.statusDELIVERED ? StatusEnum.Yes : StatusEnum.No,
      receivedDate: this.helperService.getDateYMD(order.delivery.timestamp),


      isFinished: StatusEnum.No

    };
  }


  private getJSONFromAllegroResponse(source: string, beginningSubstring: string, endingSubstring: string) {
    const foundedByBeginMark = source.split(beginningSubstring);
    const possibleJsons: string[] = [];

    foundedByBeginMark.forEach(part => {
      const json = part.split(endingSubstring);
      if (json.length > 1) {
        possibleJsons.push(json[0]);
      }
    });

    if (possibleJsons.length > 1) {
      this.checkIfAllJsonsIdentical(possibleJsons);
    }

    let finalJson = possibleJsons[0];

    finalJson = '{' + beginningSubstring + finalJson + endingSubstring + '{}}';

    return finalJson;
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
