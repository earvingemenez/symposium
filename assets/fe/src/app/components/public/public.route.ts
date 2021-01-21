import { ContentOnly } from '../../commons/utils/layouts.util';
import { LoginComponent } from "./login/login.component";
import { Logout } from '../../commons/utils/security.util';


export const PUBLIC_ROUTES: Object[] = [
  {
    name: 'login',
    url: '/login',
    views: ContentOnly(LoginComponent),
    params: { next: (window as any).location.pathname }
  },
  {
    name: 'logout',
    url: '/logout',
    onEnter: Logout
  }
]
;