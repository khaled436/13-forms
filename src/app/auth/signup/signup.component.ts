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
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    firstName: new FormControl('',{
      validators:[Validators.required],
    }),
    lasttName: new FormControl('',{
      validators:[Validators.required],
    }),
    street: new FormControl('',{
      validators:[Validators.required],
    }),
    number: new FormControl('',{
      validators:[Validators.required],
    }),
    postalCode: new FormControl('',{
      validators:[Validators.required],
    }),
    city: new FormControl('',{
      validators:[Validators.required],
    }),
    role: new FormControl<'student'|'teacher'|'employee'|'founder'|'other'>('student', {
      validators:[Validators.required],
    }),
    agree : new FormControl(false, {
      validators:[Validators.required],
    })
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
