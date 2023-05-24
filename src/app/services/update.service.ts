import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/signupinfo';
import { Hospital } from '../model/signupinfo';
import { Organization } from '../model/signupinfo';


@Injectable({
    providedIn: 'root'
  })
  
  export class updateService{

    userurl = 'http://localhost:5000/user/';
    hospitalurl = 'http://localhost:7000/hospital/';
    orgurl = 'http://localhost:8000/org/';

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

    findhos(id:number): Observable<any> {
  
      return this.http.get(this.hospitalurl + id)
    
      .pipe(
        catchError(this.errorHandler)
      )
    }

    updatehospital(id: number, hospital: Hospital): Observable<any> {

      return this.http.put(this.hospitalurl + id, JSON.stringify(hospital), this.httpOptions)

      .pipe( 
        catchError(this.errorHandler)
      )
    }

    findorg(id:number): Observable<any> {
  
      return this.http.get(this.orgurl + id)
    
      .pipe(
        catchError(this.errorHandler)
      )
    }

    updateorg(id: number, org: Organization): Observable<any> {

      return this.http.put(this.orgurl + id, JSON.stringify(org), this.httpOptions)
      
      .pipe( 
        catchError(this.errorHandler)
      )
    }

  }