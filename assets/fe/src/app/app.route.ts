import { PUBLIC_ROUTES } from './components/public/public.route';
import { CHANNELS_ROUTES } from './components/channels/channels.route';
import { USERS_ROUTES } from './components/users/users.route';


export const APP_ROUTES = {
  otherwise: '/login',
  states: ([] as Object[]).concat(
    PUBLIC_ROUTES,
    USERS_ROUTES,
    CHANNELS_ROUTES,
  )
}
