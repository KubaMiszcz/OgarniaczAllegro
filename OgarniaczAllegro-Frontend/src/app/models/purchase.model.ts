import { StatusEnum } from './constants/status.enum';
import { IDateYMD } from './date-YMD.model';
import { IOrderItem as IPurchaseItem } from './purchase-item';

export interface IPurchase {
  isAllegroPay: StatusEnum; // allegro Pay
  // hasInvoice?: StatusEnum; //na firme? xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // purchaseItems?: IPurchaseItem[];
  orderValue: number;
  // isInvoiceReceived?: StatusEnum; // faktura OK ?
  isPackageDelivered?: StatusEnum; // Przesyłka odebrana
  deliveredDate?: IDateYMD; // Data odebrania ->
  isPackageReceived?: StatusEnum; // Przesyłka odebrana
}
