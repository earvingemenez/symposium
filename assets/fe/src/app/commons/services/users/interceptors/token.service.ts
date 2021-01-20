import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private auth: AuthService
  ) { }

  intercept(r: HttpRequest<any>, n: HttpHandler): Observable <HttpEvent <any>> {
    const req = r.clone({
      headers: r.headers.set('Authorization', this.token)
    });

    return n.handle(req).pipe(tap(resp => resp));
  }

  get token(): string {
    return `Token ${this.auth.token.token||null}`;
  }
}
