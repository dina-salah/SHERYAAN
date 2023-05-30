import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const userurl = 'http://localhost:5000/user';
const orgurl = 'http://localhost:8000/org'
const hospitalurl = 'http://localhost:7000/hospital';


@Injectable({
    providedIn: 'root'
  })
  
  export class deleteService{

    constructor(private http: HttpClient){}

    delete(id){
        return this.http.delete<any>(`${userurl}/${id}`);
    }
    
    deleteorg(id){
      return this.http.delete<any>(`${orgurl}/${id}`);
  }
  deletehospital(id){
    return this.http.delete<any>(`${hospitalurl}/${id}`);
}
  }