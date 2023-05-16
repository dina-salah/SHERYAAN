import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/signupinfo';


@Injectable({
    providedIn: 'root'
  })
  
  export class updateService{

    userurl = 'http://localhost:5000/user/';


    constructor(private http: HttpClient){}

    // updateuser(user: any){
    //     return this.http.patch<any>(`${this.userurl}/${user.user_id}`, user);
    // }
    updateuser(user: any){
      return this.http.put<any>(this.userurl+'2', user);
  }

    updatehospital(){}

    updateorg(){}
  }