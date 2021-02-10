import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GlobalService {
    checkoutData: any[] = [];
    constructor(private http: HttpClient) { }

    checkout(finalCart: any, subTotal: any) {
        this.checkoutData.push({ finalCartItems: finalCart }, { subTotal: subTotal });
        console.log(this.checkoutData);
    }
    getUsers() {
        return this.http.get('https://identitycards-users.firebaseio.com/users.json')
    }

    getUser(user: string) {
        return this.http.get(`https://identitycards-users.firebaseio.com/users/${user}.json`)
    }

    getAddress(user: string) {
        return this.http.get(`https://identitycards-users.firebaseio.com/users/${user}/addressItems.json`);
    }

    addAddress(user: string, adderss: any) {
        return this.http.post(`https://identitycards-users.firebaseio.com/users/${user}/addressItems`, adderss).subscribe(res => console.log(res));
    }

    updateAddress(user: string, id: any, adderss: any) {
        return this.http.put(`https://identitycards-users.firebaseio.com/users/${user}/addressItems/${id}`, adderss).subscribe(res => console.log(res));
    }
    deleteAddress(user: string, adderss: any) {
        return this.http.put(`https://identitycards-users.firebaseio.com/users/${user}/addressItems`, adderss).subscribe(res => console.log(res));
    }

}