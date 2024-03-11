import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {
  parameter: string = '';
  brand: any;
  constructor(private _BsModalRef: BsModalRef, private _EcomdataService: EcomdataService) { }

  ngOnInit(): void {

    console.log(this._BsModalRef);

    if (this._BsModalRef.content) {
      this.parameter = this._BsModalRef.content;
      console.log(this.parameter);

      this._EcomdataService.getBrandDetails(this.parameter).subscribe({
        next: (response) => {
          this.brand = response.data
          console.log(this.brand);
        }
      })
    }



  }
}
