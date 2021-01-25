import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { urlsafe } from '../../utils/http.util';
import { STREAM_API } from '../../constants/socket.constants';


@Injectable({
  providedIn: 'root'
})
export class StreamService {
  #stream?: WebSocketSubject<any>;

  constructor() { }

  connect(id: any) {
    this.#stream = webSocket(urlsafe(STREAM_API, id));
  }

  send(type: string, uid: string, peerUID?: any, ice?: any, sdp?: any) {
    this.#stream?.next({
      user: { uid },
      type,
      peerUID,
      sdp,
      ice
    });
  }

  get stream(): any {
    return this.#stream;
  }

}
