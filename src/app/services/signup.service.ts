import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs';
import { User } from "../model/signupinfo";
import { Hospital } from "../model/signupinfo";
import { Organization } from "../model/signupinfo";
import { Observable } from 'rxjs';

@Injectable({providedIn: "root"})
export class signupService{
  endpoint: string = 'http://localhost:5000/user';
    constructor(private http: HttpClient){}

    headers = new HttpHeaders({'Content-Type' : 'application/json'});

    addUserData(myData: any): Observable<any> {
      return this.http.post<any>(this.endpoint, myData, {headers: this.headers});
    }

    //create product in database
    createUser(users: User){
        console.log(users);
   
    this.http.post(
    'http://localhost:5000/user', users, {headers: this.headers})
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
  'http://localhost:5000', hospitals, {headers: headers})
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
'http://localhost:5000', organizations, {headers: headers})
.subscribe((res) => {
  console.log(res);
});
}

}