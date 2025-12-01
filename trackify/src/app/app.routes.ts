import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/user/user.routes').then((m) => m.userRoutes),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
