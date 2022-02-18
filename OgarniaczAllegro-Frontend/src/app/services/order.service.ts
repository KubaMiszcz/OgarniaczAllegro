import { AllegroEnums } from '../models/allegro-models/allegro-enums';
import { IAllegroSingleOrder, ISingleOrderGroup } from '../models/allegro-models/single-order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusEnum } from '../models/constants/status.enum';
import { IOrder, Order } from '../models/order.model';
import { IAllegroAllOrders, IOrderGroup } from '../models/allegro-models/all-orders.model';
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
    this.selectedOrder$.next({ ...order } as IOrder);
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









  importAllegroAllOrdersFromResponse(source: string) {
    const allOrdersJSON = this.allegroService.getJSONFromAllegroAllOrdersResponse(source);

    const allOrdersView: IAllegroAllOrders = JSON.parse(allOrdersJSON);
    const allAllegroOrders: IOrderGroup[] = allOrdersView?.myorders?.orderGroups;

    const oldList = this.helperService.getDeepCopy(this.allOrdersList$.value);
    let newList: IOrder[] = [];

    try {
      newList = this.fillOrdersFromAllegroImport(allAllegroOrders, oldList);
      console.log(`first ${allOrdersView.limit} order from ${allOrdersView.myorders.total} imported sucessfully`);

    } catch (error) {
      console.warn('something wrong with importAllegroOrdersFromResponse');
      alert('something wrong with importAllegroOrdersFromResponse');
      newList = oldList;

    } finally {
      this.allOrdersList$.next(oldList);
    }

  }

  importAllegroSingleOrderFromResponse(source: string) {
    const json = this.allegroService.getJSONFromAllegroSingleOrderResponse(source);
    console.log(json);

    const singleOrdersJSON = this.allegroService.getJSONFromAllegroSingleOrderResponse(source);
    const singleOrderView: IAllegroSingleOrder = JSON.parse(singleOrdersJSON);
    const singleAllegroOrder: ISingleOrderGroup = singleOrderView.myorderGroup;



    // const oldList = this.helperService.getDeepCopy(this.allOrdersList$.value);
    // let newList: IOrder[] = [];
    // try {
    //   const allAllegroOrders: IAllegroAllOrders = JSON.parse(json);
    //   newList = this.allegroService.fillOrdersFromAllegroImport(allAllegroOrders, oldList);
    // } catch (error) {
    //   console.warn('something wrong with importAllegroOrdersFromResponse');
    //   alert('something wrong with importAllegroOrdersFromResponse');
    //   newList = oldList;
    // } finally {
    //   this.allOrdersList$.next(oldList);
    // }
  }































  private fillOrdersFromAllegroImport(importedList: IOrderGroup[], oldOrderList: IOrder[]): IOrder[] {
    importedList.forEach(group => {
      const existedOrderIdx = oldOrderList.findIndex(o => o.id === group.groupId);

      if (existedOrderIdx >= 0) {
        const order = this.getUpdatedOrder(oldOrderList[existedOrderIdx], group);
        oldOrderList[existedOrderIdx] = order;

      } else {
        oldOrderList.push(this.createOrderFromGroup(group));
      }
    });

    return oldOrderList;
  }


  private getUpdatedOrder(oldOrder: IOrder, group: IOrderGroup): IOrder {
    const order = group.myorders[0];

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


  private createOrderFromGroup(group: IOrderGroup): IOrder {
    // createOrderFromGroup(group: IOrderGroup): IOrder {
    // !!!!!!!!!!!!!!!!
    // dont use group.myorders, just go straight into
    // group.myorders[0].order
    // myorders has alway one item: order
    // and there is all info about it

    const order = group.myorders[0];
    const name = order.offers.map(o => '- ' + o.title.slice(0, 100)).join('\n');

    return {
      allegroJson: JSON.stringify(order),
      id: group.groupId,
      name: name,
      isNew: true,
      status: order.status.primary.status,
      purchase: {
        isAllegroPay: order.payment.method === AllegroEnums.AllegroPay ? StatusEnum.Yes : StatusEnum.No,
        // purchaseItems: order.offers,
        orderValue: Number(order.totalCost.amount),
        // isPackageDelivered: order.delivery.status === AllegroStatusEnums.DELIVERED ? StatusEnum.Yes : StatusEnum.No,
        // deliveredDate: this.helperService.getDateYMD(order.delivery.timestamp),
        isPackageReceived: StatusEnum.No,
      } as IPurchase,
      return: {},
      isFinished: StatusEnum.No
    };
  }
















}
