import { FormControl, ValidationErrors } from '@angular/forms';

export class Validator {
  public static nameValidator(control: FormControl): ValidationErrors | null {
    if (control.value) {
      if (/\d/.test(control.value)) {
        return { name: true };
      }
    }
    return null;
  }

  public static phoneValidator(control: FormControl): ValidationErrors | null {
    if (control.value) {
      if (!/\d{9,}/.test(control.value)) {
        return { phone: true };
      }
    }
    return null;
  }
}
