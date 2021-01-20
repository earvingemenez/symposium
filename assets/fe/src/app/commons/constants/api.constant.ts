import { urlsafe } from '../utils/http.util';
import { API_URL } from './conf.constant';


export const API_USERS = urlsafe(API_URL, 'users');

export const API_AUTHUSER = urlsafe(API_USERS, 'auth');
export const API_AUTH_LOGIN = urlsafe(API_USERS, 'login');