import { Routes } from "@angular/router";
import { SubscriptionsListComponent } from "./subscriptions-list/subscriptions-list.component";

export const subscriptionRoutes : Routes = [
    {
        path : '',component : SubscriptionsListComponent
    },
    {
        path:'',redirectTo:'',pathMatch:"full"
    }
]