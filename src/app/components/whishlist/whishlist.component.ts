import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent {
  constructor(private _WishlistService: WishlistService, private _CartService: CartService, private _ToastrService: ToastrService) {
  }

  wishProducts: any = {}
  wish: any = {}
  isempty: boolean = true;
  hasData: boolean = false;
  ngOnInit(): void {
    this._WishlistService.getUserWishlist().subscribe({
      next: (response) => {
        this.isempty = false;
        this.hasData = true;
        this.wish = response;
        this.wishProducts = response.data;
        console.log(this.wishProducts);

      }
    })
  }

  getAllwish() {
    this._WishlistService.getUserWishlist().subscribe({
      next: (response) => {
        this.isempty = false;
        this.hasData = true;
        this.wish = response;
        this.wishProducts = response.data;
        console.log(this.wishProducts);

      }
    })
  }
  removeProduct(productId: string): void {
    this._WishlistService.removeSpecificProduct(productId).subscribe({
      next: (response) => {
        if (response.numOfCartItems == 0) {
          this.isempty = true;
          this.hasData = false;
        } else {
          this.getAllwish();
          console.log(response);
        }

      }
    })
  }


  addCart(productId: string): void {
    this._CartService.addCart(productId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
        this.removeProduct(productId)
        console.log(response);
      }
    })
  }
}
