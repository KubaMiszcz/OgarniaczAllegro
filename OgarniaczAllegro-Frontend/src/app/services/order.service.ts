import { AllegroCommonEnum } from './../models/allegro-models/allegro-common.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAllegroAllOrdersView, IMyOrderAllAllegro } from '../models/allegro-models/all-orders.model';
import { AllegroParcelStatusEnum } from '../models/allegro-models/allegro-parcel-status.enum';
import { ISingleOrderAllegro, ISingleOrderView } from '../models/allegro-models/single-order.model';
import { TriStateStatusEnum } from '../models/constants/status.enum';
import { IOrder, Order } from '../models/order.model';
import { IOrderItem } from './../models/purchase-item.model';
import { IReturn } from './../models/return.model';
import { AllegroService } from './allegro.service';
import { HelperService } from './helper.service';
import { SettingsService } from './settings.service';
import { StatusService } from './status.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  allOrdersList$ = new BehaviorSubject<IOrder[]>([]);

  selectedOrder$ = new BehaviorSubject<IOrder>(new Order());


  // showAddNewOrderRow$ = new BehaviorSubject<boolean>(true);

  private apiPath = `${environment.apiPath}/order`;

  constructor(
    private statusService: StatusService,
    private allegroService: AllegroService,
    private helperService: HelperService,
    private http: HttpClient,
    private settingsService: SettingsService,

  ) {



    const list = JSON.parse(localStorage.getItem('orders') ?? '[]');
    // if (!list) {
    //   list = EXAMPLE_ROWS;
    // }

    this.allOrdersList$.next(list);
  }

  selectOrder(order: IOrder | null) {
    // for knowing which row is in editmode
    this.selectedOrder$.next({ ...order } as IOrder);
  }











  importAllegroAllOrdersFromResponse(source: string) {
    const allOrdersFromAllegroJSON = this.allegroService.getJSONFromAllegroAllOrdersResponse(source);

    const allOrdersFromAllegroView: IAllegroAllOrdersView = JSON.parse(allOrdersFromAllegroJSON);
    console.log('allOrdersFromAllegroView', allOrdersFromAllegroView);


    if (allOrdersFromAllegroView?.myorders?.orderGroups?.some(g => g?.myorders.length > 1)) {
      alert('group.myorders.length>1');
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // dont use group.myorders, just go straight into
    // group.myorders[0].order
    // myorders has alway one item: order
    // and in this first item there is all info about it
    // maybe it has more when you pay for more orders in one payment?

    const allAllegroOrders = allOrdersFromAllegroView?.myorders?.orderGroups?.map(o => o?.myorders[0]);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    try {
      const newList = this.fillAllOrdersFromAllegroImport(allAllegroOrders, this.allOrdersList$.value);
      this.allOrdersList$.next(newList);

      console.log(`first ${allOrdersFromAllegroView?.limit} order from ${allOrdersFromAllegroView?.myorders?.total} imported sucessfully`);

    } catch (error) {
      console.warn('something wrong with importAllegroOrdersFromResponse');
      alert('something wrong with importAllegroOrdersFromResponse');
    }

  }

  private fillAllOrdersFromAllegroImport(importedList: IMyOrderAllAllegro[], oldOrderList: IOrder[]): IOrder[] {

    importedList.forEach(importedOrder => {
      oldOrderList = this.fillSingleOrderFromAllegroImport(importedOrder, oldOrderList);
    });

    return oldOrderList;
  }









  importAllegroSingleOrderFromResponse(source: string) {
    const singleOrderFromAllegroJSON = this.allegroService.getJSONFromAllegroSingleOrderResponse(source);
    const singleOrderFromAllegroView: ISingleOrderView = JSON.parse(singleOrderFromAllegroJSON);
    // console.log('\nsingleOrderFromAllegroView\n', singleOrderFromAllegroView);


    if (singleOrderFromAllegroView?.myorderGroup?.myorders?.length > 1) {
      alert('group.myorders.length>1');
    }

    const singleAllegroOrder: ISingleOrderAllegro = singleOrderFromAllegroView?.myorderGroup?.myorders[0];
    console.log('\nparsed  singleAllegroOrder\n', singleAllegroOrder);


    try {
      const newList = this.fillSingleOrderFromAllegroImport(singleAllegroOrder, this.allOrdersList$.value);
      this.allOrdersList$.next(newList);

    } catch (error) {
      console.warn('something wrong with importAllegroSingleOrderFromResponse');
      alert('something wrong with importAllegroSingleOrderFromResponse');

    }

  }







  private fillSingleOrderFromAllegroImport(importedOrder: IMyOrderAllAllegro | ISingleOrderAllegro, oldOrderList: IOrder[]): IOrder[] {
    const existedOrderIdx = oldOrderList.findIndex(oldOrder => oldOrder.id === importedOrder.purchaseId);

    if (existedOrderIdx >= 0) {
      const updatedOrder = this.getUpdatedOrderFromImported(oldOrderList[existedOrderIdx], importedOrder as IMyOrderAllAllegro);

      if ((importedOrder as ISingleOrderAllegro).rescissions) {
        updatedOrder.return = this.fillReturnData(importedOrder as ISingleOrderAllegro);
      }

      updatedOrder.allegroJson = this.helperService.mergeJsons(updatedOrder.allegroJson, importedOrder);
      oldOrderList[existedOrderIdx] = updatedOrder;

    } else {
      oldOrderList.push(this.createNewOrderFromImportedOrder(importedOrder));
    }

    return oldOrderList;
  }




























































  private getUpdatedOrderFromImported(oldOrder: IOrder, order: IMyOrderAllAllegro): IOrder {
    oldOrder.isNew = false;
    oldOrder.purchase.status = this.allegroService.convertToMyParcelStatusEnum(order.delivery.status);

    oldOrder.purchase.statusTimestamp = new Date(order.delivery.timestamp);

    if (oldOrder.purchase.status === AllegroParcelStatusEnum.DELIVERED && !oldOrder.purchase.issueReturnToDate) {
      oldOrder.purchase.issueReturnToDate = this.helperService.addDaysToTimestamp(
        order.delivery.timestamp,
        this.settingsService.defaultReturnInterval
      );
    }

    return oldOrder;
  }


  private createNewOrderFromImportedOrder(order: IMyOrderAllAllegro | ISingleOrderAllegro): IOrder {
    const name = order.offers.map(o => '- ' + o.title.slice(0, 100)).join('\n');


    const result: IOrder = {
      allegroJson: JSON.stringify(order),
      id: order.purchaseId, //same as order.id
      name: name,
      isNew: true,
      purchase: {
        isAllegroPay: order.payment.method === AllegroCommonEnum.AllegroPay ? TriStateStatusEnum.YES : TriStateStatusEnum.NO,
        purchaseItems: order.offers.map(o => ({ name: o.title } as IOrderItem)),
        orderValue: Number(order.totalCost.amount),
        purchaseDate: order.orderDate,
        status: this.allegroService.convertToMyParcelStatusEnum(order.delivery.status),
        statusTimestamp: order.delivery.timestamp ? new Date(order.delivery.timestamp) : order.delivery.timestamp,
        // hasInvoice: (order as IMyOrderAllAllegroV2).invoiceAddressId ? TriStateStatusEnum.YES : TriStateStatusEnum.NO,
        isInvoiceReceived: (order as IMyOrderAllAllegro).invoiceAddressId ? TriStateStatusEnum.NO : TriStateStatusEnum.NOT_AVAILABLE,
      },
      // return: {
      // returnToDate: this.helperService.addDaysToTimestamp(order.delivery.timestamp, this.settingsService.defaultReturnInterval),
      // },
      isCashReturned: TriStateStatusEnum.NO,
      isFinished: TriStateStatusEnum.NO,
    };


    if (result.purchase.status === AllegroParcelStatusEnum.DELIVERED) {
      result.purchase.issueReturnToDate = this.helperService.addDaysToTimestamp(
        order.delivery.timestamp,
        this.settingsService.defaultReturnInterval
      );
    }



    return result;
  }


  fillReturnData(order: ISingleOrderAllegro): IReturn {
    const rescission = order.rescissions?.rescissions[0];

    return {
      returnCode: rescission.returnParcels[0].returnCode,
      returnCodeExpirationDate: rescission.shipmentExpirationDate,
      returnValue: _.sum(rescission.rescissionOffers.map(o => o.quantity * Number(o.price.amount))),
      status: this.allegroService.convertToMyReturnStatusEnum(rescission.timelineStatus.status),
      statusHint: rescission.timelineStatus.hint,
    };
  }





































  addNewOrder(newOrder: IOrder) {
    newOrder = { ...newOrder };
    const list = this.allOrdersList$.value;
    if (newOrder.id === '') {
      newOrder.id = (Math.round(Math.random() * 100000)).toString(); //lodash=>guid
      list.push(newOrder);
    }
  }

  updateOrder(newOrder: IOrder) {
    const currentOrder = this.selectedOrder$.value;
    console.log(newOrder.name, currentOrder.name);

    const isChanged = !this.helperService.isObjectsEqual(currentOrder, newOrder);

    if (isChanged) {
      console.log('post', this.apiPath, newOrder);

      // let value = { id: 4, name: 'nameee' };
      // let value = {
      //   id: newOrder.id,
      //   name: newOrder.name,
      //   isAllegroPay: newOrder.isAllegroPay
      // };
      const value = newOrder;
      // let date=newOrder.receivedDate
      // value.receivedDate = new Date(date?.year, date?.month - 1, date?.day);
      console.log(value.purchase.orderValue);
      console.log(newOrder.purchase.orderValue);
      this.http.post<IOrder>(`${this.apiPath}`, newOrder).subscribe(res => {
        console.log(res);

      },
        (err) => {
          // console.log(err);
        }
      );
      // newOrder = { ...newOrder };
      // let list = this.ordersList$.value;
      // if (newOrder.id === 0) {
      //   newOrder.id = Math.max(...list.map(o => o.id)) + 1;
      //   list.push(newOrder);
      // }
    }
  }











}
