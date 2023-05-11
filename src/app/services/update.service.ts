import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
  
  export class updateService{

    userurl = 'http://localhost:5000/user/';


    constructor(private http: HttpClient){}

    updateuser(id: any, data: any){
        return this.http.put<any>(this.userurl+ id, data);
    }

    updatehospital(){}

    updateorg(){}
  }