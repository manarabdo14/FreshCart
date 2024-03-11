import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/inerfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WhishlistComponent } from '../whishlist/whishlist.component';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _EcomdataService: EcomdataService
    , private _CartService: CartService, private _ToastrService: ToastrService
    , private _WishlistService: WishlistService) {

  }
  wishProducts: any = {}
  WhishList: string[] = []
  imagesProductDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: true
  }
  ProductsDetails: product = {} as product;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId: any = params.get('id');
        this._EcomdataService.getProductsDetails(productId).subscribe({
          next: (response) => {
            this.ProductsDetails = response.data;
          }, error: (err) => {
            console.log(err);

          }
        })


      }
    })



    this._WishlistService.getUserWishlist().subscribe({
      next: (response) => {

        for (let i = 0; i < response.count; i++) {
          this.wishProducts = response.data[i]._id;
          this.WhishList.push(this.wishProducts)
        }
        console.log(this.WhishList);

      }
    })



  }

  addCart(productId: string): void {
    this._CartService.addCart(productId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
        console.log(response);
      }
    })
  }

  addWishlist(productId: string): void {
    this._WishlistService.addToWishlist(productId).subscribe({
      next: (response) => {
        this.WhishList = response.data
        this._ToastrService.success(response.message)
        console.log(response);
      }
    })
  }

  removeProduct(productId: string): void {
    this._WishlistService.removeSpecificProduct(productId).subscribe({
      next: (response) => {
        this.WhishList = response.data
        this._ToastrService.success(response.message)
      }
    })
  }
}
