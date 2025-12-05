import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { authGuard } from './auth/auth.guard';
import { AboutUsComponent } from './features/about-us/about-us.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutUsComponent },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/user/user.routes').then((m) => m.userRoutes),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
