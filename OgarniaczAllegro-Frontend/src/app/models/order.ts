import { IMyDate } from "./my-date";

export interface IOrderRow {
  // seller:string;  // sprzedajacy
  name: string; //zamowienie
  isAllegroPay?: boolean;// allegro Pay	
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

  isFinished?: boolean; // ALL OK
  comment?: string; // notatka
}


export const EXAMPLE_ROWS: IOrderRow[] = [
  {
    name: 'spieniacz do mleka ten drugi zwracany',
    isAllegroPay: true,
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
    name: 'sonoff zwracany bo pomylka  ',
    isAllegroPay: true,
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
    name: 'ubranka z atomizerem  ',
    isAllegroPay: true,
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

