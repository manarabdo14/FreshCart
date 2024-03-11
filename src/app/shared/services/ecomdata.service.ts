import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  getProductsDetails(productId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }


  getCategoryDetails(productId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${productId}/subcategories`);
  }



  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }



  getBrandDetails(BrandId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${BrandId}`)
  }
}
