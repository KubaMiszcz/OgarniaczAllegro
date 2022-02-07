import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MyorderGroup } from './models';

@Component({
  selector: 'app-import-order',
  templateUrl: './import-order.component.html',
  styleUrls: ['./import-order.component.scss']
})
export class ImportOrderComponent implements OnInit {
  source = '';

  constructor(
    private http: HttpClient
  ) {
    // this.source = EXAMPLE;
  }

  ngOnInit(): void {
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













