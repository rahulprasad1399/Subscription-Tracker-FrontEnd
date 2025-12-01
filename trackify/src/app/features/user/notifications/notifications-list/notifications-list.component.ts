import { Component, OnInit, inject, signal } from '@angular/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ServiceImagePipe } from '../../../../shared/pipes/service-image.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NotificationInter } from '../../../../shared/models/notification.model';

@Component({
  selector: 'app-notifications-list',
  imports: [ServiceImagePipe, CurrencyPipe, DatePipe],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.scss',
})
export class NotificationsListComponent implements OnInit {
  notificationService = inject(NotificationService);
  notifications = signal<Array<NotificationInter>>([]);

  selectedNotification = signal<NotificationInter | null>(null)

  openModal = signal<boolean>(false);

  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (notification) => {
        console.log(notification);
        this.notifications.set(notification);
      },
      error: (err) => console.log(err),
    });
  }

  onOpenModal() {
    this.openModal.set(true);
  }

  onCloseModal() {
    this.openModal.set(false);
  }

  onSelectNotification(notification : NotificationInter){
    this.openModal.set(true)
    this.selectedNotification.set(notification)
  }

}
