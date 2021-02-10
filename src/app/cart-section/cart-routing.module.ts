import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressComponent } from "./address/address.component";
import { EditAddressComponent } from "./address/edit-address/edit-address.component";
import { CartSectionComponent } from "./cart-section.component";
import { CartComponent } from "./cart/cart.component";

const cartRoutes: Routes = [
    {
        path: '', component: CartSectionComponent, children: [
            { path: '', component: CartComponent },
            { path: 'address', component: AddressComponent },
            { path: 'address/:id', component: EditAddressComponent },
            { path: 'new-address', component: EditAddressComponent },
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