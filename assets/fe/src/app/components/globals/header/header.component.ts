import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../commons/services/users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  get user() {
    return this.auth.user;
  }

}
