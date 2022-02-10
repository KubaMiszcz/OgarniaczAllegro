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
  ordersList: IOrder[] = [];
  selectedOrder: IOrder = new Order();
  showAddNewRow = false;

  // showOrderDetailsModal$ = this.orderService.showOrderDetailsModal$;
  private modalRef!: NgbModalRef;


  @ViewChild('orderDetailsModal') orderDetailsModal: any;


  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,

  ) {
    this.orderService.showAddNewOrderRow$.subscribe(s => this.showAddNewRow = s);

    this.orderService.ordersList$.subscribe(ol => this.ordersList = ol);
    this.orderService.selectedOrder$.subscribe(o => this.selectedOrder = o);
  }

  ngOnInit(): void { }

  selectRow(order: IOrder | null) {
    this.orderService.selectOrder(order);
  }

  isInEdit(order: IOrder) {
    return order.id === this.selectedOrder.id;
  }

  addNewOrder(order: IOrder) {
    this.orderService.addNewOrder(order);
  }

  updateOrder(order: IOrder) {
    this.orderService.updateOrder(order);
  }

  onOpenDetails(order: IOrder) {
    // this.orderService.showDetailsModal(order);
    this.modalRef = this.modalService.open(this.orderDetailsModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeModal(result: string) {
    this.modalRef.close();
    console.log(result);
  }


  // open() {
  //   this.modalService.open(this.orderDetailsModal, { ariaLabelledBy: 'modal-basic-title' });
  // }

  // open2(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  // }

  showModal() {
    // this.eventPickingFinished = false;
    // this.modalRef = this.modalService.open(this.orderDetailsModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });

    // let idx = 0;
    // let cnt = 0;
    // let handle = setInterval(() => {
    //   this.activeTypeName = this.eventTypes[idx].name;
    //   if (cnt > this.minHitCount && this.eventTypes[idx].type === this.currentEvent.type) {
    //     clearInterval(handle);
    //     this.eventPickingFinished = true;
    //   }

    //   idx++;
    //   cnt++;

    //   if (idx >= this.eventTypes.length) {
    //     idx = 0;
    //   }

    // }, this.hitInterval);
  }

}
