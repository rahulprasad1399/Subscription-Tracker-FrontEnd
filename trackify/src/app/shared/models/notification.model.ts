export interface NotificationInter {
  id: number;
  userId: number;
  subscriptionId: number;
  serviceId : number,
  title: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  cost: number;
  purchaseDate: string;
  renewalDate: string;
  serviceName: string;
  categoryName: string;
}
