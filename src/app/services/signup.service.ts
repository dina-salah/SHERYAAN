
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class signupService{

  API: string = 'http://localhost:5000';
  userAPI: string        ='http://localhost:5000/user';
  hospitalAPI:string     ='http://localhost:7000/hospital'; 
  orgnizationAPI:string  ='http://localhost:8000/org';
    constructor(private http: HttpClient){}

      createUser(userdata:any): Observable<any>{
        return this.http.post<any>(this.userAPI, userdata);
      }
      createHospital(Hospitaldata:any): Observable<any>{
        return this.http.post<any>(this.hospitalAPI, Hospitaldata);
      }
      createOrgnization(Orgnizationdata:any): Observable<any>{
        return this.http.post<any>(this.orgnizationAPI, Orgnizationdata);
      }

      userlogin(userlogindata: any){
        return this.http.post<any>('http://localhost:5000/login', userlogindata);
      }
      hospitallogin(hospitllogindata: any){
        return this.http.post<any>('http://localhost:7000/login', hospitllogindata);
      }
      orglogin(orglogindata: any){
        return this.http.post<any>('http://localhost:8000/login', orglogindata);
      }
      
    
      IsloggedInUser(){
        return sessionStorage.getItem('email')!=null;
      }
      GetUserRole(){
        return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
      }
      GetUserbyId(id:any){
        return this.http.get(this.API+'/user/:'+id);
      }
      GetallUsers(){
        return this.http.get(this.API + '/users');
      }
      
      updateuser(id:any,inputdata:any){
        return this.http.put(this.API+'/:'+id,inputdata);
      }
  




// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { map } from 'rxjs';
// import { User } from "../model/signupinfo";
// import { Hospital } from "../model/signupinfo";
// import { Organization } from "../model/signupinfo";

// @Injectable({providedIn: "root"})
// export class signupService{
//     constructor(private http: HttpClient){}

//     //create product in database
//     createUser(users: User){
//         console.log(users);
//     const headers = new HttpHeaders({'myheader' : 'sheryaan'});
//     this.http.post(
//     'http://localhost:5000/user', users, {headers: headers})
//     .subscribe((res) => {
//       console.log(res);
//     });
//     }

//     createHospital(hospitals: {hospitalName: string;
//       address: string;
//       phone: string;
//       email: string;
//       city: string;}){
//       console.log(hospitals);
//   const headers = new HttpHeaders({'myheader' : 'sheryaan'});
//   this.http.post(
//   'https://angularlearning-b3938-default-rtdb.firebaseio.com/hospitals.json', hospitals, {headers: headers})
//   .subscribe((res) => {
//     console.log(res);
//   });
//   }

//   createOrganization(organizations: {orgnizationName: string;
//     address: string;
//     phone: string;
//     email: string;
//     city: string;}){
//     console.log(organizations);
// const headers = new HttpHeaders({'myheader' : 'sheryaan'});
// this.http.post(
// 'https://angularlearning-b3938-default-rtdb.firebaseio.com/organizations.json', organizations, {headers: headers})
// .subscribe((res) => {
//   console.log(res);
// });
// }

// }



// import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { map, catchError } from 'rxjs/operators';
// import { User } from "../model/signupinfo";
// import { Hospital } from "../model/signupinfo";
// import { Organization } from "../model/signupinfo";
// import {Observable , throwError} from "rxjs";

        


          // createUser(users: 
          //   {fname: string;
          //   lname: string;
          //   ssn: number;
          //   gender: string;
          //   age: number;
          //   address: string;
          //   phone: string;
          //   email: string;
          //   city: string;
          //   bloodType: string;
          //   healthstatus: string;
          //   password: string;}
          //   ){
            
          //       console.log(users);
          //       let headers = new HttpHeaders().set('Content-Type','application/json');

          //       this.http.post(
          //       'http://localhost:5000/user', users, {headers: headers})
          //       .subscribe((res) => {
          //         console.log(res);
          //       });
          //       }
            
        
//     createUser(users: User) : Observable<any>{
//       console.log(users)
//               // let API_URL= '${this.REST_API/user}';

//               return this.http.post('http://localhost:5000/user',users ,{ headers :this.httpHeader })
//               .pipe(catchError(this.handleError))
              

// }

// handleError(error: HttpErrorResponse){
//   let errorMessage ='';
//   if(error.error instanceof ErrorEvent){
//   errorMessage = error.error.message

//   }else{
//     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//   }

//     console.log(errorMessage)
//     return throwError(errorMessage);
// }


//     createHospital(hospitals: {hospitalName: string;
//       address: string;
//       phone: string;
//       email: string;
//       city: string;}){
//       console.log(hospitals);
//   const headers = new HttpHeaders({'myheader' : 'sheryaan'});
//   this.http.post(
//   'https://angularlearning-b3938-default-rtdb.firebaseio.com/hospitals.json', hospitals, {headers: headers})
//   .subscribe((res) => {
//     console.log(res);
//   });
//   }

//   createOrganization(organizations: {orgnizationName: string;
//     address: string;
//     phone: string;
//     email: string;
//     city: string;}){
//     console.log(organizations);
// const headers = new HttpHeaders({'myheader' : 'sheryaan'});
// this.http.post(
// 'https://angularlearning-b3938-default-rtdb.firebaseio.com/organizations.json', organizations, {headers: headers})
// .subscribe((res) => {
//   console.log(res);
// });
// }
}