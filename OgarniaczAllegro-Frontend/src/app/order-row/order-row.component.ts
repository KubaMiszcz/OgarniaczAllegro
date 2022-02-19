import { SettingsService } from './../services/settings.service';
import { AllegroParcelStatusEnums } from './../models/allegro-models/allegro-enums';
import { HelperService } from './../services/helper.service';
import { TriStateStatusEnum } from '../models/constants/status.enum';
import { IOrder, Order } from '../models/order.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbDate, NgbDatepicker, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';


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

  @ViewChild('datePicker') datePicker!: NgbInputDatepicker;


  parcelStatuses = AllegroParcelStatusEnums;
  triStateStauses = TriStateStatusEnum;

  constructor(
    private helperService: HelperService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
  }

  addNew() {
    this.editComplete.emit(this.order);
  }

  triStateClicked(value: TriStateStatusEnum, colName: string) {
    switch (colName) {
      case 'invoiceReceived':
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
    return this.order.purchase.status ?? AllegroParcelStatusEnums.MISSING_ENUM;
  }


  hasStatus(value: string | null = null) {
    return this.order.purchase.status === value;
  }

  //km move to service set when irder created or update it there
  getIssueReturnToDate(): string | null {
    // swicth to labels get riod of getkey from enum
    const date = this.order.purchase.issueReturnToDate;


    if (!date) {
      return 'N/A';
    }

    const status = this.order.purchase.status;
    if (status !== AllegroParcelStatusEnums.DELIVERED) {
      return 'Nie ' + AllegroParcelStatusEnums.DELIVERED;
    }

    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  setIssueReturnToDate(value: NgbDate) {
    console.log(value);
    this.order.purchase.statusTimestamp = new Date(`${value.year}-${value.month}-${value.day}`);
    console.log(this.order.purchase.statusTimestamp);

  }

  onToggle() {
    if (this.order.purchase.issueReturnToDate) {
      // this.datePicker.toggle();
    } else {
      // this.datePicker.close();

    }
  }

  isDatePickerHidden() {
    if (this.isInEdit && this.order.purchase.issueReturnToDate) {
      // console.log(this.isInEdit, this.order.purchase.issueReturnToDate);

      return false;
    }

    return true;
  }


  // get returnToDate() {
  //   const timestamp = this.order.purchase.statusTimestamp ?? new Date();

  //   return new NgbDate(timestamp?.getFullYear(), timestamp?.getMonth() + 1, timestamp?.getDay());
  // }

  // private _returnToDate = new NgbDate(0, 0, 0);
}

