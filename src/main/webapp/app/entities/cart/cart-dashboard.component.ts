import { Component, OnInit } from '@angular/core';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { ICart } from './cart.model';

@Component({
  selector: 'jhi-cart-dashboard',
  templateUrl: './cart-dashboard.component.html',
  styleUrls: ['./cart-dashboard.component.scss']
})
export class CartDashboardComponent implements OnInit {
  cart: any;
  registerExpandedView: any;

  constructor(protected eventManager: EventManager) { }

  ngOnInit(): void {
  this.registerExpandedView();
  }

 // registerExpandedView(): void{
   // this.eventManager.subscribe('ListExpanded',(response:EventWithContent<any>) =>{
     // this.cart = response.content as ICart;
   // });
    //}
    

}





