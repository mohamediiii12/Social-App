import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollDownButtonComponent } from "../../shared/ui/scroll-down-button/scroll-down-button.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ScrollDownButtonComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
 

  registerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    username: [''],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: ['', Validators.required],
  }, {
    validators: this.confirmPasswordValidator
  });
  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   username: new FormControl(''),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   dateOfBirth: new FormControl('', Validators.required),
  //   gender: new FormControl('', Validators.required),
  //   password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  //   rePassword: new FormControl('', Validators.required),
  // },{
  //   validators: this.confirmPasswordValidator
  // });
  errorMessage: string = '';
  looding: boolean = false;
  registerSubscribe: Subscription = new Subscription();
  submition(): void {
    if (this.looding) return;
    if (this.registerForm.valid) {
      this.looding = true;
      if (this.registerSubscribe) {
        this.registerSubscribe.unsubscribe();
        console.log('Previous request cancelled');
      }
      this.registerSubscribe = this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res);
            
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.looding = false;
        },
        complete: () => {
          this.looding = false;

        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPasswordValidator(group: AbstractControl) {
    const password:any = group.get('password')?.value;
    const rePassword:any = group.get('rePassword')?.value;
    if (password !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ notMatch: true });
      return { notMatch: true };
    }
    return null;
  }
 
}
