import { IStatus } from '../models/status.model';
import { CURRENT_USER as CURRENT_USER } from '../models/user.model';
import { EXAMPLE_ROWS, IOrder, Order } from '../models/order';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiPath = `${environment.apiPath}/status`;

  statuses: IStatus[] = [];

  constructor(
    private http: HttpClient,
  ) {
    this.fetchStatuses();
  }

  fetchStatuses() {
    this.http.get<IStatus[]>(`${this.apiPath}`).subscribe(s => {
      this.statuses = s;
    });
  }

}
