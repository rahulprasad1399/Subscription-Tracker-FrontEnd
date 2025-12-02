import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import {
  LoginResponse,
  LoginUser,
  RegisterResponse,
  RegisterUser,
} from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class UsersignupService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/User`;

  user = signal<LoginResponse | null>(null)

  registerUser(userRegister: RegisterUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/register`,
      userRegister
    );
  }

  loginUser(userLogin: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userLogin, {
      withCredentials: true,
    });
  }

  logOut(){
    return this.http.post(`${this.apiUrl}/logout`,{},{withCredentials : true});
  }
}
