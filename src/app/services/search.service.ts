import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class search{

private url:string='';

constructor(private http:HttpClient){

}
//checkout the api and the way link written
getStock(hospitalName:string) : Observable<any>{
    return this.http.get(`${this.url}/${hospitalName}`)
}

}