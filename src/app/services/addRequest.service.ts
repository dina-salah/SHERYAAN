import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/signupinfo';


const requestAPI ='http://localhost:9000';

@Injectable({
providedIn: 'root'
})

export class addRequestService{

    errorHandler(error:any) {
        let errorMessage = 'error';
        if(error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      }

   
    constructor(private http: HttpClient, private router: Router){}
    
    
retriveAllReq(): Observable<any>{
    return this.http.get<any>(`${requestAPI}/all-requests`)
    .pipe(
        catchError(this.errorHandler)
      )
}

getblood(): Observable<any>{
  return this.http.get<any>(`${requestAPI}/blood-types`)
  .pipe(
    catchError(this.errorHandler)
  )
}

gethospital(): Observable<any>{
  return this.http.get<any>(`${requestAPI}/hospitals`)
  .pipe(
    catchError(this.errorHandler)
  )
}

addrequest(data: any): Observable<any>{
  return this.http.post(`${requestAPI}/add-request`, data)
  .pipe(
    catchError(this.errorHandler)
  )
}

filter(value: any): Observable<any>{
  return this.http.get(`${requestAPI}/search-requests/` + value)
  .pipe(
    catchError(this.errorHandler)
  )
}

filterblood(id: any): Observable<any>{
  return this.http.get(`${requestAPI}/filter-by-blood/` + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

filterhospital(id:any): Observable<any>{
  return this.http.get(`${requestAPI}/filter-by-hospital/` + id)
  .pipe(
    catchError(this.errorHandler)
  )
}


}