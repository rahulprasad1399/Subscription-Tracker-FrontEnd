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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-services-list',
  imports: [ServiceImagePipe, MatIcon, ReactiveFormsModule],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss',
})
export class ServicesListComponent {
  services = signal<Service[]>([]);
  isModalOpen = signal<boolean>(false);
  category = signal<Category[]>([]);
  isLoading = signal<boolean>(false);
  isdeleteModalOpen = signal<boolean>(false);
  isEdit = signal<boolean>(false);
  selectedService = signal<Service | null>(null);
  serviceToDelete = signal<Service | null>(null);

  serviceForm = new FormGroup<CreateServiceForm>({
    serviceName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    categoryId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  private serviceService = inject(ServiceService);
  private categoryService = inject(CategoryService);
  private snack = inject(MatSnackBar);

  ngOnInit() {
    this.isLoading.set(true);
    this.loadServices();
  }

  addSubscription() {
    this.isModalOpen.set(true);
    this.getAllCategory();
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isEdit.set(false);
    this.selectedService.set(null);
    this.serviceForm.reset();
  }

  saveService() {
    if (!this.serviceForm.valid) {
      console.log('I work here');
      return;
    }
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
            this.snack.open('Service Updated successfully', 'Ok', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
          },
          error: (err) => {
            this.snack.open(
              err?.error?.errors[0]?.message || 'Something went wrong',
              'Close',
              {
                duration: 3000,
                panelClass: ['error-snackbar'],
              }
            );
            this.isModalOpen.set(false);
          },
        });
    } else {
      this.serviceService
        .createService(this.serviceForm.getRawValue())
        .subscribe({
          next: () => {
            this.snack.open('Service Created successfully', 'Ok', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.loadServices();
            this.closeModal();
            this.serviceForm.reset();
          },
          error: (err) => {
            this.snack.open(
              err?.error?.errors[0]?.message || 'Something went wrong',
              'Close',
              {
                duration: 3000,
                panelClass: ['error-snackbar'],
              }
            );
            this.isModalOpen.set(false);
          },
        });
    }
  }


  // Dropdown Signals
searchCategoryQuery = signal<string>('');
isCategoryDropdownOpen = signal<boolean>(false);

// Filtered Category List
filteredCategory = () => {
  const query = this.searchCategoryQuery().toLowerCase();
  return this.category().filter(cat =>
    cat.categoryName.toLowerCase().includes(query)
  );
};

// Select Category
selectCategory(cat: Category) {
  this.serviceForm.controls.categoryId.setValue(cat.id);
  this.searchCategoryQuery.set(cat.categoryName);
  this.isCategoryDropdownOpen.set(false);
}

// Close dropdown on blur
toggleCategoryDropdown(value: boolean) {
  setTimeout(() => this.isCategoryDropdownOpen.set(value), 200);
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
          this.snack.open('Service Deleted successfully', 'Ok', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('Something went wrong', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  private loadServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services.set(data);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 500);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error fetching services:', error);
      },
      complete: () => console.log('Finished fetching services.'),
    });
  }

  private getAllCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => this.category.set(res),
      error: (err) => console.log(err),
    });
  }
}
