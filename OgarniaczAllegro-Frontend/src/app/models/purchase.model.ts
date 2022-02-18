import { StatusEnum } from './constants/status.enum';
import { IDateYMD } from './date-YMD.model';
import { IOrderItem as IPurchaseItem } from './purchase-item.model';

export interface IPurchase {
  isAllegroPay: StatusEnum; // allegro Pay
  hasInvoice?: StatusEnum; //na firme? xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  orderValue: number;
  deliveredDate?: IDateYMD; // Data odebrania ->
  isInvoiceReceived?: StatusEnum; // faktura OK ?





  // purchaseItems?: IPurchaseItem[];
  // isPackageDelivered?: StatusEnum; // Przesyłka odebrana
  // isPackageReceived?: StatusEnum; // Przesyłka odebrana
}
