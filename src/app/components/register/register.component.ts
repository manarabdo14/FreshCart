import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  msgError: string = '';
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z0-9]{6,9}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: [this.confirmPassword] } as FormControlOptions);

  confirmPassword(formGroup: FormGroup): void {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('rePassword');

    if (confirmPassword?.value == '') {
      confirmPassword?.setErrors({ required: true });
    } else
      if (password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ mismatch: true });
      } else {
        confirmPassword?.setErrors(null);
      }
  }


  handleForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {

          if (response.message == 'success') {
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }

        }, error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }

  }
}
