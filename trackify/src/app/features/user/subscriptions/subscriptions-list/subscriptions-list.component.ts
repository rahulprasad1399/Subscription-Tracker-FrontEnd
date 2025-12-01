import { Component, computed, inject, signal } from '@angular/core';
import {
  ActiveStatus,
  AllSubscription,
  BillingPeriodUnit,
  GetAllSubscriptionsResponse,
  Subscription,
} from '../../../../shared/models/subscription.model';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { ServiceImagePipe } from '../../../../shared/pipes/service-image.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Service } from '../../../../shared/models/service.model';
import { ServiceService } from '../../../../shared/services/service.service';
import { SubscriptionType } from '../../../../shared/models/subscription-type.model';
import { SubscriptionTypeService } from '../../../../shared/services/subscription-type.service';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscriptions-list',
  imports: [ServiceImagePipe, DatePipe, MatIconModule, CurrencyPipe],
  templateUrl: './subscriptions-list.component.html',
  styleUrl: './subscriptions-list.component.scss',
})
export class SubscriptionsListComponent {
  addSubscription() {
    this.openModal();
  }

  BillingPeriodUnit = BillingPeriodUnit;
  billingPeriodUnits = Object.values(BillingPeriodUnit);

  subscriptions = signal<GetAllSubscriptionsResponse>({
    totalItem: 0,
    activeItem: 0,
    moneySpentMonthly: 0,
    upcomingRenewal: 0,
    subscriptions: [],
  });
  ActiveStatus = ActiveStatus;
  private subscriptionService = inject(SubscriptionService);
  private serviceService = inject(ServiceService);
  private subscriptionTypeService = inject(SubscriptionTypeService);

  ngOnInit() {
    this.loadSubscriptions();
  }
  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions.set(data);
        console.log(this.subscriptions());
      },
      error: (error) => {
        console.error('Error fetching subscriptions:', error);
      },
      complete: () => console.log('Finished fetching subscriptions.'),
    });
  }
  onDelete(_t48: AllSubscription) {
    throw new Error('Method not implemented.');
  }
  onEdit(_t48: AllSubscription) {
    throw new Error('Method not implemented.');
  }
  isModalOpen = signal(false);

  services = signal<Array<Service>>([]);
  subscriptionTypes = signal<Array<SubscriptionType>>([]);

  openModal() {
    this.addSubscriptionForm.reset({ 
      status: 1, 
      billingPeriodUnit: BillingPeriodUnit.Month, 
      billingFrequency: 1 
    });
    this.searchQuery.set('');
    forkJoin({
      services: this.serviceService.getServices(),
      subscriptionTypes: this.subscriptionTypeService.getSubscriptionTypes(),
    }).subscribe(({ services, subscriptionTypes }) => {
      this.services.set(services);
      this.subscriptionTypes.set(subscriptionTypes);
    });
    this.isModalOpen.set(true);
  }
isDropdownOpen = signal(false);
isSubscriptionTypeDropdownOpen = signal(false);

searchQuery = signal('');
searchSubscriptionTypeQuery = signal('');

  filteredServices = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.services().filter(service => 
      service.serviceName.toLowerCase().includes(query)
    );
  });

  toggleDropdown(state: boolean) {
    setTimeout(() => {
      this.isDropdownOpen.set(state);
    }, 200);
  }

  selectService(service: Service) {
    this.searchQuery.set(service.serviceName);
    
    this.addSubscriptionForm.patchValue({ serviceId: service.id });
    
    this.isDropdownOpen.set(false);
  }

  // SubscriptionType
  filteredSubscriptionType = computed(() => {
    const query = this.searchSubscriptionTypeQuery().toLowerCase();
    return this.subscriptionTypes().filter(subscriptionType => 
      subscriptionType.typeName.toLowerCase().includes(query)
    );
  });

  toggleSubscriptionTypeDropdown(state: boolean) {
    setTimeout(() => {
      this.isSubscriptionTypeDropdownOpen.set(state);
    }, 200);
  }

  selectSubscriptionType(subscriptionType: SubscriptionType) {
    this.searchSubscriptionTypeQuery.set(subscriptionType.typeName);
    
    this.addSubscriptionForm.patchValue({ subscriptionTypeId: subscriptionType.id });
    
    this.isSubscriptionTypeDropdownOpen.set(false);
  }

  saveSubscription() {
    if (this.addSubscriptionForm.invalid) {
      this.addSubscriptionForm.markAllAsTouched(); 
      return;
    }
    
    console.log('Form Data:', this.addSubscriptionForm.value);
    this.closeModal();
  }
  addSubscriptionForm = new FormGroup({
    serviceId: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    subscriptionTypeId: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    cost: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    billingFrequency: new FormControl(1, [Validators.required, Validators.min(1)]),
    billingPeriodUnit: new FormControl(BillingPeriodUnit.Month, [Validators.required]), // Default to Month
    purchaseDate: new FormControl('', [Validators.required]),
    renewalDate: new FormControl('', [Validators.required]),
    status: new FormControl(1, Validators.required) // Default Active (1)
  });

  closeModal() {
    this.isModalOpen.set(false);
  }
}

