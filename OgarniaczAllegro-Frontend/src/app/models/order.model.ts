import { AllegroParcelStatusEnums } from './allegro-models/allegro-enums';
import { TriStateStatusEnum } from './constants/status.enum';
// import { IDateYMD } from './date-YMD.model';
import { IPurchase } from './purchase.model';
import { IReturn } from './return.model';


export interface IOrder {
  allegroJson?: string; //remove later
  id: string;


  isNew: boolean;
  name: string; //zamowienie


  purchase: IPurchase;
  return?: IReturn;


  isCashReturned: TriStateStatusEnum;
  isFinished: TriStateStatusEnum; // ALL OK
  finishingDate?: Date;

  comment?: string; // notatka

  // owner?:IUser; //remove nullable



  //=====================


  // purchase as object
  // return as object
  // czas na zwrot +14dni albo custom
  // Zwrot zgłoszony +data
  // Zwrot w drodze  +data
  // Zwrot u sprzedającego +data
  // Zwrot zakończony +data
}

export class Order implements IOrder {
  return?: IReturn | undefined;
  finishingDate?: Date | undefined;
  comment?: string | undefined;
  allegroJson?: string | undefined;

  id = '';
  name = '';
  isNew = false;
  isAllegroPay = TriStateStatusEnum.UNKNOWN;

  purchase = {
    isAllegroPay: TriStateStatusEnum.UNKNOWN,
    purchaseItems: [],
    orderValue: 0,
    purchaseDate: new Date(),
    status: AllegroParcelStatusEnums.UNKNOWN,
    statusTimestamp: new Date(),
    isInvoiceReceived: TriStateStatusEnum.UNKNOWN,
    issueReturnToDate: new Date(),
  } as IPurchase;

  isCashReturned = TriStateStatusEnum.NO;

  isFinished = TriStateStatusEnum.NO; // ALL OK
}







// export const EXAMPLE_ROWS_XXX: IOrder[] = [
  // {
  //   id: '1',
  //   name: 'spieniacz do mleka ten drugi zwracany',
  //   isAllegroPay: StatusEnum.YES,
  //   hasInvoice: StatusEnum.YES,
  //   isInvoiceReceived: StatusEnum.YES,
  //   orderValue: 188,
  //   isPackageReceived: StatusEnum.YES,
  //   returnToDate: { year: 2022, month: 1, day: 1 },
  //   returnCode: '889 465 645 2',
  //   returnValue: 188,
  //   isReturnSended: StatusEnum.YES,
  //   isReturnDelivered: StatusEnum.YES,
  //   isCashReturned: StatusEnum.NO,
  //   isFinished: StatusEnum.NO,
  //   comment: 'anycomm'
  // },
  // {
  //   id: '2',
  //   name: 'sonoff zwracany bo pomylka  ',
  //   isAllegroPay: StatusEnum.NO,
  //   hasInvoice: StatusEnum.YES,
  //   orderValue: 56.12,
  //   isPackageReceived: StatusEnum.YES,
  //   returnCode: '889 444 555 2',
  //   returnValue: 56.12,
  //   isReturnSended: StatusEnum.YES,
  //   isReturnDelivered: StatusEnum.NO,
  //   isCashReturned: StatusEnum.NO,
  //   isFinished: StatusEnum.NO,
  //   comment: 'soncom'
  // },
  // {
  //   id: '3',
  //   name: 'ubranka z atomizerem  ',
  //   isAllegroPay: StatusEnum.UNKNOWN,
  //   hasInvoice: StatusEnum.NO,
  //   orderValue: 41.97,
  //   isPackageReceived: StatusEnum.YES,
  //   returnCode: '889 444 555 2',
  //   returnValue: 24.68,
  //   isReturnSended: StatusEnum.YES,
  //   isReturnDelivered: StatusEnum.NO,
  //   isCashReturned: StatusEnum.NO,
  //   isFinished: StatusEnum.NO,
  // },
// ];

