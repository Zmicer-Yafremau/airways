import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss']
})
export class PassengersInfoComponent implements OnInit {

  public passengerForm!: FormGroup;

  public constructor(
    public fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.passengerForm = this.fb.group({
      firstName: ['', [Validators.required, Validator.nameValidator]],
      lastName: ['', [Validators.required, Validator.nameValidator]],
      date: ['', [Validators.required]],
      gender: [''],
    });
  }

}