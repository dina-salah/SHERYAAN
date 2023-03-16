import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs';
import { User } from "../model/signupinfo";
import { Hospital } from "../model/signupinfo";
import { Organization } from "../model/signupinfo";

@Injectable({providedIn: "root"})
export class signupService{
    constructor(private http: HttpClient){}

    //create product in database
    createUser(users: User){
        console.log(users);
    const headers = new HttpHeaders({'myheader' : 'sheryaan'});
    this.http.post(
    'http://localhost:5000/user', users, {headers: headers})
    .subscribe((res) => {
      console.log(res);
    });
    }

    createHospital(hospitals: {hospitalName: string;
      address: string;
      phone: string;
      email: string;
      city: string;}){
      console.log(hospitals);
  const headers = new HttpHeaders({'myheader' : 'sheryaan'});
  this.http.post(
  'https://angularlearning-b3938-default-rtdb.firebaseio.com/hospitals.json', hospitals, {headers: headers})
  .subscribe((res) => {
    console.log(res);
  });
  }

  createOrganization(organizations: {orgnizationName: string;
    address: string;
    phone: string;
    email: string;
    city: string;}){
    console.log(organizations);
const headers = new HttpHeaders({'myheader' : 'sheryaan'});
this.http.post(
'https://angularlearning-b3938-default-rtdb.firebaseio.com/organizations.json', organizations, {headers: headers})
.subscribe((res) => {
  console.log(res);
});
}

}