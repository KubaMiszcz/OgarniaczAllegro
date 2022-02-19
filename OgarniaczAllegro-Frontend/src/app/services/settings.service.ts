import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  defaultReturnInterval = 14;
  safeReturnMargin = 3; //warning 3 days earlier
}
