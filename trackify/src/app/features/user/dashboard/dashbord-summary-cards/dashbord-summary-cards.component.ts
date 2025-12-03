import { Component, Input, signal } from '@angular/core';
import { SummaryCardData } from '../models/dashbord-models';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashbord-summary-cards',
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './dashbord-summary-cards.component.html',
  styleUrl: './dashbord-summary-cards.component.scss',
})
export class DashbordSummaryCardsComponent {
  isLoading  = signal<Boolean>(true)
  @Input() cardData!: SummaryCardData | null;
  ngOnInit(){
    setTimeout(()=>this.isLoading.set(false),500)
  }
}
