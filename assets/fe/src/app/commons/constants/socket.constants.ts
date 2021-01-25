import { urlsafe } from '../utils/http.util';
import { HOST } from './conf.constant';


export const proto = () => {
  return (window as any).location?.protocol === 'https:' ? 'wss': 'ws';
};

export const STREAM_API = urlsafe(`${proto()}://`, `${HOST}`, 'sessions');