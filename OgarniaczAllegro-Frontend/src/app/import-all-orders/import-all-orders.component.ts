import { AllegroService } from '../services/allegro.service';
import { OrderService } from '../services/order.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAllegroAllOrdersView } from '../models/allegro-models/all-orders.model';
import { MyorderGroup } from './models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-all-orders',
  templateUrl: './import-all-orders.component.html',
  styleUrls: ['./import-all-orders.component.scss']
})
export class ImportOrderComponent implements OnInit {
  source = '';

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  importAllOrders() {
    this.orderService.importAllegroAllOrdersFromResponse(this.source);
    this.router.navigate(['/orders-table']);
  }
















  importAllegroByHttp() {
    const url = '';
    this.http.get('https://allegro.pl/moje-allegro/zakupy/kupione/68dc4241-822c-11ec-8853-81b5175aaf53').subscribe(res => {
      console.log(res);

    },
      error => {
        console.log(error);

      });
  }

}


