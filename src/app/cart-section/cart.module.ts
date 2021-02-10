import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CartRoutingModule } from "./cart-routing.module";
import { CartSectionComponent } from "./cart-section.component";
import { CartComponent } from "./cart/cart.component";
import { MaterialModule } from "./material/material.module";
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';

@NgModule({
    declarations: [
        CartSectionComponent,
        CartComponent,
        AddressComponent,
        EditAddressComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CartRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CartModule { }