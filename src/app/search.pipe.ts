import { Pipe, PipeTransform } from '@angular/core';
import { product } from './shared/inerfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(Products: product[], term: string): product[] {
    return Products.filter((product) => product.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
