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

  getIssueReturnToDate(): string | null {
    const date = this.order.purchase.issueReturnToDate;

    if (!date) {
      return 'Nie ' + AllegroParcelStatusEnums.DELIVERED;
    }

    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }


  setIssueReturnToDate(value: NgbDate) {
    const date = new Date(`${value.year}-${value.month}-${value.day}`)
    if (date.getDate() < new Date().getDate()) {
      alert('juz za pozno, za wczesna data');

      return;
    }

    this.order.purchase.issueReturnToDate = date;
  }
}

