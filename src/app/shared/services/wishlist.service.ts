import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Wishlist} from '../models/wishlist';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private db:AngularFireDatabase) { }

  createWishlist(productId)
  {
    return this.db.list('/wishlist').push(productId);
  }
}
