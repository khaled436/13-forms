import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";

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

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[ReactiveFormsModule],
})
export class LoginComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue,{
      validators:[Validators.required, Validators.email],
      asyncValidators:[isEmailUnique],
    }),
    password: new FormControl('',{
      validators:[Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  ngOnInit(): void {
    // const savedForm = window.localStorage.getItem('saved-login-form');
    //
    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   })
    // }




    const sub = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
      }
    });

    this.destroyRef.onDestroy(()=>{sub.unsubscribe();});
  }

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
