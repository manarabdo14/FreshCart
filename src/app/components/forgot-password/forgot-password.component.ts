import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private _FormBuilder: FormBuilder
    , private _ResetPasswordService: ResetPasswordService, private _ToastrService: ToastrService, private _Router: Router) { }

  chechOut: FormGroup = this._FormBuilder.group({
    email: ['', Validators.required]
  })



  handleForm(): void {
    if (this.chechOut.valid) {

      this._ResetPasswordService.forgotPassword(this.chechOut.get('email')?.value).subscribe({
        next: (response) => {
          console.log(response);
          this._ToastrService.success(response.message)
          this._Router.navigate(['/Verify-Code']);

        }
      })
    } else {
      this.chechOut.markAllAsTouched();

    }
  }
}
