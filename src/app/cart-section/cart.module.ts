import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CartRoutingModule } from "./cart-routing.module";
import { CartSectionComponent } from "./cart-section.component";
import { CartComponent } from "./cart/cart.component";
import { MaterialModule } from "./material/material.module";

@NgModule({
    declarations: [
        CartSectionComponent,
        CartComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        CartRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CartModule { }