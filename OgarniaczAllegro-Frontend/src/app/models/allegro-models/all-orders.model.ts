export interface IAllegroAllOrdersView {
  myorders: IMyorders;
  //====
  filter: string;
  limit: number;
  offset: number;
  sort: string;
  order: string;
  selectionMode: boolean;
  detailsUrl: string;
  timeToShowCancelPaymentButton: number;
  listingBanner: string;
  forceFallbackAjaxUpdateForEmptyDS: boolean;
  isRwd: boolean;
  language: string;
  slots: ISlots;
}

export interface ISeller {
  id: string;
  login: string;
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
  offerPrice: IOfferPrice;
  originalOfferPrice: IOriginalOfferPrice;
  showOriginalPrice: boolean;
}

export interface ICost {
  amount: string;
  currency: string;
}

export interface IAddress {
  street: string;
  code: string;
  city: string;
}

export interface IGeneralDelivery {
  id: string;
  name: string;
  description: string;
  address: IAddress;
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

export interface IWaybillsData {
}

export interface IDelivery {
  cost: ICost;
  name: string;
  methodId: string;
  id: string;
  generalDelivery: IGeneralDelivery;
  discount: IDiscount;
  status: string;
  timestamp: Date;
  paymentType: IPaymentType;
  waybillsData: IWaybillsData;
}

export interface ITotalCost {
  amount: string;
  currency: string;
}

export interface IAmount {
  amount: string;
  currency: string;
}

export interface IValue {
  amount: string;
  currency: string;
}

export interface IDiscount2 {
  value: IValue;
  label: string;
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
  discount: IDiscount2;
}

export interface IPrimary {
  status: string;
  action: string;
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

export interface ISecondary {
  status: string;
  action: string;
}

export interface IStatus {
  primary: IPrimary;
  traits: string[];
  actions: IAction[];
  secondary: ISecondary;
}

export interface IMyOrderAllAllegro {
  id: string;
  purchaseId: string;
  seller: ISeller;
  offers: IOffer[];
  delivery: IDelivery;
  totalCost: ITotalCost;
  payment: IPayment;
  createDate: Date;
  orderDate: Date;
  invoiceAddressId: string;
  serviceCountry: string;
  markedAsPaid: boolean;
  hiddenInMyOrders: boolean;
  boughtOnDevice: string;
  cancelled: boolean;
  status: IStatus;
  isFulfilment: boolean;
}

export interface IPrimary2 {
  status: string;
  action: string;
  hint: string;
}

export interface IDetail2 {
  type: string;
  value: string;
  action: string;
}

export interface IAction2 {
  type: string;
  enabled: boolean;
  details: IDetail2[];
}

export interface ISecondary2 {
  status: string;
  action: string;
}

export interface IStatus2 {
  primary: IPrimary2;
  traits: string[];
  actions: IAction2[];
  secondary: ISecondary2;
}

export interface IOrderGroup {
  groupId: string;
  myorders: IMyOrderAllAllegro[];
  status: IStatus2;
}

export interface IMyorders {
  orderGroups: IOrderGroup[];
  total: number;
  offset: number;
}

export interface ISlots {
}
