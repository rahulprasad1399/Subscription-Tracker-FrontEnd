
export interface DashbordModels {
  insightsData: InsightsData;
  summaryCardData: SummaryCardData;
  notficationData: NotificationData;
  upcomingRenewalData: UpcomingRenewalData;
}

export interface UpcomingRenewalData {
    upcomingRenewals : Array<UpcomingRenewal>
}   

export interface UpcomingRenewal {
    id:number
    serviceId:number
    serviceName:string
    renewalIn:number
}

export interface NotificationData {
  notifications: Array<NotificationDetails>;
}

export interface NotificationDetails {
  id: number;
  title: string;
  type: string;
  isRead: boolean;
}

export interface MonthlySpends {
  monthlySpends: Array<number>;
}

export interface ActivityStatus {
  active: number;
  cancelled: number;
  paused: number;
}
export interface CategoriesSummary {
  categoriesSummaryData: Array<CategoryWithSpend>;
}

export interface CategoryWithSpend {
  categoryName: string;
  cost: number;
}

export interface InsightsData {
  monthlySpends: MonthlySpends;
  activeStatus: ActivityStatus;
  categoriesSummary: CategoriesSummary;
}

export interface SummaryCardData {
  monthlySpend: number;
  yearlySpend: number;
  activeNow: number;
  averageCostPerSub: number;
}
