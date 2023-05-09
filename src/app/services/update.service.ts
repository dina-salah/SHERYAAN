import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const userurl = 'http://localhost:5000/user/';

@Injectable({
    providedIn: 'root'
  })
  
  export class updateService{

    constructor(private http: HttpClient){}

    updateuser(id: any, data: any){
        return this.http.put<any>(`${userurl}/${id}`, data);
    }

    updatehospital(){}

    updateorg(){}
  }