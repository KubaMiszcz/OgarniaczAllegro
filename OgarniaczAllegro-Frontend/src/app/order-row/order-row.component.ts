import { AllegroParcelStatusEnums } from './../models/allegro-models/allegro-enums';
import { HelperService } from './../services/helper.service';
import { StatusEnum } from '../models/constants/status.enum';
import { IOrder, Order } from '../models/order.model';
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

  parcelStatuses = AllegroParcelStatusEnums;

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    console.log(this.order.purchase.isInvoiceReceived);
  }

  addNew() {
    this.editComplete.emit(this.order);
  }

  triStateClicked(value: StatusEnum, colName: string) {
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
    return this.helperService.getValueFromEnum(AllegroParcelStatusEnums, this.order.status) ?? this.order.status;
  }


  hasStatus(value: string | null = null) {
    const key = this.helperService.getKeyFromEnum(AllegroParcelStatusEnums, value);

    return this.order.status === key;
  }
}

