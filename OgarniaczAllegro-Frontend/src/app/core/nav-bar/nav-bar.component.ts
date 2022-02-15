import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  showAddNewRow = true;

  constructor(
    private orderService: OrderService,
    private statusService: StatusService,
  ) { }

  ngOnInit(): void { }

  testDEV() {
    console.log(this.statusService.statuses)
  }

  toggleAddNewRow() {
    this.showAddNewRow = !this.showAddNewRow;
    this.orderService.showAddNewOrderRow$.next(this.showAddNewRow);
  }

  manageLocalStorage(value: string) {
    switch (value) {
      case 'save':
        localStorage.setItem('orders', JSON.stringify(this.orderService.ordersList$.value));
        break;

      case 'load':
        this.orderService.ordersList$.next(JSON.parse(localStorage.getItem('orders') ?? ''));
        break;

      case 'clear':
        localStorage.clear();
        this.orderService.ordersList$.next([]);
        break;

      default:
        break;
    }
  }


}
