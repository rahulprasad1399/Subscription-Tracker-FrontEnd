import { Component, Input } from '@angular/core';
import { NotificationData } from '../models/dashbord-models';

@Component({
  selector: 'app-dashbord-notification',
  imports: [],
  templateUrl: './dashbord-notification.component.html',
  styleUrl: './dashbord-notification.component.scss',
})
export class DashbordNotificationComponent {
  @Input() notficationData!: NotificationData | null;
}
