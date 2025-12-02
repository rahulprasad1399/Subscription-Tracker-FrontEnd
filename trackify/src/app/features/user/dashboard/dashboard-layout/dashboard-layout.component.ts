import { Component, inject, signal } from '@angular/core';
import { DashbordSummaryCardsComponent } from '../dashbord-summary-cards/dashbord-summary-cards.component';
import { DashbordNotificationComponent } from '../dashbord-notification/dashbord-notification.component';
import { DashbordSpendingInsightsComponent } from '../dashbord-spending-insights/dashbord-spending-insights.component';
import { DashbordUpcomingRenewalsComponent } from '../dashbord-upcoming-renewals/dashbord-upcoming-renewals.component';
import {
  DashbordModels,
  InsightsData,
  NotificationData,
  SummaryCardData,
  UpcomingRenewalData,
} from '../models/dashbord-models';
import { DashboardService } from '../../../../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    DashbordSummaryCardsComponent,
    DashbordNotificationComponent,
    DashbordSpendingInsightsComponent,
    DashbordUpcomingRenewalsComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  dashboradData = signal<DashbordModels | null>(null);
  summaryCardData = signal<SummaryCardData | null>(null);
  insightsData = signal<InsightsData | null>(null);
  notficationData = signal<NotificationData | null>(null);
  upcomingRenewalData = signal<UpcomingRenewalData | null>(null);

  private darshboardService = inject(DashboardService);

  ngOnInit() {
    this.loadDashboardData();
  }
  loadDashboardData() {
    this.darshboardService.getDashBoradData().subscribe({
      next: (data) => {
        this.dashboradData.set(data);

        if (data.summaryCardData) {
          this.summaryCardData.set(data.summaryCardData);
        }

        if (data.insightsData) {
          this.insightsData.set(data.insightsData);
        }
        if (data.notficationData) {
          this.notficationData.set(data.notficationData);
        }
        if (data.upcomingRenewalData) {
          this.upcomingRenewalData.set(data.upcomingRenewalData);
        }
console.log(this.summaryCardData());
console.log(this.insightsData());
console.log(this.upcomingRenewalData());
      },
      error: (err) => {
        console.log('Erro fetching data ', err);
      },
      complete: () => {
        console.log('Api fetching completed');
      },
    });
  }
}
