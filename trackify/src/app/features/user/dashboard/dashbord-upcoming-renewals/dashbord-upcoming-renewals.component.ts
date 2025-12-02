import { Component, Input } from '@angular/core';
import { UpcomingRenewalData } from '../models/dashbord-models';

@Component({
  selector: 'app-dashbord-upcoming-renewals',
  imports: [],
  templateUrl: './dashbord-upcoming-renewals.component.html',
  styleUrl: './dashbord-upcoming-renewals.component.scss'
})
export class DashbordUpcomingRenewalsComponent {
  @Input() upcomingRenewalData! : UpcomingRenewalData | null
}
