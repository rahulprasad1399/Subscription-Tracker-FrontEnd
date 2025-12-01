import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Notification`;

  getAllNotifications() {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  updateNotification(payload: any) {
    return this.http.patch(this.apiUrl, payload, { withCredentials: true });
  }
}
