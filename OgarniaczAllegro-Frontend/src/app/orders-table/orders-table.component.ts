import { OrderServiceService } from './../services/order-service.service';
import { IOrderRow, EXAMPLE_ROWS } from './../models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  ordersList: IOrderRow[] = [];

  constructor(
    private orderServiceService: OrderServiceService,
  ) {
  }

  ngOnInit(): void {
    this.orderServiceService.ordersList$.subscribe(ol => this.ordersList = ol);
  }

}
