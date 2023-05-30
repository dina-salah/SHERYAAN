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

      updatestock(data: any): Observable<any> {
  
        return this.http.put('http://localhost:1000/hospital-stock', data)
     
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

      delete(data: any){
        return this.http.delete('http://localhost:1000/hospital-stock', data)
      
        .pipe(
          catchError(this.errorHandler)
        )
      }

      getblood(): Observable<any>{
        return this.http.get('http://localhost:1000/blood-types')
      
        .pipe(
          catchError(this.errorHandler)
        )

      }

      addstock(data: any): Observable<any>{
        return this.http.post('http://localhost:1000/add-stock', data)
        
        .pipe(
          catchError(this.errorHandler)
        )
      }


  }