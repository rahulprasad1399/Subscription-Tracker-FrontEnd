import {
  Component,
  Input,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexYAxis,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
} from 'ng-apexcharts';
import {
  CategoriesSummary,
  InsightsData,
  MonthlySpends,
} from '../models/dashbord-models';
import { ActiveStatus } from '../../../../shared/models/subscription.model';

export type ChartOptionsMonthlySpend = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

export type ChartOptionsBarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

export type ChartOptionsPieChart = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashbord-spending-insights',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './dashbord-spending-insights.component.html',
  styleUrl: './dashbord-spending-insights.component.scss',
})
export class DashbordSpendingInsightsComponent {
  public chartOptionsMonthlySpend!: Required<ChartOptionsMonthlySpend>;
  public chartOptionsBarChart!: Required<ChartOptionsBarChart>;
  public chartOptionsPrieChart!: Required<ChartOptionsPieChart>;

  isLoading  = signal<Boolean>(true)
  @Input() insightsData!: InsightsData | null;
  
  monthlySpend = signal<MonthlySpends | null>(null);
  activeStatus = signal<ActiveStatus | null>(null);
  categoriesSummary = signal<CategoriesSummary | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['insightsData']) {
      this.updateStatusChart();
      this.updateCategoriesPieChart();
      this.updateMonthlySpendChart();
      setTimeout(() => this.isLoading.set(false), 500);
    }
  }

  private updateMonthlySpendChart() {
    const monthlyData = this.insightsData?.monthlySpends?.monthlySpends ?? [];
    this.chartOptionsMonthlySpend.series = [
      {
        name: 'Spending',
        data: monthlyData,
      },
    ];
  }

  private updateStatusChart() {
    const statusData = this.insightsData?.activeStatus ?? {
      active: 0,
      paused: 0,
      cancelled: 0,
    };

    this.chartOptionsBarChart.series = [
      {
        name: 'Subscriptions',
        data: [statusData.active, statusData.paused, statusData.cancelled],
      },
    ];
  }

  private updateCategoriesPieChart() {
    const catData =
      this.insightsData?.categoriesSummary?.categoriesSummaryData ?? [];

    this.chartOptionsPrieChart.series = catData.map((c) => c.cost);
    this.chartOptionsPrieChart.labels = catData.map((c) => c.categoryName);
  }

  constructor() {
    this.chartOptionsMonthlySpend = {
      series: [
        {
          name: 'Desktop',
          data: [],
        },
      ],
      chart: {
        height: 380,
        type: 'area',
        background: 'transparent',
        foreColor: '#cbd5e1',
        zoom: {
          enabled: false,
        },
        toolbar: { show: false }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Monthly Spend',
        align: 'left',
      },
      
      grid: {
        row: {
          colors: [ 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };

    this.chartOptionsBarChart = {
      series: [
        {
          name: 'basic',
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 160,
        background: 'transparent',
        foreColor: '#cbd5e1',
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Active', 'Pause', 'Canceled'],
      },
      yaxis: {
        labels: {
          formatter: (value) => value.toString(),
        },
      },
    };
    this.chartOptionsPrieChart = {
      series: [],
      chart: {
        type: 'donut',
        background: 'transparent',
        foreColor: '#cbd5e1',
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 160,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        position: 'bottom',
        fontSize: '14px',
        itemMargin: { horizontal: 10, vertical: 5 }
      },
    };
  }
}
