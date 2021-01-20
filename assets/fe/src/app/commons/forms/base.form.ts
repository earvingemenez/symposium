import { FormGroup, FormBuilder } from '@angular/forms';

class FormError {
  #error: string;
  #status: string;

  constructor() {
    this.#error = "";
    this.#status = "";
  }

  get error() {
    return this.#error;
  }

  set error(err: string) {
    this.#error = err;
  }

  get httpstat() {
    return this.#status;
  }

  set httpstat(http: string) {
    this.#status = http;
  }

}

export class Form extends FormError {
  #form: FormGroup;

  constructor(fields: Object) {
    super()
    this.#form = new FormBuilder().group(fields);
  }

  get form() {
    return this.#form;
  }

  get isValid(): boolean {
    return this.#form.valid;
  }

  valid(f: string) {
    return !(!this.#form.get(f)?.valid && this.#form.get(f)?.touched);
  }

  hasError(f: string, e: string) {
    return this.#form.get(f)?.touched && this.#form.get(f)?.hasError(e);
  }
}