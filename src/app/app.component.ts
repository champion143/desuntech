import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { select, Store } from '@ngrx/store';
import { AppState } from './redux/states/app.state';
import { loadDashboardConfigSuccess } from './redux/actions/chart.actions';
import { Observable } from 'rxjs';
import { selectDashboardConfig } from './redux/selectors/dashboard.selectors';
import { DashboardService } from './services/dashboard.service';

export interface ChartType {
  _id: number;
  chartHeader: string;
  type: string;
  size: string;
  position: number;
  chartOptions: AgChartOptions
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  sizes: any = {
    'full': 'col-12',
    'half': 'col-6',
    'quarter': 'col-3'
  }

  dashboardConfig = [
    {
      _id: 1,
      chartHeader: 'Chart 1',
      type: 'pie',
      data: [
        { asset: "Stocks", amount: 60000 },
        { asset: "Bonds", amount: 40000 },
        { asset: "Cash", amount: 7000 },
        { asset: "Real Estate", amount: 5000 },
        { asset: "Commodities", amount: 3000 },
      ],
      size: 'full',
      position: 1
    },
    {
      _id: 2,
      chartHeader: 'Chart 2',
      type: 'bar',
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      size: 'full',
      position: 3
    },
    {
      _id: 3,
      chartHeader: 'Chart 3',
      type: 'bar',
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      size: 'half',
      position: 6
    },
    {
      _id: 4,
      chartHeader: 'Chart 4',
      type: 'line',
      data: [
        {
          quarter: "Q1",
          petrol: 200,
          diesel: 100,
        },
        {
          quarter: "Q2",
          petrol: 300,
          diesel: 130,
        },
        {
          quarter: "Q3",
          petrol: 350,
          diesel: 160,
        },
        {
          quarter: "Q4",
          petrol: 400,
          diesel: 200,
        },
      ],
      size: 'quarter',
      position: 2
    },
    {
      _id: 5,
      chartHeader: 'Chart 5',
      type: 'pie',
      data: [
        { asset: "Stocks", amount: 60000 },
        { asset: "Bonds", amount: 40000 },
        { asset: "Cash", amount: 7000 },
        { asset: "Real Estate", amount: 5000 },
        { asset: "Commodities", amount: 3000 },
      ],
      size: 'quarter',
      position: 4
    },
    {
      _id: 6,
      chartHeader: 'Chart 6',
      type: 'line',
      data: [
        {
          quarter: "Q1",
          petrol: 200,
          diesel: 100,
        },
        {
          quarter: "Q2",
          petrol: 300,
          diesel: 130,
        },
        {
          quarter: "Q3",
          petrol: 350,
          diesel: 160,
        },
        {
          quarter: "Q4",
          petrol: 400,
          diesel: 200,
        },
      ],
      size: 'quarter',
      position: 5
    },

  ];

  chartData: ChartType[] = [];

  constructor(private store: Store<AppState>, private dashboardService: DashboardService) {
    this.dashboardConfig.sort((a, b) => a.position - b.position);
    this.dashboardService.loadDashboardConfig(this.dashboardConfig);
    this.getConfig()
  }

  getConfig() {
    this.dashboardService.getDashboardConfig().subscribe(config => {
      this.chartData = config.map((item) => {
        return this.getChartOptions(item);
      })
    });
  }

  getChartOptions(chart: any) {
    let series: any = [];
    switch (chart.type) {
      case 'bar':
        series = [
          { type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }
        ];
        break;
      case 'pie':
        series = [
          { type: "pie", angleKey: "amount", legendItemKey: "asset" }
        ];
        break;
      case 'line':
        series = [
          { type: 'line', xKey: 'quarter', yKey: 'petrol', yName: 'Petrol' },
          { type: 'line', xKey: 'quarter', yKey: 'diesel', yName: 'Diesel' },
        ];
        break;
      default:
        break;

    }
    return {
      _id: chart._id,
      chartHeader: chart.chartHeader,
      type: chart.type,
      size: this.sizes[chart.size],
      position: chart.position,
      chartOptions: {
        data: chart.data,
        series: series
      }
    };
  }

}
