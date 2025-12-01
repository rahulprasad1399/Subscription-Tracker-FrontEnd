import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { NotificationInter } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Notification`;

  getAllNotifications() : Observable<NotificationInter[]> {
    return this.http.get<NotificationInter[]>(this.apiUrl, { withCredentials: true });
  }

  updateNotification(payload: any) {
    return this.http.patch(this.apiUrl, payload, { withCredentials: true });
  }
}
