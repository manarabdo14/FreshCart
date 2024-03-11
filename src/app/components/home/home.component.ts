import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/inerfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  customOptionsStatic: OwlOptions = {
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
  constructor(private _EcomdataService: EcomdataService, private _CartService: CartService
    , private _ToastrService: ToastrService
    , private _WishlistService: WishlistService) { }
  products: product[] = []
  categories: any[] = []
  searchterm: string = ''
  wishProducts: any = {}
  WhishList: string[] = []


  ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;

      },
      error: (err) => {

      }
    })

    this._EcomdataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data
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
