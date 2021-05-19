import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$; 
  id;
  product:any={};
  
  constructor(public categoryservice:CategoryService,
              private productservice:ProductService,
              private router:Router,
              private route:ActivatedRoute)
  { 
    this.categories$= categoryservice.getCategories();  //dropdown menu category service

    this.id=this.route.snapshot.paramMap.get('id');      //getting product id from activated route
    if (this.id) this.productservice.get(this.id) .subscribe(p => this.product = p); //if id matching then get all details and put it into the product variable

  }

  save(product)
  {
    if(this.id) this.productservice.update(this.id,product);   //if u got id from activated route then update product else create the product
    else this.productservice.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete()
  {
    if(!confirm('Are you sure you want to delete this product?')) return; //if user press cancel then return to page 

    this.productservice.delete(this.id);    //else delete product if confirms
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
// if(this.id) this.productservice.get(this.id).pipe(take(1)).subscribe(p=>this.product=p);
    // this.id = this.route.snapshot.paramMap.get('id');
     