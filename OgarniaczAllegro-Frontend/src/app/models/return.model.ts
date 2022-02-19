export interface IReturn {
  // isIssued?: StatusEnum; //Zwrot zgłoszony
  returnCodeExpirationDate: Date; // odeslij do
  returnCode: string; // kod zwrotu
  returnValue: number; // kwota do zwrotu
  status: string; //km swittch to enum
  statusHint: string;
  // isSended?: StatusEnum; // Zwrot wysłany
  // isDelivered?: StatusEnum; // Zwrot u sprzedającego
  // isCashReturned?: StatusEnum; // zwrot na koncie
  // isInvoiceCorrectionReceived?: StatusEnum; // korekta OK ?
}
