import { Component, inject, signal } from '@angular/core';
import { Service } from '../../../../shared/models/service.model';
import { ServiceService } from '../../../../shared/services/service.service';
import { ServiceImagePipe } from '../../../../shared/pipes/service-image.pipe';

@Component({
  selector: 'app-services-list',
  imports: [ServiceImagePipe],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss'
})
export class ServicesListComponent {
  services = signal<Service[]>([]);
  private serviceService = inject(ServiceService);
  ngOnInit() {
    this.loadServices();
  }
  loadServices() 
  {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services.set(data);
        console.log(this.services());
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      },
      complete: () => console.log('Finished fetching services.'),
    });
  }
}
