import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Stock } from '../model/hospitalstock';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  
  export class stockService{

    constructor(private http: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    errorHandler(error:any) {
        let errorMessage = 'error';
        if(error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      }
  
      fetch(id:number): Observable<any> {
    
        return this.http.get('http://localhost:1000/hospital-stock/' + id)
      
        .pipe(
          catchError(this.errorHandler)
        )
      }

      updatestock(id:number, stock:Stock): Observable<any> {
  
        return this.http.put('http://localhost:1000/hospital-stock/' + id, JSON.stringify(stock), this.httpOptions)
     
        .pipe( 
          catchError(this.errorHandler)
        )
      }

      getAll(): Observable<any> {
  
        return this.http.get('http://localhost:1000/all-hospitals-stock')
      
        .pipe(
          catchError(this.errorHandler)
        )
      }

      delete(id:number){
        return this.http.delete('http://localhost:1000/hospital-stock' + id, this.httpOptions)
      
        .pipe(
          catchError(this.errorHandler)
        )
      }


  }