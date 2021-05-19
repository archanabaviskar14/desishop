import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  

  constructor(private db:AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {

    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId+'/items').valueChanges()
          .pipe(map((x:any)=>new ShoppingCart(x)));

  } //don't forget to return otherwise ll give cannot subscribe void type

  //2nd method
  async addToCart(product: Product) {
    this.updateItem(product,1);
  }
  async removeFromCart(product:Product){
    this.updateItem(product,-1);
  }


  private create()
  {
   return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    });
  }
  
  clearCart()
  { 
    this.db.list('/shopping-carts').remove();
  }
  
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId():Promise<string> { 
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  
  private async updateItem(product:Product,change:number)
  {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
    let quantity= (item.payload.exists() ? item.payload.val()['quantity'] : 0) + change
    if(quantity === 0) item$.remove();        //if quantity of item is 0 then remove it from cart else update it
    else
    item$.update({
      title: product.title,
      price: product.price,
      imageurl: product.imageurl,
   
      quantity: quantity
    });
  })

  }
 /* private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId ,product.key)
    item$.valueChanges().pipe(take(1))
    .subscribe((item: any) => {
      if(item) item$.update({
         quantity: (item.quantity) + change });
      else item$.update({
        // product: product, 
        title: product.title,
        imageurl: product.imageurl,
        price: product.price, 
        quantity: change});
    });
  }*/
}

  /*async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item) => {
        if (item.payload.exists()) {
            item$.update({ quantity: item.payload.exportVal().quantity + 1 });
        } else {
            item$.set({ product: product, quantity: 1 });
        }
    });
}*/
/* 1st method correctly implemented
async addToCart(product: Product) {
  const cartId = await this.getOrCreateCartId();
  const item$ = this.getItem(cartId, product.key);
  item$.snapshotChanges().pipe(take(1)).subscribe(item => {
    item$.update({
      product: product,
      quantity: (item.payload.exists() ? item.payload.val()['quantity'] : 0) + 1
    });
  })
}

async removeFromCart(product:Product)
{
  const cartId = await this.getOrCreateCartId();
  const item$ = this.getItem(cartId, product.key);
  item$.snapshotChanges().pipe(take(1)).subscribe(item => {
    item$.update({
      product: product,
      quantity: (item.payload.exists() ? item.payload.val()['quantity'] : 0) - 1
    });
  })

}*/



