import { OrderService } from './../services/order.service';
import { IOrder, Order } from '../models/order.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogResultEnum } from '../models/constants/dialog-result.enum';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent implements OnInit {
  @Input() order: IOrder = new Order();

  source = '';

  @Output() close = new EventEmitter<string>();

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    console.log('OrderDetailsModalComponent',
      // '' + this.order?.allegroJson,
      '\n',
      '\nparsedFromAllegro', JSON.parse(this.order?.allegroJson ?? 'null'),
      '\n',
      '\nimportedOrder', this.order,
      '\n'
    );
  }

  importOrder() {
    this.orderService.importAllegroSingleOrderFromResponse(this.source);
  }

  closeModal(result: string = DialogResultEnum.Cancel): void {
    this.close.emit(result);
  }


  onKeyPressed(event: KeyboardEvent) {
    if (
      event.code === 'Enter'
      // || event.code === 'Space'
    ) {
      this.closeModal(DialogResultEnum.OK);
    } else if (
      event.code === 'Escape'
    ) {
      this.closeModal(DialogResultEnum.Cancel);
    }
  }

}
