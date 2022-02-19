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
  return: IReturn;


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
  allegroJson?: string | undefined;

  id = '';
  name = '';
  isNew = false;
  isAllegroPay = TriStateStatusEnum.Unknown;

  purchase = {
    isAllegroPay: TriStateStatusEnum.Unknown,
    purchaseItems: [],
    orderValue: 0,
    status: AllegroParcelStatusEnums.UNKNOWN,
    statusTimestamp: new Date(),
    isInvoiceReceived: TriStateStatusEnum.Unknown,
    issueReturnToDate: new Date(),
  } as IPurchase;

  return!: IReturn;

  isFinished = TriStateStatusEnum.No; // ALL OK
}







// export const EXAMPLE_ROWS_XXX: IOrder[] = [
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
// ];

