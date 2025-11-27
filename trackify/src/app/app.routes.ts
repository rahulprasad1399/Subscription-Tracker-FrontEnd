import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () =>
      import('./features/user/user.routes').then((m) => m.userRoutes),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
