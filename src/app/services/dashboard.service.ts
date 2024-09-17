import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadDashboardConfigSuccess } from './../redux/actions/chart.actions';
import { AppState } from './../redux/states/app.state';
import { selectDashboardConfig } from './../redux/selectors/dashboard.selectors';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private store: Store<AppState>) { }

    // Method to load data into the store
    loadDashboardConfig(config: any[]) {
        this.store.dispatch(loadDashboardConfigSuccess({ dashboardConfig: config }));
    }

    // Method to get data from the store
    getDashboardConfig(): Observable<any[]> {
        return this.store.select(selectDashboardConfig);
    }
}
