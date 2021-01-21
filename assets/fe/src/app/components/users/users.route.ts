import { HeaderContent } from '../../commons/utils/layouts.util';
import { LoginRequired } from '../../commons/utils/security.util';

import { DashboardComponent } from './dashboard/dashboard.component';

export const USERS_ROUTES: Object[] = [
  {
    name: 'dashboard',
    url: '/dashboard',
    views: HeaderContent(DashboardComponent),
    onEnter: LoginRequired
  }
]
;