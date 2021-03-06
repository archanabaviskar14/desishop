import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart:ShoppingCart;
  shipping:any = {}; 
  userId: string;
  userSubscription:Subscription;
  
  constructor(
    private orderService:OrderService,
    private router:Router,
    private authservice:AuthService) { }   

  ngOnInit() {
    this.userSubscription=this.authservice.user$.subscribe(user=>this.userId=user.uid);   //for assigning the userid with perticular order and unsubscribe it also as it is on ngonit
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }    

  async placeOrder()
  {
    let order=new Order(this.userId,this.shipping,this.cart);
    let result=await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }   
}
