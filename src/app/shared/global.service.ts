import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GlobalService {
    user = 'NuFgoUkCLaVgsyXYF2aPztjkRPc2';
    firebaseData = 'https://identitycards-3b7a2.firebaseio.com/';
    firebaseUser = 'https://identitycards-users.firebaseio.com/users/';

    checkoutData: any[] = [];
    constructor(private http: HttpClient) { }

    getHomePage() {
        return this.http.get(`${this.firebaseData}homePage.json`)
    }

    getShopPage() {
        return this.http.get(`${this.firebaseData}shopPage.json`)
    }


    getCartPage() {
        return this.http.get(`${this.firebaseData}cartPage.json`)
    }
    addToCart(cartItems: any) {
        return this.http.put(`${this.firebaseData}cartPage.json`, cartItems).subscribe(res => console.log(res));
    }
    checkout(finalCart: any, subTotal: any) {
        this.checkoutData.push({ finalCartItems: finalCart }, { subTotal: subTotal });
        console.log(this.checkoutData);
    }

    getUser() {
        return this.http.get(`${this.firebaseUser}${this.user}.json`)
    }

    getAddress() {
        return this.http.get(`${this.firebaseUser}${this.user}/addressItems.json`);
    }

    addAddress(adderss: any) {
        return this.http.post(`${this.firebaseUser}${this.user}/addressItems`, adderss).subscribe(res => console.log(res));
    }

    updateAddress(id: any, adderss: any) {
        return this.http.put(`${this.firebaseUser}${this.user}/addressItems/${id}`, adderss).subscribe(res => console.log(res));
    }
    deleteAddress(adderss: any) {
        return this.http.put(`${this.firebaseUser}${this.user}/addressItems`, adderss).subscribe(res => console.log(res));
    }

}