import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Login, User } from '../../models/users.model';
import { API_AUTH_LOGIN, API_AUTHUSER } from '../../constants/api.constant';
import { AUTH_KEY } from '../../constants/conf.constant';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #user = {} as User;

  constructor(
    private http: HttpClient
  ) { }

  async login(data: Login) {
    const resp = await this.http.post(API_AUTH_LOGIN, data)
      .toPromise();
    // set token
    this.token = resp;
  }

  logout(): void {
    this.rmtoken();
  }

  rmtoken(): void {
    // clear the token from the local storage.
    (window as any).localStorage.removeItem(AUTH_KEY);
  }


  async _fetch_user() {
    const resp = await this.http.get(API_AUTHUSER)
      .toPromise();
    this.#user = resp as User;
  }

  get user() {
    if(
      Object.keys(this.#user).length === 0
    ) {
      this._fetch_user()
        .catch((err: any) => {

        })
      ;
      return this.#user;
    }
    return this.#user;
  }

  get authenticated(): boolean {
    return this.token.token ? true: false;
  }

  get token() {
    const d = (window as any).localStorage[AUTH_KEY];
    return !d? {'token': null}: JSON.parse(d);
  }

  set token(key: any) {
    (window as any).localStorage[AUTH_KEY] = JSON.stringify(key);
  }
}
