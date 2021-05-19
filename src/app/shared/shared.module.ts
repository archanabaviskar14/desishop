import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WishlistService } from './services/wishlist.service';

@NgModule({
  declarations: [ 
                  ProductCardComponent,
                  ProductQuantityComponent,
                
                  
                ],
  imports: [
              CommonModule,
              FormsModule,
              CustomFormsModule,

              MatTableModule,
              MatFormFieldModule,
              MatInputModule,
              MatSortModule,
              MatPaginatorModule,
              MatButtonModule,

              AngularFireDatabaseModule,
              AngularFireAuthModule,
              NgbModule
            ],
  exports:[
              CommonModule,
              ProductCardComponent,
              ProductQuantityComponent,
             
              FormsModule,
              CustomFormsModule,

              MatTableModule,
              MatFormFieldModule,
              MatInputModule,
              MatSortModule,
              MatPaginatorModule,
              MatButtonModule,

              AngularFireDatabaseModule,
              AngularFireAuthModule,
              NgbModule,
              
          ],
  providers:[
              AuthService,
              AuthGuardService,
              UserService,
              CategoryService,
              ProductService,
              ShoppingCartService,
              OrderService,
              WishlistService

  ]
})
export class SharedModule { }
