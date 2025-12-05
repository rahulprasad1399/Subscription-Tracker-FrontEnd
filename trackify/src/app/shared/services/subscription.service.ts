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

  getSubscriptions(searchQuery? : string): Observable<GetAllSubscriptionsResponse> {
    return this.http.get<GetAllSubscriptionsResponse>(`${this.apiUrl}?searchQuery=${searchQuery || ''}`, );
  }
  getSubscriptionById(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/${id}`,{
      withCredentials: true,
    });
  }
  createSubscription(subscription: any): Observable<number> {
    return this.http.post<number>(this.apiUrl, subscription,{
      withCredentials: true,
    });
  }
  updateSubscription(id: number, subscription: any): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, subscription,{
      withCredentials: true,
    });
  }
  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{
      withCredentials: true,
    });
  }
}
