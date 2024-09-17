import { createAction, props } from '@ngrx/store';

export const loadDashboardConfig = createAction('[Dashboard] Load Config');
export const loadDashboardConfigSuccess = createAction(
    '[Dashboard] Load Config Success',
    props<{ dashboardConfig: any[] }>()
);
export const loadDashboardConfigFailure = createAction(
    '[Dashboard] Load Config Failure',
    props<{ error: any }>()
);
