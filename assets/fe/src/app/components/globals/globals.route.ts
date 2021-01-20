import { Routes, RouterModule } from '@angular/router';
import { LoginRequiredService as LoginRequired } from '../../commons/services/users/interceptors/required.service';

import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: '',
    outlet: 'headernav',
    component: HeaderComponent,
    canActivate: [LoginRequired]
  }
]

export const GLOBALS_ROUTES = RouterModule.forChild(routes);