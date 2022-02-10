import { HelperService } from './../services/helper.service';
import { StatusEnum } from './../models/status.enum';
import { IOrder, Order } from './../models/order';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'tr[app-order-row]',
  templateUrl: './order-row.component.html',
  styleUrls: ['./order-row.component.scss']
})
export class OrderRowComponent implements OnInit {
  @Input() order: IOrder = new Order();
  @Input() isInEdit = false;

  @Output() editComplete = new EventEmitter<IOrder>();
  @Output() openDetails = new EventEmitter<IOrder>();

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit(): void { }

  addNew() {
    this.editComplete.emit(this.order);
  }

  triStateClicked(colName: string) {
    switch (colName) {
      case this.helperService.nameof<Order>('hasInvoice'):

        // this.order.isInvoiceCorrectionReceived = this.order[colName] === StatusEnum.Yes ? StatusEnum.NA : StatusEnum.Unknown;
        // console.log(colName, this.order[colName], this.order.isInvoiceCorrectionReceived)


        break;

      default:
        break;
    }
  }


  onLostFocus(event: any) {
    this.editComplete.emit(this.order);
  }

  onOpenDetails(value: IOrder) {
    this.openDetails.emit(this.order);
  }
}

