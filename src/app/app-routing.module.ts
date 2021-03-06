import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { UploadCardsComponent } from './upload-cards/upload-cards.component';

const routes: Routes = [
  // { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'upload-cards', component: UploadCardsComponent },
  {
    path: 'cart', loadChildren: () => import('./cart-section/cart.module').then((m) => m.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
