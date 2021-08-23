import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CartComponent } from '../list/cart.component';
import { CartDetailComponent } from '../detail/cart-detail.component';
import { CartUpdateComponent } from '../update/cart-update.component';
import { CartRoutingResolveService } from './cart-routing-resolve.service';
import { CartDashboardComponent } from '../cart-dashboard.component';
import { Authority } from 'app/config/authority.constants';

const cartRoute: Routes = [
  {
    path: '',
    component: CartComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CartDetailComponent,
    resolve: {
      cart: CartRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CartUpdateComponent,
    resolve: {
      cart: CartRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CartUpdateComponent,
    resolve: {
      cart: CartRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'dashboard',
    component: CartDashboardComponent,
    resolve:{
    cart: CartRoutingResolveService
    },
    data: {
    authorities: [Authority.USER],
    pageTitle: 'Dashboard'
    },
    canActivate:[UserRouteAccessService]
    }

  
];

@NgModule({
  imports: [RouterModule.forChild(cartRoute)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
