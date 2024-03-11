import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient: HttpClient) { }


  headers: any = {
    token: localStorage.getItem('eToken')
  }
  addToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`
      , { "productId": productId }
      , {
        headers: this.headers
      }
    )
  }

  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: this.headers
    })
  }
  removeSpecificProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
      , {
        headers: this.headers
      }
    )
  }


}
