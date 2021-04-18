import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GlobalService {
    user: any;
    firebaseData = 'https://identitycards-3b7a2.firebaseio.com/';
    firebaseUser = 'https://identitycards-users.firebaseio.com/';

    addressList: any;

    checkoutData = {};

    uploadCardsData: any = {};
    uploadMessage = false;
    stripe: any;
    constructor(private http: HttpClient) { }

    getHomePage() {
        return this.http.get(`${this.firebaseData}homePage.json`)
    }

    getShopPage() {
        return this.http.get(`${this.firebaseData}shopPage.json`)
    }
    checkUser(user: any) {
        this.user = user.id;
        this.http.get(`${this.firebaseUser + user.id}.json`).subscribe(
            (res: any) => {
                this.checkoutData
                if (res) {
                    console.log(res);
                } else {
                    const userDetail = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        provider: user.provider
                    }
                    this.http.put(`${this.firebaseUser + user.id}.json`, userDetail).subscribe(
                        (res: any) => {
                            console.log(res);
                        }
                    )
                }
            }
        )
    }

    getCartPage() {
        return this.http.get(`${this.firebaseUser + this.user}/cartPage.json`)
    }
    addToCart(cartItems: any) {
        return this.http.put(`${this.firebaseUser + this.user}/cartPage.json`, cartItems).subscribe(res => console.log(res));
    }
    checkout() {
        const newDate = new Date();
        const orderTime = `${newDate.getTime()}-${newDate.getDate()}-${newDate.getDay()}-${newDate.getFullYear()}`;
        if (sessionStorage.getItem("uploadFile")) {
            sessionStorage.removeItem("uploadCardsData");
        }
        this.checkoutData = JSON.stringify(sessionStorage);
        return this.http.put(`${this.firebaseUser}${this.user}/orders/${orderTime}.json`, this.checkoutData).subscribe(res => console.log(res));
    }

    getAddress() {
        return this.http.get(`${this.firebaseUser}${this.user}/addressItems.json`);
    }

    addAddress(addressList: any, adderss: any) {
        return this.http.put(`${this.firebaseUser}${this.user}/addressItems/${addressList}.json`, adderss).subscribe(res => console.log(res));
    }

    updateAddress(id: any, adderss: any) {
        return this.http.put(`${this.firebaseUser}${this.user}/addressItems/${id}.json`, adderss).subscribe(res => console.log(res));
    }
    deleteAddress(adderss: any) {
        return this.http.put(`${this.firebaseUser}${this.user}/addressItems.json`, adderss).subscribe(res => console.log(res));
    }

}