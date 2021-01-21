import { AuthService } from '../services/users/auth.service';

export const LoginRequired = (t: any) => {
  const auth = t.injector().get(AuthService);
  const state = t.router.stateService;

  if(!auth.authenticated) {
    return state.target('login');
  }
}

export const Logout = (t: any) => {
  const auth = t.injector().get(AuthService);
  const state = t.router.stateService;

  if(auth.authenticated) {
    auth.rmtoken();
  }
  return state.target('login');
}