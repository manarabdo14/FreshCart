import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { BrandDetailsComponent } from '../brand-details/brand-details.component';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  constructor(private _EcomdataService: EcomdataService, private _BsModalService: BsModalService) { }
  Brands: any[] = []
  isSub: boolean = false;
  bsModalRef?: BsModalRef;

  ngOnInit(): void {

    this._EcomdataService.getAllBrands().subscribe({
      next: (response) => {
        this.Brands = response.data
      }
    })
  }


  brandClick(productID: string): void {

    const initialState = {
      parameter: productID
    };

    this.bsModalRef = this._BsModalService.show(BrandDetailsComponent, { initialState });
  }

}
