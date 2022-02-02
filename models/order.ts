import { IPurchase } from "./purchase";

export interface IOrder {
  // seller:string;  // sprzedajacy
  order: string; //zamowienie
  isAllegroPay: string;// allegro Pay	
  isBusinessOrder: string; //na firme?
  orderTotalAmount: string;// suma kupionych

  isInvoiceReceived: string;// faktura OK ?
  isPackageReceived: string; // Przesyłka odebrana
  receivedDate?: string;// Data odebrania -> 

  isReturnIssued: string; //Zwrot zgłoszony

  returnToDate: string;// odeslij do
  returnCode: string;// kod zwrotu
  returnTotalAmount: string; // kwota do zwrotu

  isReturnSended: string;// Zwrot wysłany
  isReturnDelivered: string;// Zwrot u sprzedającego
  isCashReturned: string;// zwrot na koncie
  isInvoiceCorrectionReceived: string;// korekta OK ?

  isFinished: string; // ALL OK
  note: string; // notatka
}

