import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignupComponent {

  signupForm =  new FormGroup({
    email: new FormControl('',{
      validators:[Validators.required, Validators.email],
    }),
    password: new FormControl('',{
      validators:[Validators.required, Validators.minLength(6)],
    }),
  })

  onSubmit() {
    const email= this.signupForm.value.email;
    const password = this.signupForm.value.password;
    console.log(email,password);
    this.signupForm.reset();
  }

  onReset() {
    this.signupForm.reset();
  }
}
