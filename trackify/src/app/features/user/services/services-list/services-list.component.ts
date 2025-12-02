import { Component, inject, signal } from '@angular/core';
import {
  CreateServiceForm,
  Service,
} from '../../../../shared/models/service.model';
import { ServiceService } from '../../../../shared/services/service.service';
import { ServiceImagePipe } from '../../../../shared/pipes/service-image.pipe';
import { MatIcon } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-services-list',
  imports: [ServiceImagePipe, MatIcon, ReactiveFormsModule],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss',
})
export class ServicesListComponent {
  services = signal<Service[]>([]);
  isModalOpen = signal<boolean>(false);
  categoryService = inject(CategoryService);
  category = signal<Category[]>([]);

  isLoading = signal<boolean>(false);

  isdeleteModalOpen = signal<boolean>(false);

  isEdit = signal<boolean>(false);
  selectedService = signal<Service | null>(null);

  serviceToDelete = signal<Service | null>(null);

  private serviceService = inject(ServiceService);

  serviceForm = new FormGroup<CreateServiceForm>({
    serviceName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    categoryId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.isLoading.set(true);

    setTimeout(() => {
      this.serviceService.getServices().subscribe({
        next: (data) => {
          this.services.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Error fetching services:', error);
        },
        complete: () => console.log('Finished fetching services.'),
      });
    }, 500);
  }

  addSubscription() {
    this.isModalOpen.set(true);
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => this.category.set(res),
      error: (err) => console.log(err),
    });
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isEdit.set(false);
    this.selectedService.set(null);
    this.serviceForm.reset();
  }

  saveService() {
    if (this.isEdit() && this.selectedService()) {
      this.serviceService
        .updateService(
          this.selectedService()?.id!,
          this.serviceForm.getRawValue()
        )
        .subscribe({
          next: () => {
            this.loadServices();
            this.isModalOpen.set(false);
            this.isEdit.set(false);
            this.selectedService.set(null);
            this.serviceForm.reset();
          },
          error: (err) => console.log(err),
        });
    } else {
      this.serviceService
        .createService(this.serviceForm.getRawValue())
        .subscribe({
          next: () => {
            this.loadServices();
            this.closeModal();
            this.serviceForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onEdit(service: Service) {
    this.isEdit.set(true);
    this.isModalOpen.set(true);
    this.selectedService.set(service);

    this.getAllCategory();

    this.serviceForm.patchValue({
      serviceName: service.serviceName,
      categoryId: service.categoryId,
    });
  }

  onDelete(service: Service) {
    this.isdeleteModalOpen.set(true);
    this.serviceToDelete.set(service);
  }

  closeDeleteModal() {
    this.isdeleteModalOpen.set(false);
    this.serviceToDelete.set(null);
  }

  confirmDelete() {
    if (this.serviceToDelete()) {
      this.serviceService.deleteService(this.serviceToDelete()?.id!).subscribe({
        next: () => {
          this.loadServices();
          this.closeDeleteModal();
          this.serviceToDelete.set(null);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
