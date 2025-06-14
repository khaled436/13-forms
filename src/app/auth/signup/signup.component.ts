import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

function equalValues(value1: string, value2: string) {
  return (control: AbstractControl)=>{
    const value = control.get(value1)?.value;
    const controlValue = control.get(value2)?.value;
    if (value === controlValue) {
      return null;
    }
    return {valuesNotEqual: true};
  }
}

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
    passwords: new FormGroup({
      password: new FormControl('',{
        validators:[Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }, {
      validators: [equalValues('password','confirmPassword')],
    }),
    firstName: new FormControl('',{
      validators:[Validators.required],
    }),
    lastName: new FormControl('',{
      validators:[Validators.required],
    }),
    address: new FormGroup({
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
    }),
    role: new FormControl<'student'|'teacher'|'employee'|'founder'|'other'>('student', {
      validators:[Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree : new FormControl(false, {
      validators:[Validators.required],
    })
  })

  onSubmit() {
    if (this.signupForm.invalid) {
      console.log('invalid form')
      return;
    }
    const email= this.signupForm.value.email;
    const password = this.signupForm.value.passwords?.password;
    console.log(email,password);
    this.signupForm.reset();
  }

  onReset() {
    this.signupForm.reset();
  }
}
