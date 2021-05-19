import { Product } from './product';
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items:ShoppingCartItem[]=[];
    
    constructor(
        
        private itemsMap:{[productId:string]:ShoppingCartItem})   //bcz itemsmap here is object in database not array
    {
        this.itemsMap = itemsMap || {};

        for(let productId in itemsMap){
        let item=itemsMap[productId];
        this.items.push(new ShoppingCartItem({...item, key:productId }));  
        }
    }
                                                // title=item.title,
                                                    //imageurl=item.imageurl,
                                                    //price=item.price, in typescript we have a operator spread operator
                                        //...item is same as these 3 lines ...operator is used with object item then typescript iterate all properties of that object with ...item
             
       // let x = new ShoppingCartItem();
        //Object.assign(x, item);
        //x.key = productId;
        //this.items.push(x);
   
    getQuantity(product:Product)
    {
    let item=this.itemsMap[product.key];
    return item ? item.quantity:0;

    }

    get totalPrice()
    {
        let sum=0;
        for(let productId in this.items)
        sum+= this.items[productId].totalPrice;
        return sum;
    }
    
    get totalItemsCount(){

        let count=0;
      // const  items = this.payload.val().items;
        for(let productId in this.items)
          count +=this.items[productId].quantity;
          return count;
    }                                          
                                            //now here we are implementing the logic of displaying no of products in shopping cart
}                                           //so we cannt use interface keyword bcz with interface we cannt implement logic bcz interfaces r all abt declaration.its all abt declaring properties for given object
                                             //means implementation is not defined in the interface
