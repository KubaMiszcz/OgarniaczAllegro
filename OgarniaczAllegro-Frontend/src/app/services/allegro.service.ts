import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAllegroAllOrders, IOrderGroup } from '../models/allegro-models/all-orders.model';
import { IOrder } from '../models/order.model';
import { StatusEnum } from '../models/constants/status.enum';
import { AllegroEnums } from '../models/allegro-models/allegro-enums';
import { HelperService } from './helper.service';
import { StatusService } from './status.service';


@Injectable({
  providedIn: 'root'
})
export class AllegroService {


  constructor(
    private statusService: StatusService,
    private helperService: HelperService,
    private http: HttpClient,
  ) { }

  getJSONFromAllegroAllOrdersResponse(source: string): string {
    const beginningSubstring = '"filter":';
    const endingSubstring = '"slots":';

    return this.getJSONFromAllegroResponse(source, beginningSubstring, endingSubstring);
  }

  getJSONFromAllegroSingleOrderResponse(source: string) {
    const beginningSubstring = '"myorderGroup":';
    const endingSubstring = '"myorderGroup.$meta":';

    return this.getJSONFromAllegroResponse(source, beginningSubstring, endingSubstring);
  }



















  private getJSONFromAllegroResponse(source: string, beginningSubstring: string, endingSubstring: string): string {
    const foundedByBeginMark = source.split(beginningSubstring);
    const possibleJsons: string[] = [];

    foundedByBeginMark.forEach(part => {
      const json = part.split(endingSubstring);
      if (json.length > 1) {
        possibleJsons.push(json[0]);
      }
    });

    if (possibleJsons.length > 1) {
      this.checkIfAllJsonsIdentical(possibleJsons);
    }

    let finalJson = possibleJsons[0];

    if (!finalJson) {
      return 'null';
    }

    finalJson = '{' + beginningSubstring + finalJson + endingSubstring + '{}}';

    return finalJson;
  }


  private checkIfAllJsonsIdentical(list: string[]) {
    list.forEach(item => {
      if (list[0] !== item) {
        console.error('not identical');
        throw new Error('Jsons not identical.');
      }
    });
  }

}
