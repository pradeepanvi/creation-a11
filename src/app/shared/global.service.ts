import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class GlobalService {
    user: any;
    userObservable = new Subject<any>();
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
        if (user && user.id) {
            this.user = user.id;
            this.userObservable.next(user.id);
            sessionStorage.setItem("user", user.id);
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
    }

    getCartPage() {
        return this.http.get(`${this.firebaseUser + this.user}/cartPage.json`)
    }
    addToCart(cartItems: any) {
        return this.http.put(`${this.firebaseUser + this.user}/cartPage.json`, cartItems).subscribe(res => console.log(res));
    }
    checkout(user: any) {
        const newDate = new Date();
        const orderTime = `${newDate.getTime()}-${newDate.getDate()}-${newDate.getDay()}-${newDate.getFullYear()}`;
        if (sessionStorage.getItem("uploadFile")) {
            sessionStorage.removeItem("uploadCardsData");
        }
        this.checkoutData = JSON.stringify(sessionStorage);
        this.checkoutMail(user, orderTime);
        return this.http.put(`${this.firebaseUser}${user}/orders/${orderTime}.json`, this.checkoutData).subscribe(res => console.log(res));
    }

    checkoutMail(user: any, time: any) {
        this.http
            .post('http://beta.identitycards.co.in/send.php', {
                name: user,
                msg: time
            })
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