import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const pointsApi = 'http://localhost:5000/user-points';

@Injectable({
    providedIn: 'root'
  })
  
  export class pointsService{

    constructor(private http: HttpClient){}

    points(id:any){
        return  this.http.get<any>(`${pointsApi}/${id}`);

    }    
  } 