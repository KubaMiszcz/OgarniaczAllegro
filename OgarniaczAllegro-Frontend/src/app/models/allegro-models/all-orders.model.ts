export interface Seller {
  id: string;
  login: string;
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

export interface Address {
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
  address: Address;
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

export interface Carrier {
  id: string;
  name: string;
  url: string;
}

export interface Waybill {
  waybillId: string;
  carrier: Carrier;
}

export interface WaybillsData {
  waybills: Waybill[];
}

export interface Delivery {
  cost: Cost;
  name: string;
  methodId: string;
  id: string;
  generalDelivery: GeneralDelivery;
  discount: Discount;
  status: string;
  timestamp: Date;
  paymentType: PaymentType;
  waybillsData: WaybillsData;
}

export interface TotalCost {
  amount: string;
  currency: string;
}

export interface Amount {
  amount: string;
  currency: string;
}

export interface Value {
  amount: string;
  currency: string;
}

export interface Discount2 {
  value: Value;
  label: string;
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
  discount: Discount2;
}

export interface Primary {
  status: string;
  action: string;
  hint: string;
}

export interface Detail {
  type: string;
  value: string;
  action: string;
}

export interface Action {
  type: string;
  enabled: boolean;
  details: Detail[];
}

export interface Secondary {
  status: string;
  action: string;
}

export interface Status {
  primary: Primary;
  traits: string[];
  actions: Action[];
  secondary: Secondary;
}

export interface IMyOrderAllAllegroV2 {
  id: string;
  purchaseId: string;
  seller: Seller;
  offers: Offer[];
  delivery: Delivery;
  totalCost: TotalCost;
  payment: Payment;
  createDate: Date;
  orderDate: Date;
  invoiceAddressId: string;
  serviceCountry: string;
  markedAsPaid: boolean;
  hiddenInMyOrders: boolean;
  boughtOnDevice: string;
  cancelled: boolean;
  status: Status;
  isFulfilment: boolean;
}

export interface Primary2 {
  status: string;
  action: string;
  hint: string;
}

export interface Detail2 {
  type: string;
  value: string;
  action: string;
}

export interface Action2 {
  type: string;
  enabled: boolean;
  details: Detail2[];
}

export interface Secondary2 {
  status: string;
  action: string;
}

export interface Status2 {
  primary: Primary2;
  traits: string[];
  actions: Action2[];
  secondary: Secondary2;
}

export interface OrderGroup {
  groupId: string;
  myorders: IMyOrderAllAllegroV2[];
  status: Status2;
}

export interface Myorders {
  orderGroups: OrderGroup[];
  total: number;
  offset: number;
}

export interface Slots {
}

export interface IAllegroAllOrdersViewV2 {
  filter: string;
  limit: number;
  offset: number;
  sort: string;
  order: string;
  selectionMode: boolean;
  myorders: Myorders;
  detailsUrl: string;
  timeToShowCancelPaymentButton: number;
  listingBanner: string;
  forceFallbackAjaxUpdateForEmptyDS: boolean;
  isRwd: boolean;
  language: string;
  slots: Slots;
}
