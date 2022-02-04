import { StatusEnum } from './status.enum';
import { IMyDate } from "./my-date";

export interface IOrder {
  id: number;
  // seller:string;  // sprzedajacy
  name: string; //zamowienie
  isAllegroPay?: StatusEnum;// allegro Pay	
  isBusinessOrder?: boolean; //na firme?
  orderValue?: number;// suma kupionych

  isInvoiceReceived?: boolean;// faktura OK ?
  isPackageReceived?: boolean; // Przesyłka odebrana
  receivedDate?: string;// Data odebrania -> 

  isReturnIssued?: boolean; //Zwrot zgłoszony

  returnToDate?: IMyDate;// odeslij do
  returnCode?: string;// kod zwrotu
  returnValue?: number; // kwota do zwrotu

  isReturnSended?: boolean;// Zwrot wysłany
  isReturnDelivered?: boolean;// Zwrot u sprzedającego
  isCashReturned?: boolean;// zwrot na koncie
  isInvoiceCorrectionReceived?: boolean;// korekta OK ?

  isFinished: boolean; // ALL OK
  comment?: string; // notatka
}

export class Order {
  id = 0;
  // seller:string;  // sprzedajacy
  name = ''; //zamowienie
  // isAllegroPay = StatusEnum.Unknown;// allegro Pay	
  isBusinessOrder?: boolean; //na firme?
  orderValue?: number;// suma kupionych

  isInvoiceReceived?: boolean;// faktura OK ?
  isPackageReceived?: boolean; // Przesyłka odebrana
  receivedDate?: string;// Data odebrania -> 

  isReturnIssued?: boolean; //Zwrot zgłoszony

  returnToDate?: IMyDate;// odeslij do
  returnCode?: string;// kod zwrotu
  returnValue?: number; // kwota do zwrotu

  isReturnSended?: boolean;// Zwrot wysłany
  isReturnDelivered?: boolean;// Zwrot u sprzedającego
  isCashReturned?: boolean;// zwrot na koncie
  isInvoiceCorrectionReceived?: boolean;// korekta OK ?

  isFinished = false; // ALL OK
  comment?: string; // notatka
}







export const EXAMPLE_ROWS: IOrder[] = [
  {
    id: 1,
    name: 'spieniacz do mleka ten drugi zwracany',
    // isAllegroPay: StatusEnum.Yes,
    isBusinessOrder: true,
    orderValue: 188,
    isPackageReceived: true,
    returnToDate: { year: 2022, month: 1, day: 1 },
    returnCode: '889 465 645 2',
    returnValue: 188,
    isReturnSended: true,
    isReturnDelivered: true,
    isCashReturned: false,
    isFinished: false,
    comment: 'anycomm'
  },
  {
    id: 2,
    name: 'sonoff zwracany bo pomylka  ',
    isAllegroPay: StatusEnum.No,
    isBusinessOrder: true,
    orderValue: 56.12,
    isPackageReceived: true,
    returnCode: '889 444 555 2',
    returnValue: 56.12,
    isReturnSended: true,
    isReturnDelivered: false,
    isCashReturned: false,
    isFinished: false,
    comment: 'soncom'
  },
  {
    id: 3,
    name: 'ubranka z atomizerem  ',
    isAllegroPay: StatusEnum.Unknown,
    isBusinessOrder: false,
    orderValue: 41.97,
    isPackageReceived: true,
    returnCode: '889 444 555 2',
    returnValue: 24.68,
    isReturnSended: true,
    isReturnDelivered: false,
    isCashReturned: false,
    isFinished: false,

  },
]

