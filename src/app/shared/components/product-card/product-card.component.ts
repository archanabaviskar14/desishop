import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { WishlistService } from 'shared/services/wishlist.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  
  @Input('product')product:Product;   //define input property here to fetch all fields like imageurl from product component
  @Input('show-actions')showActions=true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;
  wishlist:boolean=true;

  constructor(private cartservice:ShoppingCartService,
              private wishlistservice:WishlistService) { }

  addToCart()
  {
    this.cartservice.addToCart(this.product);
  }

  addtowishlist(productId){
    console.log(productId);
    return this.wishlistservice.createWishlist(productId);


  }
  removefromwishlist(){
    
  }
}
