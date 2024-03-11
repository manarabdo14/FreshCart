import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _FormBuilder: FormBuilder
    , private _ResetPasswordService: ResetPasswordService, private _ToastrService: ToastrService, private _Router: Router) { }

  chechOut: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z0-9]{6,9}$/)]],
  })



  handleForm(): void {
    if (this.chechOut.valid) {

      this._ResetPasswordService.Reset(this.chechOut.get('email')?.value, this.chechOut.get('password')?.value).subscribe({
        next: (response) => {
          console.log(response);
          this._ToastrService.success(response.message)
          this._Router.navigate(['/login']);
        }
      })
    } else {
      this.chechOut.markAllAsTouched();

    }
  }
}


