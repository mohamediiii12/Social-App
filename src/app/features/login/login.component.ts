import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ScrollDownButtonComponent } from "../../shared/ui/scroll-down-button/scroll-down-button.component";
import { FormBuilder, FormControl, FormGroup ,ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';

import { LoginResponse, LoginSuccess} from '../../core/models/login/login.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ScrollDownButtonComponent, ReactiveFormsModule,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
   private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  


  loginForm: FormGroup=this.formBuilder.group({
    login:['',[Validators.required, Validators.minLength(3)]],
    password:['',[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  })
  // loginForm: FormGroup= new FormGroup({
  //   login: new FormControl('',[Validators.required, Validators.minLength(3)]),
  //   password: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    
  // });
   errorMessage: string = '';
  looding: boolean = false;
  loginSubscribe: Subscription = new Subscription();
  submition(): void {
    if (this.looding) return;
    if (this.loginForm.valid) {
      this.looding = true;
      if (this.loginSubscribe) {
        this.loginSubscribe.unsubscribe();
        console.log('Previous request cancelled');
      }
      this.loginSubscribe = this.authService.signIn(this.loginForm.value).subscribe({

        next: (res) => {
          if (res.success) {
            res = res as LoginSuccess;
            console.log(res);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.router.navigate(['/feed']);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.looding = false;
        },
        complete: () => {
          this.looding = false;

        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
 
}
