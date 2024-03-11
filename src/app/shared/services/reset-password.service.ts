import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private _HttpClient: HttpClient) { }
  forgotPassword(email: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`
      , { email: email }
    )
  }

  Verfiy(resetCode: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`
      , { resetCode: resetCode }
    )
  }


  Reset(email: string, newPassword: string): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`
      , { email: email, newPassword: newPassword }
    )
  }
}
