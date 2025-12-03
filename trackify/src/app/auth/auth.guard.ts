import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UsersignupService } from '../shared/services/userAuth.service';
import { AuthUser } from '../shared/models/service.model';
import { environment } from '../environment';

export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const authService = inject(UsersignupService);

  return http
    .get<AuthUser>(`${environment.apiUrl}/User/validate`, {
      withCredentials: true,
    })
    .pipe(
      map((res: AuthUser) => {
        authService.user.set({ fullName: res.fullName, email: res.email });
        return true;
      }),
      catchError(() => {
        router.navigate(['login']);
        return of(false);
      })
    );
};
