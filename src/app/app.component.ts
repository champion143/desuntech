import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { select, Store } from '@ngrx/store';
import { AppState } from './redux/states/app.state';
import { loadDashboardConfigSuccess } from './redux/actions/chart.actions';
import { Observable } from 'rxjs';
import { selectDashboardConfig } from './redux/selectors/dashboard.selectors';
import { DashboardService } from './services/dashboard.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'


export interface DashboardConfig {
  _id: number;
  chartHeader: string;
  type: string,
  data: any[],
  size: string,
  position: number
}

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

  types: any = {
    'col-12': 'full',
    'col-6': 'half',
    'col-3': 'quarter'
  }

  dashboardConfig: DashboardConfig[] = [
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

  myForm: FormGroup;

  constructor(private store: Store<AppState>, private dashboardService: DashboardService) {
    this.dashboardConfig.sort((a, b) => a.position - b.position);
    this.dashboardService.loadDashboardConfig(this.dashboardConfig);
    this.getConfig()
    this.myForm = new FormGroup({
      chartheader: new FormControl(1, [Validators.required]), // storing id
      type: new FormControl('pie', [Validators.required]),
      size: new FormControl('full', [Validators.required]),
      position: new FormControl(1, [Validators.required]),
      data: new FormArray([], [Validators.required]),
    })
    this.prepareData(1)
  }

  prepareData(chartheader: number) {
    this.data.clear()
    const formArray = this.myForm.get('data') as FormArray;
    const dynamicData = this.chartData.filter((item) => item._id == chartheader);
    if (dynamicData.length > 0) {
      const chartOptionData = dynamicData[0].chartOptions.data ?? []
      this.type?.setValue(dynamicData[0].type)
      this.size?.setValue(this.types[dynamicData[0].size])
      this.position?.setValue(dynamicData[0].position)
      switch (dynamicData[0].type) {
        case 'pie':
          chartOptionData.forEach(item => {
            const formGroup = new FormGroup({
              asset: new FormControl({ value: item.asset, disabled: true }),
              amount: new FormControl(item.amount, [Validators.required])
            })
            formArray.push(formGroup)
          })
          break;
        case 'bar':
          chartOptionData.forEach(item => {
            const formGroup = new FormGroup({
              month: new FormControl({ value: item.month, disabled: true }),
              avgTemp: new FormControl(item.avgTemp, [Validators.required]),
              iceCreamSales: new FormControl(item.iceCreamSales, [Validators.required])
            })
            formArray.push(formGroup)
          })
          console.log(formArray.value)
          console.log(this.data.value)
          break;
        default:
          chartOptionData.forEach(item => {
            const formGroup = new FormGroup({
              quarter: new FormControl({ value: item.quarter, disabled: true }),
              petrol: new FormControl(item.petrol, [Validators.required]),
              diesel: new FormControl(item.diesel, [Validators.required])
            })
            formArray.push(formGroup)
          })
          break;
      }
    }
  }

  onChartHeaderChange(event: any) {
    const selectedValue = event.target.value;
    this.prepareData(selectedValue)
  }

  get data() {
    return this.myForm.get('data') as FormArray;
  }

  get type() {
    return this.myForm.get('type');
  }

  get size() {
    return this.myForm.get('size');
  }

  get position() {
    return this.myForm.get('position');
  }

  updatePosition(items: DashboardConfig[], itemId: any, newPosition: any): DashboardConfig[] {
    const currentItem = items.find(item => item._id === itemId);
    if (!currentItem) {
      console.log("Item not found");
      return [];
    }
    const oldPosition = currentItem.position;
    // If position is not changing, no need to update
    if (oldPosition === newPosition) return items;
    items = items.map(item => {
      // Handle upward shift
      if (newPosition < oldPosition) {
        if (item.position >= newPosition && item.position < oldPosition && item._id !== itemId) {
          return { ...item, position: item.position + 1 };
        }
      }
      // Handle downward shift
      else if (newPosition > oldPosition) {
        if (item.position <= newPosition && item.position > oldPosition && item._id !== itemId) {
          return { ...item, position: item.position - 1 };
        }
      }
      // Update the current item's position
      if (item._id === itemId) {
        return { ...item, position: newPosition };
      }
      // Return the item as is if no change is required
      return item;
    });
    // Sort the array by the updated position
    items.sort((a, b) => a.position - b.position);
    return items;
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.getRawValue();
      const updatedDashboardConfig = [...this.updatePosition([...this.dashboardConfig], Number(formData.chartheader), formData.position)];
      const index = updatedDashboardConfig.findIndex(obj => obj._id === Number(formData.chartheader));
      if (index !== -1) {
        updatedDashboardConfig[index] = { ...updatedDashboardConfig[index], data: formData.data, size: formData.size };
      }
      this.dashboardService.loadDashboardConfig(updatedDashboardConfig);
      this.getConfig()
    }
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
