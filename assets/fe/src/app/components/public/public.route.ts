import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";

import { LogoutService } from '../../commons/services/users/interceptors/logout.service';


const routes : Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    // FIX THIS. crappy solution.
    // find a solution that doesn't need
    // to create a component.
    path: 'logout',
    component: LoginComponent,
    canActivate: [LogoutService]
  }
]

export const PUBLIC_ROUTES = RouterModule.forChild(routes);