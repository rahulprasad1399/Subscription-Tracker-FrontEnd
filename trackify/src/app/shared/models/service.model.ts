import { FormControl } from '@angular/forms';

export interface Service {
  id: number;
  serviceName: string;
  categoryId: number;
  categoryName: string;
  createdByUserId : number
}

export interface RegisterForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterUser {
  email : string,
  password : string,
  fullName : string 
}

export interface RegisterResponse {
  id : number,
  message : string
}

export interface LoginUser {
  email : string,
  password : string 
}

export interface LoginResponse {
  email : string,
  fullName : string
}

export interface CreateService {
  serviceName : string,
  categoryId : number
}

export interface CreateServiceForm{
  serviceName : FormControl<string>,
  categoryId : FormControl<number>
}

export interface AuthUser {
  fullName: string;
  id: number;
  email: string;
}