import { IUser } from './user.model';
import { StatusEnum } from './constants/status.enum';
import { IDateYMD } from './date-YMD.model';
import { IOrderItem } from './purchase-item.model';


export interface IReturn {
  // isIssued?: StatusEnum; //Zwrot zgłoszony
  // returnToDate?: IDateYMD; // odeslij do
  // returnCode?: string; // kod zwrotu
  // returnValue?: number; // kwota do zwrotu
  // isSended?: StatusEnum; // Zwrot wysłany
  // isDelivered?: StatusEnum; // Zwrot u sprzedającego
  // isCashReturned?: StatusEnum; // zwrot na koncie
  // isInvoiceCorrectionReceived?: StatusEnum; // korekta OK ?
}