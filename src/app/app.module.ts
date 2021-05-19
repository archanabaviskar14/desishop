import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AngularFireModule} from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';

import { environment } from 'environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './shopping/components/products/products.component';
import { LoginComponent } from './core/components/login/login.component';
import { CarouselComponent } from './core/components/carousel/carousel.component';
import { AboutUsComponent } from './core/components/about-us/about-us.component';




@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
   // AppRoutingModule,

    SharedModule, 
    AdminModule,
    ShoppingModule, 
    CoreModule,
  
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    
    RouterModule.forRoot([
    
      {path:'',component:CarouselComponent},
      { path: 'products', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'about-us', component:AboutUsComponent},
     
    ]) 
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
