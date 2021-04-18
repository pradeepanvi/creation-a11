import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { PreviewCardsComponent } from './preview-cards/preview-cards.component';
import { ShopComponent } from './shop/shop.component';
import { SuccessComponent } from './success/success.component';
import { UploadCardsComponent } from './upload-cards/upload-cards.component';
import { UploadDesignComponent } from './upload-design/upload-design.component';

const routes: Routes = [
  // { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'upload-cards', component: UploadCardsComponent },
  { path: 'preview-cards', component: PreviewCardsComponent },
  { path: 'upload-design', component: UploadDesignComponent },
  {
    path: 'cart', loadChildren: () => import('./cart-section/cart.module').then((m) => m.CartModule)
  },
  { path: 'success', component: SuccessComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
