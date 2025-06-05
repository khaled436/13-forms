import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {of} from "rxjs";

function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function isEmailUnique(control: AbstractControl){
  if (control.value !== 'test@example.com'){
    return of(null);
  }
  return of({notUniaue: true});
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[ReactiveFormsModule],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('',{
      validators:[Validators.required, Validators.email],
      asyncValidators:[isEmailUnique],
    }),
    password: new FormControl('',{
      validators:[Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  get isEmailInvalid() {
    return (
      this.form.controls.email.touched &&
        this.form.controls.email.dirty &&
        this.form.controls.email.invalid
    )
  }

  get isPasswordInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    )
  }

  onSubmit() {
    console.log(this.form);
    const email= this.form.value.email;
    const password = this.form.value.password;
    console.log(email,password);
}
}
