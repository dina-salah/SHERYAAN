import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/signupinfo';

@Injectable({
  providedIn: 'root'
})

export class loginService{

  API: string = 'http://localhost:5000';
  userAPI: string        ='http://localhost:5000/user';
  hospitalAPI:string     ='http://localhost:7000/hospital'; 
  orgnizationAPI:string  ='http://localhost:8000/org';

  constructor(private http: HttpClient, private router: Router){}

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
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

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/sign-in']);
  }

 
  getUser(){
    return this.http.get<any>('http://localhost:5000/user/12');
}
  
  // IsloggedInUser(){
  //   return sessionStorage.getItem('user_national_ID')!=null;
  // }
//   GetUserRole(){
//     return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
//   }
//   GetUserbyId(id:any){
//     return this.http.get(this.API+'/user/:'+id);
//   }
//   GetallUsers(){
//     return this.http.get(this.API + '/users');
//   }

// getUser(){
//     return this.http.get<{[key: string]: {user_id, user_Fname,
//       user_Lname,
//       user_national_ID,
//       user_gender,
//       user_age,
//       user_address,
//       user_phoneNo,
//       user_Email,
//       user_city,
//       user_blood_type,
//       user_health_status,
//       user_password }; }>(
//       this.API+'/user/:'
//     ).pipe(map((res) =>{
//       const user = [];
//       for(const key in res){
//         if(res.hasOwnProperty(key)){
//           user.push({...res[key], id: key})
//         }
//       }
//       return user;
//     }), catchError((err) =>{
//       //write the logic for logging error
//       return throwError(err);
//     }))
// }


}