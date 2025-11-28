import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private servicesService = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/service`;

  getServices() { 
    return this.servicesService.get<Service[]>(this.apiUrl);
  }
}
