import { IOrderItem } from './../models/purchase-item.model';
import { AllegroEnums } from '../models/allegro-models/allegro-enums';
import { ISingleOrderView, ISingleOrderAllegro, ISingleOrderGroup } from '../models/allegro-models/single-order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusEnum } from '../models/constants/status.enum';
import { IOrder, Order } from '../models/order.model';
import { IAllegroAllOrdersView, IMyOrderAllAllegro, IOrderGroup } from '../models/allegro-models/all-orders.model';
import { AllegroService } from './allegro.service';
import { HelperService } from './helper.service';
import { StatusService } from './status.service';
import { IPurchase } from '../models/purchase.model';


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
    const allOrdersJSON = this.allegroService.getJSONFromAllegroAllOrdersResponse(source);

    const allOrdersView: IAllegroAllOrdersView = JSON.parse(allOrdersJSON);
    console.log(allOrdersView);


    if (allOrdersView.myorders.orderGroups.some(g => g.myorders.length > 1)) {
      alert('group.myorders.length>1');
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // dont use group.myorders, just go straight into
    // group.myorders[0].order
    // myorders has alway one item: order
    // and in this first item there is all info about it
    // maybe it has more when you pay for more orders in one payment?

    const allAllegroOrders = allOrdersView.myorders.orderGroups.map(o => o.myorders[0]);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let newList: IOrder[] = [];

    try {
      const oldList = this.helperService.getDeepCopy(this.allOrdersList$.value);
      newList = this.fillAllOrdersFromAllegroImport(allAllegroOrders, oldList);
      console.log(`first ${allOrdersView.limit} order from ${allOrdersView.myorders.total} imported sucessfully`);

    } catch (error) {
      console.warn('something wrong with importAllegroOrdersFromResponse');
      alert('something wrong with importAllegroOrdersFromResponse');
    }

    this.allOrdersList$.next(newList);
  }



  importAllegroSingleOrderFromResponse(source: string) {
    const json = this.allegroService.getJSONFromAllegroSingleOrderResponse(source);
    console.log(json, JSON.parse(json));

    const singleOrdersJSON = this.allegroService.getJSONFromAllegroSingleOrderResponse(source);
    const singleOrderView: ISingleOrderView = JSON.parse(singleOrdersJSON);

    if (singleOrderView?.myorderGroup?.myorders?.length > 1) {
      alert('group.myorders.length>1');
    }

    const singleAllegroOrder: ISingleOrderAllegro = singleOrderView?.myorderGroup?.myorders[0];

    console.log('singleAllegroOrder', singleAllegroOrder);


    let newList: IOrder[] = [];

    try {
      const oldList = this.helperService.getDeepCopy(this.allOrdersList$.value);
      newList = this.fillSingleOrderFromAllegroImport(singleAllegroOrder, oldList);
    } catch (error) {
      console.warn('something wrong with importAllegroSingleOrderFromResponse');
      alert('something wrong with importAllegroSingleOrderFromResponse');
    }

    this.allOrdersList$.next(newList);
  }






























  private fillAllOrdersFromAllegroImport(importedList: IMyOrderAllAllegro[], oldOrderList: IOrder[]): IOrder[] {

    importedList.forEach(importedOrder => {
      oldOrderList = this.fillSingleOrderFromAllegroImport(importedOrder, oldOrderList);
    });

    return oldOrderList;
  }

  private fillSingleOrderFromAllegroImport(importedOrder: IMyOrderAllAllegro | ISingleOrderAllegro, oldOrderList: IOrder[]): IOrder[] {
    const existedOrderIdx = oldOrderList.findIndex(oldOrder => oldOrder.id === importedOrder.purchaseId);

    if (existedOrderIdx >= 0) {
      const updatedOrder = this.getUpdatedOrderFromImported(oldOrderList[existedOrderIdx], importedOrder);
      oldOrderList[existedOrderIdx] = updatedOrder;
    } else {
      oldOrderList.push(this.createNewOrderFromImportedOrder(importedOrder));
    }

    return oldOrderList;
  }



  private getUpdatedOrderFromImported(oldOrder: IOrder, order: IMyOrderAllAllegro | ISingleOrderAllegro): IOrder {
    return {
      ...oldOrder,
      allegroJson: JSON.stringify(order),
      isNew: false,
      status: order.status.primary.status,
      // purchase: {
      // ...oldOrder.purchase,
      // isPackageReceived: order.delivery.status === AllegroStatusEnums.DELIVERED ? StatusEnum.Yes : StatusEnum.No,
      // deliveredDate: this.helperService.getDateYMD(order.delivery.timestamp),
      // }
    };
  }


  private createNewOrderFromImportedOrder(order: IMyOrderAllAllegro | ISingleOrderAllegro): IOrder {
    const name = order.offers.map(o => '- ' + o.title.slice(0, 100)).join('\n');

    console.log((order as IMyOrderAllAllegro).invoiceAddressId ? StatusEnum.Yes : StatusEnum.NA);

    // const result: IOrder = {
    return {
      allegroJson: JSON.stringify(order),
      id: order.purchaseId, //same as order.id
      name: name,
      isNew: true,
      status: order.status.primary.status,
      purchase: {
        isAllegroPay: order.payment.method === AllegroEnums.AllegroPay ? StatusEnum.Yes : StatusEnum.No,
        purchaseItems: order.offers.map(o => ({ name: o.title } as IOrderItem)),
        orderValue: Number(order.totalCost.amount),
        hasInvoice: (order as IMyOrderAllAllegro).invoiceAddressId ? StatusEnum.Yes : StatusEnum.No,
        isInvoiceReceived: StatusEnum.No,
        // isPackageDelivered: order.delivery.status === AllegroStatusEnums.DELIVERED ? StatusEnum.Yes : StatusEnum.No,
        // deliveredDate: this.helperService.getDateYMD(order.delivery.timestamp),
        // isPackageReceived: StatusEnum.No,
      } as IPurchase,
      return: {},
      isFinished: StatusEnum.No
    };

    // return result;
  }










































  // showDetailsModal(order: IOrder) {
  //   order = { ...order } as IOrder
  //   this.selectedOrder$.next({ ...order } as IOrder);
  //   this.showOrderDetailsModal$.next(order);
  // }

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
