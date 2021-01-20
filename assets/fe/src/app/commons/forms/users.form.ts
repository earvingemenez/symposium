import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Form } from './base.form';

export class LoginForm extends Form {

    constructor(data?: any) {
        const fields = {
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(1)])
        }
        super(fields);
    }

}