import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStatus } from '../models/status.model';


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
