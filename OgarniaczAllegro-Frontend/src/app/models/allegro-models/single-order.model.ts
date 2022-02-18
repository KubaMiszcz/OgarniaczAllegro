
export interface IAddress {
  firstName: string;
  lastName: string;
  zipCode: string;
  city: string;
  country: string;
  street: string;
  phoneNumber: string;
  company: string;
  taxId: string;
  email: string;
}

export interface IPhone {
  number: string;
  numberLabel: string;
  numberLabelMasked: string;
}

export interface IEmail {
  address: string;
  addressMasked: string;
}

export interface IOpeningHour {
  daysLabel: string;
  daysShortLabel: string;
  hoursLabels: string[];
}

export interface IContactDetails {
  phones: IPhone[];
  emails: IEmail[];
  openingHours: IOpeningHour[];
}

export interface ISeller {
  id: string;
  login: string;
  address: IAddress;
  contactDetails: IContactDetails;
}

export interface IUnitPrice {
  amount: string;
  currency: string;
}

export interface IOriginalUnitPrice {
  amount: string;
  currency: string;
}

export interface IOfferPrice {
  amount: string;
  currency: string;
}

export interface IOriginalOfferPrice {
  amount: string;
  currency: string;
}

export interface IOffer {
  id: string;
  title: string;
  friendlyUrl: string;
  unitPrice: IUnitPrice;
  originalUnitPrice: IOriginalUnitPrice;
  quantity: number;
  type: string;
  imageUrl: string;
  productId: string;
  orderDate: Date;
  gold: boolean;
  pharmacy: boolean;
  auction: boolean;
  toRate: boolean;
  orderOfferId: string;
  showOriginalPrice: boolean;
  offerPrice: IOfferPrice;
  originalOfferPrice: IOriginalOfferPrice;
}

export interface ICost {
  amount: string;
  currency: string;
}

export interface IAddress2 {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  countryCode: string;
  zipCode: string;
  phoneNumber: string;
}

export interface IAddress3 {
  street: string;
  code: string;
  city: string;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface IGeneralDelivery {
  id: string;
  name: string;
  description: string;
  address: IAddress3;
  coordinates: ICoordinates;
}

export interface IOriginalCost {
  amount: string;
  currency: string;
}

export interface IDiscount {
  originalCost: IOriginalCost;
  type: string;
  planType: string;
}

export interface IPaymentType {
  name: string;
  type: string;
}

export interface IDelivery {
  cost: ICost;
  name: string;
  methodId: string;
  id: string;
  address: IAddress2;
  generalDelivery: IGeneralDelivery;
  discount: IDiscount;
  status: string;
  timestamp: Date;
  paymentType: IPaymentType;
}

export interface ITotalCost {
  amount: string;
  currency: string;
}

export interface ITotalCost2 {
  amount: string;
  currency: string;
}

export interface ISummary {
  totalCost: ITotalCost2;
  exchangeRateDate: Date;
  showExchangeRateInformation: boolean;
}

export interface IAmount {
  amount: string;
  currency: string;
}

export interface IPayment {
  id: string;
  provider: string;
  amount: IAmount;
  method: string;
  methodId: string;
  status: string;
  date: Date;
  isInstallments: boolean;
  isMultipleSellers: boolean;
  cardMask: string;
}

export interface IPrimary {
  status: string;
  hint: string;
}

export interface IDetail {
  type: string;
  value: string;
  action: string;
}

export interface IAction {
  type: string;
  enabled: boolean;
  details: IDetail[];
}

export interface IStatus {
  primary: IPrimary;
  traits: string[];
  actions: IAction[];
}

export interface ICoins {
  total: number;
}

export interface IDetail2 {
  type: string;
  value: string;
}

export interface IStep {
  type: string;
  hint: string;
  active: boolean;
  error: boolean;
}

export interface IAddress4 {
  city: string;
  code: string;
  street: string;
}

export interface IPoint {
  id: string;
  name: string;
  description: string;
  address: IAddress4;
}

export interface IPickup {
  point: IPoint;
}

export interface ICarrier {
  id: string;
  name: string;
  url: string;
}

export interface IAlert {
}

export interface ITimeline {
  status: string;
  waybillId: string;
  details: IDetail2[];
  steps: IStep[];
  pickup: IPickup;
  carrier: ICarrier;
  detailedHistoryAvailable: boolean;
  alert: IAlert;
}

export interface IStep2 {
  type: string;
  active: boolean;
  label: string;
  hint: string;
}

export interface ITimelineStatus {
  status: string;
  label: string;
  hint: string;
  steps: IStep2[];
}

export interface ITracking {
  carrier: string;
  detailedHistoryAvailable: boolean;
  link: string;
  number: string;
}

export interface IAddress5 {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface IReceiver {
  fullName: string;
  address: IAddress5;
}

export interface IReturnParcel {
  returnParcelId: string;
  authorType: string;
  deliveryMethodType: string;
  returnCode: string;
  tracking: ITracking;
  expiresAt: Date;
  receiver: IReceiver;
  costCoveredBySeller: boolean;
}

export interface IProduct {
  name: string;
  image: string;
}

export interface IPrice {
  amount: string;
  currency: string;
}

export interface IReason {
  type: string;
  comment: string;
}

export interface IRescissionOffer {
  product: IProduct;
  quantity: number;
  price: IPrice;
  reason: IReason;
  offerSnapshotHash: string;
}

export interface IRescission {
  rescissionId: string;
  status: string;
  shipmentExpirationDate: Date;
  sellerLogin: string;
  requestDate: Date;
  referenceNumber: string;
  timelineStatus: ITimelineStatus;
  returnParcels: IReturnParcel[];
  rescissionOffers: IRescissionOffer[];
}

export interface IRescissions {
  rescissions: IRescission[];
  retails: boolean;
}

export interface ISingleOrderAllegro {
  id: string;
  purchaseId: string;
  seller: ISeller;
  offers: IOffer[];
  delivery: IDelivery;
  totalCost: ITotalCost;
  summary: ISummary;
  payment: IPayment;
  createDate: Date;
  orderDate: Date;
  serviceCountry: string;
  hiddenInMyOrders: boolean;
  boughtOnDevice: string;
  cancelled: boolean;
  status: IStatus;
  coins: ICoins;
  timelines: ITimeline[];
  isFulfilment: boolean;
  groupId: string;
  rescissions: IRescissions;
}

export interface IPrimary2 {
  status: string;
  hint: string;
}

export interface IDetail3 {
  type: string;
  value: string;
  action: string;
}

export interface IAction2 {
  type: string;
  enabled: boolean;
  details: IDetail3[];
}

export interface IStatus2 {
  primary: IPrimary2;
  traits: string[];
  actions: IAction2[];
}

export interface ITotalCost3 {
  amount: string;
  currency: string;
}

export interface ITotalCostBeforeExchange {
  amount: string;
  currency: string;
}

export interface ISummary2 {
  totalCost: ITotalCost3;
  totalCostBeforeExchange: ITotalCostBeforeExchange;
  exchangeRateDate: Date;
  showExchangeRateInformation: boolean;
}

export interface ISingleOrderGroup {
  groupId: string;
  myorders: ISingleOrderAllegro[];
  status: IStatus2;
  summary: ISummary2;
}

export interface ISingleOrderGroupMeta {
}

export interface IAllegroSingleOrder {
  myorderGroup: ISingleOrderGroup;
  // myorderGroup.$meta: SingleorderGroupMeta;
}

