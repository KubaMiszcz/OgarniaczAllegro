import { Subject } from 'rxjs';
import { OrderService } from '../services/order.service';
import { IOrder, Order } from './../models/order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  // ordersList: IOrder[] = [];
  allOrdersList$ = this.orderService.allOrdersList$;


  selectedOrder: IOrder = new Order();


  // showAddNewRow = false;
  // showOrderDetailsModal$ = this.orderService.showOrderDetailsModal$;

  @ViewChild('orderDetailsModal') orderDetailsModal: any;
  private modalRef!: NgbModalRef;


  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,

  ) {
    // this.orderService.showAddNewOrderRow$.subscribe(s => this.showAddNewRow = s);

    // this.orderService.ordersList$.subscribe(ol => this.ordersList = ol);
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
    console.log(result);
  }

}
