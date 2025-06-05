import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
    }),
    password: new FormControl('',{
      validators:[Validators.required, Validators.minLength(6)],
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
