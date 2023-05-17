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

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    constructor(private http: HttpClient){}

    errorHandler(error:any) {
      let errorMessage = 'error';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
    }

    find(id:number): Observable<any> {
  
      return this.http.get(this.userurl + id)
    
      .pipe(
        catchError(this.errorHandler)
      )
    }

    updateuser(id:number, user:User): Observable<any> {
  
      return this.http.put(this.userurl + id, JSON.stringify(user), this.httpOptions)
   
      .pipe( 
        catchError(this.errorHandler)
      )
    }

    updatehospital(){}

    updateorg(){}
  }