import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable} from 'rxjs';
import { GetAllSubscriptionsResponse, Subscription } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/subscription`;

  getSubscriptions(): Observable<GetAllSubscriptionsResponse> {
    return this.http.get<GetAllSubscriptionsResponse>(this.apiUrl, {withCredentials : true});
  }
  getSubscriptionById(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/${id}`);
  }
  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription);
  }
  updateSubscription(id: number, subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/${id}`, subscription);
  }
  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
