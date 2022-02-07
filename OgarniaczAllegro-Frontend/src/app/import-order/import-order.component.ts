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
    let allAllegroOrders: IAllegroAllOrders = JSON.parse(this.getAllAllegroOrdersJSON(this.source));
    this.orderService.fillOrdersFromAllegroImport(allAllegroOrders);
  }

  getAllAllegroOrdersJSON(source: string): string {
    let beginMark = '"filter":';
    let endingMark = '"slots":';

    let foundedByBeginMark = this.source.split(beginMark);
    let possibleJsons: string[] = [];

    foundedByBeginMark.forEach(part => {
      let json = part.split(endingMark);
      if (json.length > 1) {
        possibleJsons.push(json[0]);
      }
    });

    if (possibleJsons.length > 1) {
      this.checkIfAllJsonsIdentical(possibleJsons)
    }

    // let finalJson = possibleJsons[0]?.slice(0, -1); //remove last char - comma
    let finalJson = possibleJsons[0];

    finalJson = '{' + beginMark + finalJson + endingMark + '{}}';

    return finalJson;
  }














  parse() {
    // console.log(this.source);
    let parts = this.source.split('"myorderGroup":');
    let parts2 = [];
    let restable: string[] = [];
    parts.forEach(p => {
      let pp = p.split('"myorderGroup.$meta":');
      if (pp.length > 1) {
        restable.push(pp[0]);
        // console.log(pp[0]);
      }
    });

    restable.forEach(r => {
      if (restable[0] !== r) {
        console.log('not identical');
      }
    })

    let json = restable[0].slice(0, -1); //remove last char - comma

    json = '{"myorderGroup":' + json + '}';

    console.log('jsob', json);

    let resobj = JSON.parse(json) as MyorderGroup;
    console.log('xxx', resobj);
    console.log('===========================================');
    console.log(resobj.myorders[0].offers[0].offerPrice);

  }

























  private checkIfAllJsonsIdentical(list: string[]) {
    list.forEach(item => {
      if (list[0] !== item) {
        console.log('not identical');
        throw new Error('Jsons not identical.');
      }
    });
  }


  importAllegro() {
    let url = ''
    this.http.get('https://allegro.pl/moje-allegro/zakupy/kupione/68dc4241-822c-11ec-8853-81b5175aaf53').subscribe(res => {
      console.log(res);

    },
      error => {
        console.log(error);

      })
  }

}


