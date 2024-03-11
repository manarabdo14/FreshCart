import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/inerfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private _EcomdataService: EcomdataService, private _CartService: CartService, private _ToastrService: ToastrService) { }
  products: product[] = []
  categories: any[] = []
  searchterm: string = ''
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



  }

  addCart(productId: string): void {
    this._CartService.addCart(productId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
        console.log(response);
      }
    })
  }
}
