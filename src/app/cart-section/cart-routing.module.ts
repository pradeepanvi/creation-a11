import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartSectionComponent } from "./cart-section.component";
import { CartComponent } from "./cart/cart.component";

const cartRoutes: Routes = [
    {
        path: '', component: CartSectionComponent, children: [
            { path: '', component: CartComponent },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(cartRoutes)
    ],
    exports: [RouterModule]
})

export class CartRoutingModule { }