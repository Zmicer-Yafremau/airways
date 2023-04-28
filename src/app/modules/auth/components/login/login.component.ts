import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public reg_form!: FormGroup;
  public hide = true;
  public agree = false;
  //ublic email = new FormControl("", [Validators.required, Validators.email]);
  public f_Name = new FormControl("", [Validators.required]);
  public codeControl = new FormControl("93" as ThemePalette);

  public constructor(public fb: FormBuilder) {}

  public ngOnInit(): void {
    this.reg_form = this.fb.group({
      r_email: ["", [Validators.required, Validators.email]],
      f_name: ["", [Validators.required, this.nameValidator]],
      l_name: ["", [Validators.required, this.nameValidator]],
      phone: ["", [Validators.required, this.phoneValidator]],
    });
  }

  public getMailErrorMessage() {
    if (this.reg_form.controls["r_email"].hasError("required")) {
      return "You must enter a value";
    }

    return this.reg_form.controls["r_email"].hasError("email") ? "Not a valid email" : "";
  }
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
      if (!/\+[0-9]{9,}/.test(control.value)) {
        return { phone: true };
      }
    }
    return null;
  }
}
