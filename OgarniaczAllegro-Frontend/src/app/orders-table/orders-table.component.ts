import { OrderServiceService } from './../services/order-service.service';
import { IOrderRow, EXAMPLE_ROWS } from './../models/order';
import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  ordersList: IOrderRow[] = [];

  editedRow: IOrderRow = this.ordersList[0];
  NGBselectedDate: NgbDateStruct = { year: 0, month: 0, day: 0 };


  // date: { year: number, month: number };



  constructor(
    private orderServiceService: OrderServiceService,
    private ngbCalendar: NgbCalendar,
  ) {
    this.orderServiceService.ordersList$.subscribe(ol => this.ordersList = ol);

  }

  ngOnInit(): void { }

  onEdit(value: any, colName: string | null) {
    this.editedRow = this.editedRow?.name === value?.name ? null : value;
    console.log(value);
  }

  // getNGBreturnToDate(value: Date | undefined) {
  // return `${value?.getFullYear}-${value?.getMonth}-${value?.getDay}`
  // let res: NgbDateStruct = {
  //   "year": 2022,
  //   "month": 2,
  //   "day": 3
  // }
  // return res
  // }

  onDateSelected(value: IOrderRow) {
    // console.log(value);
    // let order = this.ordersList.find(o => o.name === value.name);
    // order!.returnToDate = new Date(this.orderReturnToDate());
    // console.log(order?.returnToDate);

    // // returnToDate.setFullYear =

  }

  orderReturnToDate() {
    // return `${this.NGBselectedDate.year}-${this.NGBselectedDate?.month}-${this.NGBselectedDate?.day}`;
  }

}
