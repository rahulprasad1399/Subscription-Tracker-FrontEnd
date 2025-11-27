import { Component } from '@angular/core';
import { DashbordSummaryCardsComponent } from '../dashbord-summary-cards/dashbord-summary-cards.component';
import { DashbordNotificationComponent } from '../dashbord-notification/dashbord-notification.component';
import { DashbordSpendingInsightsComponent } from '../dashbord-spending-insights/dashbord-spending-insights.component';
import { DashbordUpcomingRenewalsComponent } from '../dashbord-upcoming-renewals/dashbord-upcoming-renewals.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [DashbordSummaryCardsComponent,DashbordNotificationComponent,DashbordSpendingInsightsComponent,DashbordUpcomingRenewalsComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
