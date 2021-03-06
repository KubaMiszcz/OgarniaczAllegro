import { TriStateStatusEnum } from './constants/status.enum';
// import { IDateYMD } from './date-YMD.model';
import { IOrderItem as IPurchaseItem } from './purchase-item.model';

export interface IPurchase {
  isAllegroPay: TriStateStatusEnum; // allegro Pay
  purchaseItems: IPurchaseItem[];
  orderValue: number;
  purchaseDate: Date;

  status: string;
  statusTimestamp: Date;
  // hasInvoice?: TriStateStatusEnum; //na firme? xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  isInvoiceReceived: TriStateStatusEnum; // faktura OK ?

  issueReturnToDate?: Date;

}
