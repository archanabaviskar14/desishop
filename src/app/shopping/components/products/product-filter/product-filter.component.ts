import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$: any;
  @Input('category') category;

  constructor(categoryservice:CategoryService) {

    this.categories$= categoryservice.getCategories();  
   }

  ngOnInit(): void {
  }

}
