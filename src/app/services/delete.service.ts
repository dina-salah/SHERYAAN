import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const userurl = 'http://localhost:5000/user/';

@Injectable({
    providedIn: 'root'
  })
  
  export class deleteService{

    constructor(private http: HttpClient){}

    delete(id){
        return this.http.delete<any>(`${userurl}/${id}`);
    }    
  }