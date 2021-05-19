import {ShoppingCart} from './shopping-cart';

export class Order {
    datePlaced:number;
    items:any[];

    constructor(public userId:string,public shipping:any,shoppingCart:ShoppingCart){
        this.datePlaced=new Date().getTime();

        this.items=shoppingCart.items.map(i=>{                   //get items from shopping cart and map them with new array stucture
            return{
              product:{                                          //create order object and set properties dateaplaced,shipping,itms
                title:i.title,                                  //properties of order item object
                imageurl:i.imageurl,
                price:i.price
              },
              quantity:i.quantity,
              totalPrice:i.totalPrice
            }
          })
    }
}
