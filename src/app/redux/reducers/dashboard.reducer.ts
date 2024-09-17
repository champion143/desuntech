import { createReducer, on } from '@ngrx/store';
import { loadDashboardConfigSuccess } from './../actions/chart.actions';

export interface DashboardState {
    dashboardConfig: any[];
    error: any;
}

export const initialState: DashboardState = {
    dashboardConfig: [],
    error: null,
};

const _dashboardReducer = createReducer(
    initialState,
    on(loadDashboardConfigSuccess, (state, { dashboardConfig }) => ({
        ...state,
        dashboardConfig,
        error: null,
    }))
);

export function dashboardReducer(state: any, action: any) {
    return _dashboardReducer(state, action);
}
