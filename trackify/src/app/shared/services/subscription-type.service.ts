import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { SubscriptionType } from '../models/subscription-type.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypeService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/subscriptiontype`;

  getSubscriptionTypes() {
    return this.http.get<Array<SubscriptionType>>(this.apiUrl);
  }
}
