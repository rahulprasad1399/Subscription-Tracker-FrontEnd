import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { CreateService, Service } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private servicesService = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Service`;

  getServices() {
    return this.servicesService.get<Service[]>(this.apiUrl, {
      withCredentials: true,
    });
  }

  createService(payload: CreateService) {
    return this.servicesService.post(this.apiUrl, payload, {
      withCredentials: true,
    });
  }

  updateService(id: number, payload: CreateService) {
    return this.servicesService.put(`${this.apiUrl}/${id}`, payload, {
      withCredentials: true,
    });
  }

  deleteService(id: number) {
    return this.servicesService.delete(`${this.apiUrl}/${id}`);
  }
}
