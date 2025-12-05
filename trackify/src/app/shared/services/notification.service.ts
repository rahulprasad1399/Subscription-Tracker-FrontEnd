import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import {
  NotificationCount,
  NotificationInter,
} from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Notification`;

  notificationCount = signal<number>(0);
  notifications = signal<Array<NotificationInter>>([]);


  getAllNotifications(): Observable<NotificationInter[]> {
    return this.http.get<NotificationInter[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  updateNotification(notificationIds: any) {
    return this.http.patch(
      `${this.apiUrl}/all-notification`,
      { notificationIds },
      { withCredentials: true }
    );
  }

  getUnreadNotificationCount(): Observable<NotificationCount> {
    return this.http.get<NotificationCount>(
      `${this.apiUrl}/unread-notification-count`,
      {
        withCredentials: true,
      }
    );
  }

  updateNotificationById(id: number) {
    return this.http.patch(
      `${this.apiUrl}/update-notification/${id}`,
      {},
      { withCredentials: true }
    );
  }

  refreshUnreadCount() {
    this.getUnreadNotificationCount().subscribe({
      next: (res) => this.notificationCount.set(res.count),
      error: (err) => console.log(err),
    });
  }
}
