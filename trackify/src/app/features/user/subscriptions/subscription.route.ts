import { Routes } from "@angular/router";
import { SubscriptionLayoutComponent } from "./subscription-layout/subscription-layout.component";
import { SubscriptionsListComponent } from "./subscriptions-list/subscriptions-list.component";

export const subscriptionRoutes : Routes = [
    {
        path : '',component : SubscriptionsListComponent
    },
    {
        path:'',redirectTo:'',pathMatch:"full"
    }
]