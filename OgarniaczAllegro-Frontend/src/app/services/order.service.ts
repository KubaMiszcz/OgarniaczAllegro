import { AllegroService } from './allegro.service';
import { HelperService } from './helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrder, Order } from '../models/order';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StatusService } from './status.service';
import { environment } from 'src/environments/environment';
import { IAllegroAllOrders } from '../allegro-stuff/models/all-orders-models';


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

    let list = JSON.parse(localStorage.getItem('orders') ?? '[]');
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
      console.log(value.orderValue);
      console.log(newOrder.orderValue);
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









  importAllegroALlOrdersFromResponse(source: string) {
    const allOrdersJSON = this.allegroService.getJSONFromAllegroAllOrdersResponse(source);



    const oldList = this.helperService.getDeepCopy(this.allOrdersList$.value);
    let newList: IOrder[] = [];

    try {
      const allAllegroOrders: IAllegroAllOrders = JSON.parse(allOrdersJSON);
      newList = this.allegroService.fillOrdersFromAllegroImport(allAllegroOrders, oldList);
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
















  fillOrdersFromAllegroImport(allAllegroOrders: IAllegroAllOrders) {
    const currentList = this.allOrdersList$.value;
    const newList = this.allegroService.fillOrdersFromAllegroImport(allAllegroOrders, currentList);
  }



}
