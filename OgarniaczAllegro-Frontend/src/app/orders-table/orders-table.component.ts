import { Subject } from 'rxjs';
import { OrderService } from '../services/order.service';
import { IOrder, Order } from '../models/order.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  allOrdersList: IOrder[] = [];
  // allOrdersList$ = this.orderService.allOrdersList$;


  selectedOrder: IOrder = new Order();

  @ViewChild('orderDetailsModal') orderDetailsModal: any;
  private modalRef!: NgbModalRef;


  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,

  ) {

    this.orderService.allOrdersList$.subscribe(ol => {
      this.allOrdersList = ol.sort();
      // ol[0].purchase.purchaseDate
      // this.allOrdersList = _.orderBy(ol, ['purchase'], ['asc']); // Use Lodash to sort array by 'name'
      this.allOrdersList = _.sortBy(ol, o => o.purchase.purchaseDate).reverse();

    });
    // this.ordersList$ = this.orderService.ordersList$;
    this.orderService.selectedOrder$.subscribe(o => this.selectedOrder = o);
  }

  ngOnInit(): void { }

  onRowSelected(order: IOrder | null) {
    this.orderService.selectOrder(order);
  }

  isInEdit(order: IOrder) {
    return order.id === this.selectedOrder.id;
  }

  // addNewOrder(order: IOrder) {
  //   this.orderService.addNewOrder(order);
  // }

  updateOrder(order: IOrder) {
    this.orderService.updateOrder(order);
  }

  onOpenDetails(order: IOrder) {
    // this.orderService.showDetailsModal(order);
    this.modalRef = this.modalService.open(this.orderDetailsModal, {
      size: 'lg',
      backdrop: 'static',
      ariaLabelledBy: 'modal-basic-title'
    });
  }

  onCloseModal(result: string) {
    this.modalRef.close();
  }

  sortBy(colName: string) {
    // this.allOrdersList = _.sortBy(this.allOrdersList, o => o['name']).reverse();
    this.allOrdersList = this.allOrdersList.reverse();
  }

}
