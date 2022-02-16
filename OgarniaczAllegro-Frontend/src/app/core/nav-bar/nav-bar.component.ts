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
  ) { }
  ngOnInit(): void { }

  manageLocalStorage(value: string) {
    switch (value) {
      case 'save':
        localStorage.setItem('orders', JSON.stringify(this.orderService.allOrdersList$.value));
        break;

      case 'load':
        this.orderService.allOrdersList$.next(JSON.parse(localStorage.getItem('orders') ?? ''));
        break;

      case 'clear':
        localStorage.clear();
        this.orderService.allOrdersList$.next([]);
        break;

      default:
        break;
    }
  }


}