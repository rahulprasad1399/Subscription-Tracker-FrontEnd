export interface Subscription {
  id: number;
  serviceId: number;
  serviceName: string;
  subscriptionTypeId: number;
  subscriptionTypeName: string;
  categoryId: number;
  categoryName: string;
  cost: number;
  billingFrequency: number;
  billingPeriodUnit: BillingPeriodUnit;
  purchaseDate: Date;
  renewalDate: Date;
  status: ActiveStatus;
}
export enum ActiveStatus {
  Active = 0,
  Cancelled = 1,
  Paused = 2,
}
export enum BillingPeriodUnit {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}
export interface AllSubscription {
  id: number;
  serviceId: number;
  serviceName: string;
  subscriptionTypeName: string;
  categoryName: string;
  cost: number;
  purchaseDate: Date;
  renewalDate: Date;
  status: ActiveStatus;
}
export interface GetAllSubscriptionsResponse{
    totalItem: number;
    activeItem: number;
    moneySpentMonthly: number;
    upcomingRenewal:number;
    subscriptions: AllSubscription[];
}