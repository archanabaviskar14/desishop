import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'app/shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  products: Product[];
  subscription: Subscription;      
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['title', 'price', 'action'];
  //pagesize = 10;
 
  constructor(private productService: ProductService){
    
  }  
 
  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(
        products =>
        { 
          this.dataSource.data = this.products = products    // use .data to show an array of data
          
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
  }
 
  filter(query: string){
    let filteredProducts;
    if(query){
      filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    }else{
      filteredProducts = this.products;
    }
    this.dataSource.data = filteredProducts;
    
  }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}