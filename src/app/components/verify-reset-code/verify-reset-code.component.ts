import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent {
  constructor(private _FormBuilder: FormBuilder
    , private _ResetPasswordService: ResetPasswordService
    , private _ToastrService: ToastrService
    , private _Router: Router
    , private _WishlistService: WishlistService) { }
  WhishList: string[] = []

  chechOut: FormGroup = this._FormBuilder.group({
    Code: ['', Validators.required]
  })



  handleForm(): void {
    if (this.chechOut.valid) {

      this._ResetPasswordService.Verfiy(this.chechOut.get('Code')?.value).subscribe({
        next: (response) => {
          console.log(response);
          this._ToastrService.success(response.message)
          this._Router.navigate(['/Reset-Password']);

        }, error: (err) => {
          this._ToastrService.error('Invalid Code')

        }
      })
    } else {
      this.chechOut.markAllAsTouched();

    }
  }
}

