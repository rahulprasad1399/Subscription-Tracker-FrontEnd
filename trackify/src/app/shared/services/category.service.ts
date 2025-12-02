import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient)

  getAllCategory(){
    return this.http.get<Category[]>(`${environment.apiUrl}/Category`,{withCredentials : true})
  }
}
