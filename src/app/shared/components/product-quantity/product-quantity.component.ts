import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product')product:Product;   //define input property here to fetch all fields like imageurl from product component
  @Input('shopping-cart') shoppingCart;

  constructor(private cartservice:ShoppingCartService) { }

  addToCart()
  {
    this.cartservice.addToCart(this.product);
  }

  removeFromCart()
  {
    this.cartservice.removeFromCart(this.product);
  }

}
