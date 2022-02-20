import { AllegroService } from './../services/allegro.service';
import { OrderService } from './../services/order.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAllegroAllOrders } from '../allegro-stuff/models/all-orders-models';
import { MyorderGroup } from './models';

@Component({
  selector: 'app-import-order',
  templateUrl: './import-order.component.html',
  styleUrls: ['./import-order.component.scss']
})
export class ImportOrderComponent implements OnInit {
  source = '';
  ouput = '';

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
  }

  importAllOrders() {
    this.orderService.importAllegroOrdersFromResponse(this.source);
  }
















  importAllegroByHttp() {
    let url = ''
    this.http.get('https://allegro.pl/moje-allegro/zakupy/kupione/68dc4241-822c-11ec-8853-81b5175aaf53').subscribe(res => {
      console.log(res);

    },
      error => {
        console.log(error);

      })
  }

}


