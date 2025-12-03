import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import {
  LoginResponse,
  LoginUser,
  OtpData,
  RegisterResponse,
  RegisterUser,
  UpdateUser,
  UserData,
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

  sendOtp(userData : UserData):Observable<Object>{
    return this.http.post(`${this.apiUrl}/send-otp`,userData,{
      withCredentials : true
    })
  }
  verify(otpData : OtpData):Observable<Object>{
    return this.http.post(`${this.apiUrl}/verify-otp`,otpData,{
      withCredentials : true
    })
  }

  updateUser(userData : UpdateUser){
    return this.http.put(`${this.apiUrl}`,userData,{withCredentials : true})
  }

  getUserById(){
    return this.http.get<UpdateUser>(`${this.apiUrl}/profile`,{withCredentials : true})
  }
}
