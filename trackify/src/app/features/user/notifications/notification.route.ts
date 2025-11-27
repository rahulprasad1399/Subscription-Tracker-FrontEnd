import { Routes } from "@angular/router";
import { NotificationsListComponent } from "./notifications-list/notifications-list.component";


export const notificationRoutes : Routes = [
    {
        path : '',component : NotificationsListComponent
    },
    {
        path:'',redirectTo:'',pathMatch:"full"
    }
]