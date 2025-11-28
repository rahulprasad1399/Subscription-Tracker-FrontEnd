import { Component, inject, signal } from '@angular/core';
import {
  GetAllSubscriptionsResponse,
  Subscription,
} from '../../../../shared/models/subscription.model';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-subscriptions-list',
  imports: [],
  templateUrl: './subscriptions-list.component.html',
  styleUrl: './subscriptions-list.component.scss',
})
export class SubscriptionsListComponent {
  subscriptions = signal<GetAllSubscriptionsResponse>({
    totalItems: 0,
    activeItems: 0,
    monthlyCost: 0,
    subscriptions: [],
  });

  private subscriptionService = inject(SubscriptionService);

  ngOnInit() {
    this.loadSubscriptions();
  }
  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions.set(data);
        console.log(this.subscriptions());
      },
      error: (error) => {
        console.error('Error fetching subscriptions:', error);
      },
      complete: () => console.log('Finished fetching subscriptions.'),
    });
  }
}
