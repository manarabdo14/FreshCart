import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService) { }

  cartID: any = ''

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartID = params.get('id');
      }
    })
  }
  chechOut: FormGroup = this._FormBuilder.group({
    details: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })


  handleForm(): void {
    this._CartService.onlinePayment(this.cartID, this.chechOut.value).subscribe({
      next: (response) => {
        if (response.status == "success") {
          window.open(response.session.url, '_self')
        }
      }
    })
  }
}
