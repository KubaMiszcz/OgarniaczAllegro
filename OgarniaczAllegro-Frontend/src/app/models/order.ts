import { IUser } from './user.model';
import { StatusEnum } from './status.enum';
import { IDateYMD } from "./dateYMD";
import { IOrderItem } from './order-item';


export interface IOrder {
  id: string;
  name: string; //zamowienie
  isAllegroPay: StatusEnum;// allegro Pay
  orderItems: IOrderItem[];
  orderValue: number;
  isPackageDelivered?: StatusEnum; // Przesyłka odebrana
  receivedDate?: IDateYMD;// Data odebrania -> 






  isFinished: StatusEnum; // ALL OK
  comment?: string; // notatka





  hasInvoice?: StatusEnum; //na firme?

  isInvoiceReceived?: StatusEnum;// faktura OK ?

  isReturnIssued?: StatusEnum; //Zwrot zgłoszony

  returnToDate?: IDateYMD;// odeslij do
  returnCode?: string;// kod zwrotu
  returnValue?: number; // kwota do zwrotu

  isReturnSended?: StatusEnum;// Zwrot wysłany
  isReturnDelivered?: StatusEnum;// Zwrot u sprzedającego
  isCashReturned?: StatusEnum;// zwrot na koncie
  isInvoiceCorrectionReceived?: StatusEnum;// korekta OK ?




  // owner?:IUser; //remove nullable
  // finishingDare?: IMyDate;
  // putchase as object
  // return as object
  // data odebrania paczki
  // czas na zwrot +14dni albo custom
  // Zwrot zgłoszony +data
  // Zwrot w drodze  +data
  // Zwrot u sprzedającego +data
  // Zwrot zakończony +data
}

export class Order implements IOrder {
  id = '';
  name = '';
  isAllegroPay = StatusEnum.Unknown;
  orderItems = [];
  orderValue = 0;






  receivedDate?: IDateYMD | undefined;
  returnCode?: string | undefined;
  returnValue?: number | undefined;
  comment?: string | undefined;
  // seller:string;  // sprzedajacy 
  hasInvoice?: StatusEnum = StatusEnum.Unknown;
  // hasInvoice = StatusEnum.Unknown; //na firme?
  // orderValue?: number;// suma kupionych
  isInvoiceReceived?: StatusEnum = StatusEnum.No;// faktura OK ?
  isPackageDelivered?: StatusEnum = StatusEnum.No; // Przesyłka odebrana
  // receivedDate?: IMyDate;// Data odebrania -> 
  isReturnIssued?: StatusEnum = StatusEnum.No; //Zwrot zgłoszony
  returnToDate?: IDateYMD;// odeslij do
  // returnCode?: string;// kod zwrotu
  // returnValue?: number; // kwota do zwrotu
  isReturnSended?: StatusEnum = StatusEnum.No;// Zwrot wysłany
  isReturnDelivered?: StatusEnum = StatusEnum.No;// Zwrot u sprzedającego
  isCashReturned?: StatusEnum = StatusEnum.No;// zwrot na koncie
  isInvoiceCorrectionReceived?: StatusEnum = StatusEnum.No;// korekta OK ?
  isFinished = StatusEnum.No;// ALL OK
}







export const EXAMPLE_ROWS: IOrder[] = [
  // {
  //   id: '1',
  //   name: 'spieniacz do mleka ten drugi zwracany',
  //   isAllegroPay: StatusEnum.Yes,
  //   hasInvoice: StatusEnum.Yes,
  //   isInvoiceReceived: StatusEnum.Yes,
  //   orderValue: 188,
  //   isPackageReceived: StatusEnum.Yes,
  //   returnToDate: { year: 2022, month: 1, day: 1 },
  //   returnCode: '889 465 645 2',
  //   returnValue: 188,
  //   isReturnSended: StatusEnum.Yes,
  //   isReturnDelivered: StatusEnum.Yes,
  //   isCashReturned: StatusEnum.No,
  //   isFinished: StatusEnum.No,
  //   comment: 'anycomm'
  // },
  // {
  //   id: '2',
  //   name: 'sonoff zwracany bo pomylka  ',
  //   isAllegroPay: StatusEnum.No,
  //   hasInvoice: StatusEnum.Yes,
  //   orderValue: 56.12,
  //   isPackageReceived: StatusEnum.Yes,
  //   returnCode: '889 444 555 2',
  //   returnValue: 56.12,
  //   isReturnSended: StatusEnum.Yes,
  //   isReturnDelivered: StatusEnum.No,
  //   isCashReturned: StatusEnum.No,
  //   isFinished: StatusEnum.No,
  //   comment: 'soncom'
  // },
  // {
  //   id: '3',
  //   name: 'ubranka z atomizerem  ',
  //   isAllegroPay: StatusEnum.Unknown,
  //   hasInvoice: StatusEnum.No,
  //   orderValue: 41.97,
  //   isPackageReceived: StatusEnum.Yes,
  //   returnCode: '889 444 555 2',
  //   returnValue: 24.68,
  //   isReturnSended: StatusEnum.Yes,
  //   isReturnDelivered: StatusEnum.No,
  //   isCashReturned: StatusEnum.No,
  //   isFinished: StatusEnum.No,
  // },
]

