import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/angular';

import { Login } from '../../../commons/models/users.model';
import { LoginForm } from '../../../commons/forms/users.form';

import { AuthService } from '../../../commons/services/users/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public Form: LoginForm;
  public formSubmitted: boolean = false;

  constructor(
    private auth: AuthService,
    private state: StateService
  ) {
    this.Form = new LoginForm();
  }

  ngOnInit(): void {}

  onSubmit({value, valid}: {value: Login, valid: boolean}) {
    this.formSubmitted = true;

    if (valid) {
      this.auth.login(value)
        .then((resp) => this.state.go('dashboard'))
        .catch((err: any) => {
          this.Form.httpstat = err.status;
        })
      ;
    }
  }

}
