import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Stock } from '../model/hospitalstock';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class EventService{

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

      allevents(): Observable<any>{
        return this.http.get('http://localhost:8000/events')
        .pipe(
            catchError(this.errorHandler)
          )
      }

      myevent(id: any): Observable<any>{
        return this.http.get('http://localhost:8000/event/' + id)
        .pipe(
            catchError(this.errorHandler)
          )
      }

      newevent(data: any): Observable<any>{
        return this.http.post('http://localhost:8000/org' , data)
        .pipe(
            catchError(this.errorHandler)
          )
      }

      updateevent(data: any): Observable<any>{
        return this.http.put('http://localhost:8000/event' , data)
        .pipe(
            catchError(this.errorHandler)
          )
      }

      closeevent(id: any): Observable<any>{
        return this.http.put('http://localhost:8000/event-closed', id)
        .pipe(
            catchError(this.errorHandler)
          )
      }

      delete(id: any): Observable<any>{
        return this.http.delete('http://localhost:8000/org/' + id)
        .pipe(
            catchError(this.errorHandler)
          )
      }

      

}