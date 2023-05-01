import { Component } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.scss'],
})
export class ValidatorsComponent {
  public nameValidator(control: FormControl): ValidationErrors | null {
    if (control.value) {
      if (/\d/.test(control.value)) {
        return { name: true };
      }
    }
    return null;
  }

  public phoneValidator(control: FormControl): ValidationErrors | null {
    if (control.value) {
      if (!/\d{9,}/.test(control.value)) {
        return { phone: true };
      }
    }
    return null;
  }
}
