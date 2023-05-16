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
    localStorage.clear();
  }

  getUser(){
    return this.http.get<any>(this.userAPI+'/2');
  }
  // getUser(id: any){
  //   return this.http.get<any>(`${this.userAPI}/${id}`);
  // }
  

}