import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { SubscriptionsListComponent } from './subscriptions/subscriptions-list/subscriptions-list.component';
import { SubscriptionLayoutComponent } from './subscriptions/subscription-layout/subscription-layout.component';
import { NotificationLayoutComponent } from './notifications/notification-layout/notification-layout.component';
import { ServicesLayoutComponent } from './services/services-layout/services-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path : 'user-profile',
        component : UserProfileComponent
      },
      {
        path : 'chat-bot',
        component : ChatBotComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionLayoutComponent,
        loadChildren: () =>
          import('./subscriptions/subscription.route').then(
            (m) => m.subscriptionRoutes
          ),
      },
      {
        path: 'notifications',
        component: NotificationLayoutComponent,
        loadChildren: () =>
          import('./notifications/notification.route').then(
            (m) => m.notificationRoutes
          ),
      },
      {
        path: 'services',
        component: ServicesLayoutComponent,
        loadChildren: () =>
          import('./services/service.route').then((m) => m.serviceRoutes),
      },
      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
      },
      { path: 'dashboard', component: DashboardLayoutComponent },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
