import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../environment';

let refreshing = false;

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !refreshing) {
        refreshing = true;
        return http
          .post(
            `${environment.apiUrl}/User/refresh-token`,
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap(() => {
              refreshing = false;
              return next(authReq);
            }),
            catchError((error) => {
              refreshing = false;
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
      }
      if (error.status === 401 && refreshing) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
