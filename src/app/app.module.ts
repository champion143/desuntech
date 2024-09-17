import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgCharts } from 'ag-charts-angular';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './redux/reducers/dashboard.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgCharts,
    StoreModule.forRoot({ dashboard: dashboardReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
