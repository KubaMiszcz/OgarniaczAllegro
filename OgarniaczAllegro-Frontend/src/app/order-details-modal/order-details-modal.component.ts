import { IOrder, Order } from './../models/order';
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

  @Output() close = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  closeModal(result: string = DialogResultEnum.Cancel): void {
    this.close.emit(result);
  }


  onKeyPressed(event: KeyboardEvent) {
    if (
      event.code === 'Enter'
      // || event.code === 'Space'
      // || event.code === 'Escape'
    ) {
      this.closeModal(DialogResultEnum.OK);
    } else {
      this.closeModal(DialogResultEnum.Cancel);
    }
  }

}
