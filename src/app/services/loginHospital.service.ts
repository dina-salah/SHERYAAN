import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/signupinfo';

@Injectable({
  providedIn: 'root'
})

export class loginHospitalService{

  hospitalAPI:string     ='http://localhost:7000/hospital/'; 

  constructor(private http: HttpClient, private router: Router){}

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  hospitallogin(hospitllogindata: any){
    return this.http.post<any>('http://localhost:7000/login', hospitllogindata);
  }


  logout() {
    this.loggedIn.next(false);
    // localStorage.removeItem('hospitaldata');
    // localStorage.removeItem('stockdata');
    // localStorage.removeItem('hospital_id');
    // localStorage.removeItem('reqdata');
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  getHospital(id: number): Observable<any>{
    return this.http.get<any>(this.hospitalAPI + id)
    .pipe(
      catchError(this.errorHandler)
    )
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
  

}