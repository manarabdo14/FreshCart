import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }
  headers: any = {
    token: localStorage.getItem('eToken')
  }
  addCart(productId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`
      , { "productId": productId }
      , {
        headers: this.headers
      }
    )
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: this.headers
    })
  }
  removeSpecificProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
      , {
        headers: this.headers
      }
    )
  }


  updateProductQuntity(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
      , { count: count }
      , {
        headers: this.headers
      }
    )
  }


  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: this.headers
    })
  }


  onlinePayment(cartID: string, formObj: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://https://manarabdo14.github.io/`, {

      shippingAddress: formObj


    },
      {
        headers: this.headers

      }
    )
  }

}
