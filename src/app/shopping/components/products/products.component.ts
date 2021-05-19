import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../../shared/models/product';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
 products:Product[]=[];                   //1st way //used forclient side filtering
 category: string;
 filteredProduct:Product[]=[];
 cart$:Observable<ShoppingCart>;
      //product$; //2nd way by using observer //when we r implementing filtering on client side then we cann't use observer i.e $ symbol so we need to store it in array i.e product array product[]
 
  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private cartService:ShoppingCartService) { }

      async ngOnInit() {
        this.cart$ = await this.cartService.getCart()   //initialising cart
        this.populateProducts();    
      }

      private populateProducts()           //method for populating products
      {
        this.productService
        .getAll()                           //get all products from productservice
        .pipe(
          switchMap(products => {
            this.products = products;        //store that products here
            return this.route.queryParamMap;  //then we go to route parameters.**make route private in constructor and use it using this
          })
        ).subscribe(params => {                //subscribe to that observable
          this.category = params.get('category');   //reading category from route parameters and storing it in this.category
          this.applyFilter();                       //and then applying filter
         });
      }

      private applyFilter()
      {
        this.filteredProduct = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
      }  
 }
                

    //this is for initialising products from firebase ie getAll
    //THIS METHOD IS ALSO RIGHT WITHOUT USING SWITCHMAP OPERATOR
 /*   productservice.getAll().subscribe(products=> 
      {
        this.products=products

        //2nd subscribe method after this 1st subscribe method otherwise it ll not display all products.otherwise it ll call 2nd subcribe method i.e this.product which is emplty menas not initialised
        route.queryParamMap.subscribe(params=>   //procedure to connect the query parameters displayed in taskbar
          {                                         //i e when click on bread then select that category
            this.category=params.get('category');  //this.category contain currently selected product e.g bread from query params
    
            this.filteredProduct=(this.category)?   //apply filter here on that currently selected category .if category is selected that store it in filteded product
            this.products.filter(p=>p.category===this.category): //filter and set currently selected category to category in firebase
            this.products;     //not initialised                                 //else dispaly all products
          });
      });//UP TO HERE */ /*u can write this way also by subscribing*/
    
    //this.product$=productservice.getAll(); //by using observer

    
  //  this.categoryservice.getCategories()
    //.subscribe(category=>
      //this.category=category)


/*in the above code we have 2 asynchronous operations ie 2 subscribe so its a confustion whitch ll execute 1st 
thats why placing 2nd subscriber after product subscriber so that browser ll 1st execute product and display all products i.e this.product
 */
/*if we r using 2 subscribe method in same code then it looks ugly so
use switchMap->switch 1 observable to another */