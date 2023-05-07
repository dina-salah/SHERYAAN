import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class search{

private url:string='http://localhost:1000/stocksearch/';

constructor(private http:HttpClient){

}

getStock(name:any): Observable<any>{
    return this.http.get<any>(`${this.url}${name}`);
}

}