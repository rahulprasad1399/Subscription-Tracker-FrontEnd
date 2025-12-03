import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import {
  ActiveStatus,
  AllSubscription,
  BillingPeriodUnit,
  GetAllSubscriptionsResponse,
  Subscription,
} from '../../../../shared/models/subscription.model';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ServiceImagePipe } from '../../../../shared/pipes/service-image.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Service } from '../../../../shared/models/service.model';
import { ServiceService } from '../../../../shared/services/service.service';
import { SubscriptionType } from '../../../../shared/models/subscription-type.model';
import { SubscriptionTypeService } from '../../../../shared/services/subscription-type.service';
import { debounceTime, forkJoin, merge, Subject } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subscriptions-list',
  standalone: true,
  imports: [
    ServiceImagePipe,
    DatePipe,
    MatIconModule,
    CurrencyPipe,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './subscriptions-list.component.html',
  styleUrl: './subscriptions-list.component.scss',
})
export class SubscriptionsListComponent {
  private destroyRef = inject(DestroyRef);

  private subscriptionService = inject(SubscriptionService);
  private serviceService = inject(ServiceService);
  private subscriptionTypeService = inject(SubscriptionTypeService);
  private router = inject(Router);
  private searchSubject = new Subject<string>();
  snack = inject(MatSnackBar);

  isLoading = signal<boolean>(false);

  subscriptions = signal<GetAllSubscriptionsResponse>({
    totalItem: 0,
    activeItem: 0,
    moneySpentMonthly: 0,
    upcomingRenewal: 0,
    subscriptions: [],
  });

  BillingPeriodUnit = BillingPeriodUnit;
  billingPeriodUnits = Object.values(BillingPeriodUnit);
  ActiveStatus = ActiveStatus;

  statusOptions = [
    { label: 'Active', value: ActiveStatus.Active },
    { label: 'Cancelled', value: ActiveStatus.Cancelled },
    { label: 'Paused', value: ActiveStatus.Paused },
  ];

  isModalOpen = signal(false);
  isDropdownOpen = signal(false);
  isSubscriptionTypeDropdownOpen = signal(false);
  isDeleteModalOpen = signal(false);
  showDetailsModal = signal(false);
  editSubscriptionModal = signal(false);

  searchText: string = '';

  searchQuery = signal('');
  searchSubscriptionTypeQuery = signal('');

  services = signal<Array<Service>>([]);
  subscriptionTypes = signal<Array<SubscriptionType>>([]);

  subscriptionToDelete = signal<AllSubscription | null>(null);

  constructor() {
    this.searchSubject.pipe(debounceTime(400)).subscribe((value) => {
      this.loadSubscriptions(value);
    });
  }

  addSubscriptionForm = new FormGroup({
    serviceId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    subscriptionTypeId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    cost: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    billingFrequency: new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]),
    billingPeriodUnit: new FormControl(BillingPeriodUnit.Month, [
      Validators.required,
    ]),
    purchaseDate: new FormControl<string>('', [Validators.required]),
    renewalDate: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    status: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    this.isLoading.set(true);

