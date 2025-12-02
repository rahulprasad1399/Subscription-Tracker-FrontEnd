import { Component, OnInit, inject, input, signal } from '@angular/core';
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

  notificationCount = signal<number>(0);

  markUsReadNotificationArr = signal<number[]>([]);

  selectedNotification = signal<NotificationInter | null>(null);

  openModal = signal<boolean>(false);

  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getAllNotification();
  }

  getAllNotification() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.notificationService.getAllNotifications().subscribe({
        next: (notificationList) => {
          this.notifications.set(notificationList);

          const unread = notificationList.filter((n) => !n.isRead);

          this.notificationCount.set(unread.length);

          this.markUsReadNotificationArr.set(unread.map((n) => n.id));
          this.isLoading.set(false);
        },
        error: (err) => this.isLoading.set(false),
      });
    }, 500);
  }

  onOpenModal() {
    this.openModal.set(true);
  }

  onCloseModal() {
    this.openModal.set(false);
  }

  onSelectNotification(notification: NotificationInter) {
    this.openModal.set(true);
    this.selectedNotification.set(notification);
    this.onUpdateNotification(notification.id);
  }

  onUpdateNotification(id: number) {
    this.notificationService.updateNotificationById(id).subscribe({
      next: (res) => {
        this.getAllNotification();
        this.notificationService.refreshUnreadCount();
      },
      error: (err) => console.log(err),
    });
  }

  onMarkAllAsRead() {
    console.log(this.markUsReadNotificationArr());
    this.notificationService
      .updateNotification(this.markUsReadNotificationArr())
      .subscribe({
        next: (res) => {
          this.getAllNotification();
          this.notificationService.refreshUnreadCount();
        },
        error: (err) => console.log(err),
      });
  }
}
