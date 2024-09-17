import { createSelector } from '@ngrx/store';
import { AppState } from './../states/app.state';

export const selectDashboardState = (state: AppState) => state.dashboard;

export const selectDashboardConfig = createSelector(
    selectDashboardState,
    (state) => state.dashboardConfig
);