    this.loadSubscriptions();
    this.setupAutoCalculation();
  }

  setupAutoCalculation() {
    merge(
      this.addSubscriptionForm.get('purchaseDate')!.valueChanges,
      this.addSubscriptionForm.get('billingFrequency')!.valueChanges,
      this.addSubscriptionForm.get('billingPeriodUnit')!.valueChanges
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.calculateRenewalDate();
      });
  }

  calculateRenewalDate() {
    const purchaseDateStr = this.addSubscriptionForm.get('purchaseDate')?.value;
    const frequency = this.addSubscriptionForm.get('billingFrequency')?.value;
    const periodUnit = this.addSubscriptionForm.get('billingPeriodUnit')?.value;

    if (purchaseDateStr && frequency && periodUnit) {
      const parts = purchaseDateStr.split('-');
      console.log(parts);
      const date = new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        parseInt(parts[2])
      );
      console.log(date);

      switch (periodUnit) {
        case BillingPeriodUnit.Day:
          date.setDate(date.getDate() + frequency);
          console.log(date);
          break;
        case BillingPeriodUnit.Week:
          date.setDate(date.getDate() + frequency * 7);
          console.log(date);
          break;
        case BillingPeriodUnit.Month:
          date.setMonth(date.getMonth() + frequency);
          console.log(date);
          break;
        case BillingPeriodUnit.Year:
          date.setFullYear(date.getFullYear() + frequency);
          console.log(date);
          break;
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);
      this.addSubscriptionForm.patchValue({ renewalDate: formattedDate });
    }
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  addSubscription() {
    this.openModal();
  }

  loadDropdownData() {
    forkJoin({
      services: this.serviceService.getServices(),
      subscriptionTypes: this.subscriptionTypeService.getSubscriptionTypes(),
    }).subscribe(({ services, subscriptionTypes }) => {
      this.services.set(services);
      this.subscriptionTypes.set(subscriptionTypes);
    });
  }

  openModal() {
    this.addSubscriptionForm.reset({
      status: 0,
      billingPeriodUnit: BillingPeriodUnit.Month,
      billingFrequency: 1,
      purchaseDate: '',
    });
    this.searchQuery.set('');
    this.searchSubscriptionTypeQuery.set('');

    this.loadDropdownData();
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveSubscription() {
    if (this.addSubscriptionForm.invalid) {
      this.addSubscriptionForm.markAllAsTouched();
      this.snack.open('Please enter all the required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
    const formData = this.addSubscriptionForm.getRawValue();
    console.log('Final Form Data:', formData);
    this.subscriptionService.createSubscription(formData).subscribe({
      next: (data) => {
        this.snack.open('Subscription added successfully', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.loadSubscriptions();
      },
      error: (err) => {
        console.log(err);

        this.snack.open(
          err?.error?.errors[0]?.message || 'Something went wrong',
          'Close',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      },
    });

    this.closeModal();
  }
  updateSubscription() {
    if (this.addSubscriptionForm.invalid) {
      this.addSubscriptionForm.markAllAsTouched();
      return;
    }
    if (this.selectedSubscription()) {
      const id = this.selectedSubscription()!.id;
      const formData = this.addSubscriptionForm.getRawValue();
      console.log('Final Form Data:', formData);
      this.subscriptionService.updateSubscription(id, formData).subscribe({
        next: (data) => {
          console.log('Subscription created:', data);
          this.closeEditModal();
          this.loadSubscriptions();
          this.snack.open('Subscription updated successfully', 'Ok', {
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
        },
      });
    }
  }

  filteredServices = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.services().filter((s) =>
      s.serviceName.toLowerCase().includes(query)
    );
  });

  filteredSubscriptionType = computed(() => {
    const query = this.searchSubscriptionTypeQuery().toLowerCase();
    return this.subscriptionTypes().filter((t) =>
      t.typeName.toLowerCase().includes(query)
    );
  });

  toggleDropdown(state: boolean) {
    this.isDropdownOpen.set(state);
  }

  selectService(service: Service) {
    this.searchQuery.set(service.serviceName);
    this.addSubscriptionForm.patchValue({ serviceId: service.id });
    this.isDropdownOpen.set(false);
  }

  toggleSubscriptionTypeDropdown(state: boolean) {
    this.isSubscriptionTypeDropdownOpen.set(state);
  }

  selectSubscriptionType(type: SubscriptionType) {
    this.searchSubscriptionTypeQuery.set(type.typeName);
    this.addSubscriptionForm.patchValue({ subscriptionTypeId: type.id });
    this.isSubscriptionTypeDropdownOpen.set(false);
  }

  loadSubscriptions(searchQuery?: string) {
    this.subscriptionService.getSubscriptions(searchQuery).subscribe({
      next: (data) => {
        this.subscriptions.set(data);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 500);
      },
      error: (e) => {
        console.error(e);
        this.isLoading.set(false);
      },
    });
  }

  onDelete(subscription: AllSubscription) {
    this.subscriptionToDelete.set(subscription);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    setTimeout(() => this.subscriptionToDelete.set(null), 200);
  }

  confirmDelete() {
    const sub = this.subscriptionToDelete();
    if (sub) {
      this.subscriptionService.deleteSubscription(sub.id).subscribe({
        next: () => {
          console.log(`Deleted ${sub.serviceName}`);
          this.loadSubscriptions();
          this.closeDeleteModal();
          this.snack.open('Subscription Deleted successfully', 'Ok', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (err) => {
          this.snack.open('Something went wrong', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
  selectedSubscription = signal<Subscription | null>(null);

  onView(sub: AllSubscription) {
    this.loadSubscriptionFullDetails(sub.id);
    this.showDetailsModal.set(true);
  }

  onEdit(sub: AllSubscription) {
    this.searchQuery.set(sub.serviceName);
    this.searchSubscriptionTypeQuery.set(sub.subscriptionTypeName);

    this.loadDropdownData();
    this.loadSubscriptionFullDetails(sub.id);

    this.editSubscriptionModal.set(true);
  }

  loadSubscriptionFullDetails(id: number) {
    this.subscriptionService.getSubscriptionById(id).subscribe({
      next: (data) => {
        this.selectedSubscription.set(data);
        const sub = this.selectedSubscription();

        // Helper function to format date without timezone issues
        const formatDateForInput = (dateString: string | undefined) => {
          if (!dateString) return '';

          // If the date is already in YYYY-MM-DD format, use it directly
          if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateString;
          }

          // Otherwise, parse and format carefully
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        this.addSubscriptionForm.patchValue({
          serviceId: sub?.serviceId,
          subscriptionTypeId: sub?.subscriptionTypeId,
          cost: sub?.cost,
          billingFrequency: sub?.billingFrequency,
          billingPeriodUnit: sub?.billingPeriodUnit,
          purchaseDate: formatDateForInput(sub?.purchaseDate.toString()),
          renewalDate: formatDateForInput(sub?.renewalDate.toString()),
          status: sub?.status,
        });
      },
      error: (e) => console.error(e),
    });
  }

  closeViewModal() {
    this.showDetailsModal.set(false);
    setTimeout(() => this.selectedSubscription.set(null), 200);
  }

  closeEditModal() {
    this.editSubscriptionModal.set(false);
    this.addSubscriptionForm.reset(); // Clear form on close
  }

  toggleDropdownWithDelay(state: boolean) {
    if (!state) {
      setTimeout(() => this.isDropdownOpen.set(false), 200);
    } else {
      this.isDropdownOpen.set(true);
    }
  }

  toggleSubscriptionTypeDropdownWithDelay(state: boolean) {
    if (!state) {
      setTimeout(() => this.isSubscriptionTypeDropdownOpen.set(false), 200);
    } else {
      this.isSubscriptionTypeDropdownOpen.set(true);
    }
  }
}
