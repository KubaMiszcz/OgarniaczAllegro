export interface Address {
  firstName: string;
  lastName: string;
  zipCode: string;
  city: string;
  country: string;
  street: string;
  phoneNumber: string;
  company: string;
  taxId: string;
  regon: string;
  email: string;
}

export interface Phone {
  number: string;
  numberLabel: string;
  numberLabelMasked: string;
}

export interface Email {
  address: string;
  addressMasked: string;
}

export interface OpeningHour {
  daysLabel: string;
  daysShortLabel: string;
  hoursLabels: string[];
}

export interface ContactDetails {
  phones: Phone[];
  emails: Email[];
  openingHours: OpeningHour[];
}

export interface Seller {
  id: string;
  login: string;
  address: Address;
  contactDetails: ContactDetails;
}

export interface UnitPrice {
  amount: string;
  currency: string;
}

export interface OriginalUnitPrice {
  amount: string;
  currency: string;
}

export interface OfferPrice {
  amount: string;
  currency: string;
}

export interface OriginalOfferPrice {
  amount: string;
  currency: string;
}

export interface Offer {
  id: string;
  title: string;
  friendlyUrl: string;
  unitPrice: UnitPrice;
  originalUnitPrice: OriginalUnitPrice;
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
  offerPrice: OfferPrice;
  originalOfferPrice: OriginalOfferPrice;
  showOriginalPrice: boolean;
}

export interface Cost {
  amount: string;
  currency: string;
}

export interface Address2 {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  countryCode: string;
  zipCode: string;
  phoneNumber: string;
}

export interface Address3 {
  street: string;
  code: string;
  city: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface GeneralDelivery {
  id: string;
  name: string;
  description: string;
  address: Address3;
  coordinates: Coordinates;
}

export interface OriginalCost {
  amount: string;
  currency: string;
}

export interface Discount {
  originalCost: OriginalCost;
  type: string;
  planType: string;
}

export interface PaymentType {
  name: string;
  type: string;
}

export interface Delivery {
  cost: Cost;
  name: string;
  methodId: string;
  id: string;
  address: Address2;
  generalDelivery: GeneralDelivery;
  discount: Discount;
  status: string;
  timestamp: Date;
  paymentType: PaymentType;
}

export interface TotalCost {
  amount: string;
  currency: string;
}

export interface TotalCost2 {
  amount: string;
  currency: string;
}

export interface Summary {
  totalCost: TotalCost2;
  exchangeRateDate: Date;
  showExchangeRateInformation: boolean;
}

export interface Amount {
  amount: string;
  currency: string;
}

export interface Payment {
  id: string;
  provider: string;
  amount: Amount;
  method: string;
  methodId: string;
  status: string;
  date: Date;
  isInstallments: boolean;
  isMultipleSellers: boolean;
  cardMask: string;
}

export interface Primary {
  status: string;
  hint: string;
}

export interface Detail {
  type: string;
  value: string;
}

export interface Action {
  type: string;
  enabled: boolean;
  details: Detail[];
}

export interface Status {
  primary: Primary;
  traits: string[];
  actions: Action[];
}

export interface Coins {
  total: number;
}

export interface InvoiceAddress {
  id: string;
  zipCode: string;
  city: string;
  countryCode: string;
  street: string;
  company: string;
  taxId: string;
}

export interface Detail2 {
  type: string;
  value: string;
}

export interface Step {
  type: string;
  hint: string;
  active: boolean;
  error: boolean;
}

export interface Address4 {
  city: string;
  code: string;
  street: string;
}

export interface Point {
  id: string;
  name: string;
  description: string;
  address: Address4;
}

export interface Pickup {
  point: Point;
}

export interface Carrier {
  id: string;
  name: string;
  url: string;
}

export interface Alert {
}

export interface Timeline {
  status: string;
  waybillId: string;
  details: Detail2[];
  steps: Step[];
  pickup: Pickup;
  carrier: Carrier;
  detailedHistoryAvailable: boolean;
  alert: Alert;
}

export interface Step2 {
  type: string;
  active: boolean;
  label: string;
  hint: string;
}

export interface TimelineStatus {
  status: string;
  label: string;
  hint: string;
  steps: Step2[];
}

export interface Tracking {
  carrier: string;
  detailedHistoryAvailable: boolean;
  link: string;
  number: string;
}

export interface Address5 {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Receiver {
  fullName: string;
  address: Address5;
}

export interface ReturnParcel {
  returnParcelId: string;
  authorType: string;
  deliveryMethodType: string;
  returnCode: string;
  tracking: Tracking;
  expiresAt: Date;
  receiver: Receiver;
  costCoveredBySeller: boolean;
}

export interface Product {
  name: string;
  image: string;
}

export interface Price {
  amount: string;
  currency: string;
}

export interface Reason {
  type: string;
  comment: string;
}

export interface RescissionOffer {
  product: Product;
  quantity: number;
  price: Price;
  reason: Reason;
  offerSnapshotHash: string;
}

export interface Rescission {
  rescissionId: string;
  status: string;
  shipmentExpirationDate: Date;
  sellerLogin: string;
  requestDate: Date;
  referenceNumber: string;
  timelineStatus: TimelineStatus;
  returnParcels: ReturnParcel[];
  rescissionOffers: RescissionOffer[];
}

export interface Rescissions {
  rescissions: Rescission[];
  retails: boolean;
}

export interface RootObject {
  id: string;
  purchaseId: string;
  seller: Seller;
  offers: Offer[];
  delivery: Delivery;
  totalCost: TotalCost;
  summary: Summary;
  payment: Payment;
  createDate: Date;
  orderDate: Date;
  serviceCountry: string;
  hiddenInMyOrders: boolean;
  boughtOnDevice: string;
  cancelled: boolean;
  status: Status;
  coins: Coins;
  invoiceAddress: InvoiceAddress;
  timelines: Timeline[];
  isFulfilment: boolean;
  groupId: string;
  rescissions: Rescissions;
}

