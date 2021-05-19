import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product)
  {
    return this.db.list('/products').push(product);
  }

 //getAll():Observable<Product[]>
  //{
    //return this.db.list<Product>('/products').snapshotChanges();
 //}

 getAll() : Observable<Product[]>{  
    return this.db.list('/products')
    .snapshotChanges()
    .pipe(
     map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Product }))
    )
    
  );
  }

  get(productId)
  {
    return this.db.object('/products/'+productId).valueChanges();
  }

  update(productId,product)
  {
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId)
  {
    return this.db.object('/products/'+productId).remove();
  }
}
