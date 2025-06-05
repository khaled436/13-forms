import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {

  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(()=>{
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value)=>{
          window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
        },
      });

      this.destroyRef.onDestroy(()=>subscription?.unsubscribe);

    });
  }


  onSubmit(formData: NgForm) {

    if (formData.form.invalid){
      return;
    }

    const  email = formData.value.email;
    const password = formData.value.password;

    console.log(email, password);
    formData.form.reset();
  }
}
