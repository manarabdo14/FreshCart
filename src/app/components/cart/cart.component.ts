import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/inerfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, private _ToastrService: ToastrService) {

  }
  cartProducts: any = {}
  cart: any = {}
  isempty: boolean = true;
  hasData: boolean = false;
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.isempty = false;
        this.hasData = true;
        this.cart = response;
        this.cartProducts = response.data;
        console.log(this.cartProducts);

      }
    })
  }

  removeProduct(productId: string): void {
    this._CartService.removeSpecificProduct(productId).subscribe({
      next: (response) => {
        if (response.numOfCartItems == 0) {
          this.isempty = true;
          this.hasData = false;
        } else {
          this.cart = response;
          this.cartProducts = response.data;
          console.log(response);
        }

      }
    })
  }

  changeCount(productId: string, count: number): void {
    if (count > 0) {
      this._CartService.updateProductQuntity(productId, count).subscribe({
        next: (response) => {
          this.cart = response;
          this.cartProducts = response.data;
          console.log(response);
        }
      })
    }
  }

  ClearUserCart(): void {
    this._CartService.clearUserCart().subscribe({
      next: (response) => {
        this.isempty = true;
        this.hasData = false;
        this.cart = response;
        this.cartProducts = response.data;
        console.log(this.cartProducts);

      }
    })
  }
}
