import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(private _EcomdataService: EcomdataService, private _ActivatedRoute: ActivatedRoute) { }
  categories: any[] = []
  subcategories: any[] = []
  cateName: string = ''
  isSub: boolean = false;
  ngOnInit(): void {

    this._EcomdataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data
        console.log(this.categories);

      }
    })




  }

  getSubCategories(catId: string, cateName: string) {
    this._EcomdataService.getCategoryDetails(catId).subscribe({
      next: (response) => {
        this.isSub = true;
        this.cateName = cateName;
        this.subcategories = response.data
        console.log(response);
      }
    })



  }

}

