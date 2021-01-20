import { Routes, RouterModule } from '@angular/router';
import { LoginRequiredService as LoginRequired } from '../../commons/services/users/interceptors/required.service';

import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginRequired]
  }
]

export const USERS_ROUTES = RouterModule.forChild(routes);