import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChangePassResponseSuccess, passBody } from '../../core/models/change-pass.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  looding: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  ChangePassSubscribe: Subscription = new Subscription();
  changePasswordForm: FormGroup = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: ['', Validators.required],
  }, {
    validators: this.confirmPasswordValidator
  });
  ngOnInit(): void {
  }
  confirmPasswordValidator(group: AbstractControl) {
    const newPassword: any = group.get('newPassword')?.value;
    const rePassword: any = group.get('rePassword')?.value;
    if (newPassword !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ notMatch: true });
      return { notMatch: true };
    }
    return null;
  }
  changePass() {
    if (this.looding) return;
    if (this.changePasswordForm.valid) {
      this.looding = true;
      if (this.ChangePassSubscribe) {
        this.ChangePassSubscribe.unsubscribe();
        console.log('Previous request cancelled');
      }
      const apiBody: passBody = {
        password: this.changePasswordForm.get('currentPassword')?.value,
        newPassword: this.changePasswordForm.get('newPassword')?.value
      }
      console.log(apiBody);

      this.ChangePassSubscribe = this.authService.changePass(apiBody).subscribe({
        next: (res) => {
          res = res as ChangePassResponseSuccess;
          if (res.success) {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            this.errorMessage = '';
            this.successMessage = res.message;
            this.router.navigate(['/feed']);
          }
        },
        error: (err) => {
          if (this.errorMessage = "invalid token..login again") {
            this.errorMessage = "Current password is incorrect or you are not authorized, please login again.";
        }else{
            this.errorMessage = err.error.message;
        }
          this.looding = false;
      },
        complete: () => {
          this.looding = false;
        }
      })
  } else {
  this.changePasswordForm.markAllAsTouched();
}
  
  }
}