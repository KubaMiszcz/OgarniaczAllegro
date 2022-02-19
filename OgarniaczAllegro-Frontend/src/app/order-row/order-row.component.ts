import { AllegroParcelStatusEnums } from './../models/allegro-models/allegro-enums';
import { HelperService } from './../services/helper.service';
import { TriStateStatusEnum } from '../models/constants/status.enum';
import { IOrder, Order } from '../models/order.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';


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

  parcelStatuses = AllegroParcelStatusEnums;
  triStateStauses = TriStateStatusEnum;

  constructor(
    private helperService: HelperService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    console.log(this.order.purchase.isInvoiceReceived);
  }

  addNew() {
    this.editComplete.emit(this.order);
  }

  triStateClicked(value: TriStateStatusEnum, colName: string) {
    switch (colName) {
      // case this.helperService.nameof<Order>('hasInvoice'):

      // this.order.isInvoiceCorrectionReceived = this.order[colName] === StatusEnum.Yes ? StatusEnum.NA : StatusEnum.Unknown;
      // console.log(colName, this.order[colName], this.order.isInvoiceCorrectionReceived)


      // break;

      case 'invoiceReceived':
        console.log(value);
        this.order.purchase.isInvoiceReceived = value;
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

  getStatus() {
    return this.helperService.getValueFromEnum(AllegroParcelStatusEnums, this.order.purchase.status)
      ?? this.order.purchase.status
      ?? 'MISSING_ENUM';
  }


  hasStatus(value: string | null = null) {
    const key = this.helperService.getKeyFromEnum(AllegroParcelStatusEnums, value);

    return this.order.purchase.status === key;
  }

  getReturnToDate() {
    // swicth to labels get riod of getkey from enum
    const status = this.helperService.getValueFromEnum(AllegroParcelStatusEnums, this.order.purchase.status);
    const timestamp = this.order.purchase.statusTimestamp;
    if (timestamp && status === AllegroParcelStatusEnums.DELIVERED) {
      const date = new Date(timestamp);
      date?.setDate(date.getDate() + 14);

      return this.datepipe.transform(date, 'yyyy-MM-dd');
    }

    return 'N/A';
  }
}

