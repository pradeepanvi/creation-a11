import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GlobalService {
    checkoutData: any[] = [];

    checkout(finalCart: any, subTotal: any) {
        this.checkoutData.push({ finalCartItems: finalCart }, { subTotal: subTotal });
        console.log(this.checkoutData);
    }
}