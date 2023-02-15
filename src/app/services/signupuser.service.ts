import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs';
import { User } from "../model/user";

@Injectable({providedIn: "root"})
export class signupuserService{
    constructor(private http: HttpClient){}

    //create product in database
    createUser(users: {fname: string;
        lname: string;
        ssn: string;
        gender: string;
        age: string;
        address: string;
        phone: string;
        email: string;
        city: string;
        bloodType: string;
        healthstatus: string;
        password: string;}){
        console.log(users);
    const headers = new HttpHeaders({'myheader' : 'sheryaan'});
    this.http.post(
    'https://angularlearning-b3938-default-rtdb.firebaseio.com/users.json', users, {headers: headers})
    .subscribe((res) => {
      console.log(res);
    });
    }

}