import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-blank-nav',
  templateUrl: './blank-nav.component.html',
  styleUrls: ['./blank-nav.component.css']
})
export class BlankNavComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _CartService: CartService) { }

  cartCount: string = '';
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {

        this.cartCount = response.numOfCartItems;

      }
    })
  }
  logOutUser(): void {
    this._AuthService.logOut();
  }

}
