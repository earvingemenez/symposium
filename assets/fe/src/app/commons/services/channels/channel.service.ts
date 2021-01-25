import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { urlsafe } from '../../utils/http.util';
import { API_CHANNELS } from '../../constants/api.constant';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private http: HttpClient
  ) { }

  getChannel(id: any) {
    return this.http.get(urlsafe(API_CHANNELS, id))
      .toPromise()
    ;
  }

  getChannels() {
    return this.http.get(API_CHANNELS)
      .toPromise()
    ;
  }

}
