import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/signupinfo';

@Injectable({
  providedIn: 'root'
})

export class loginService{

  API: string = 'http://localhost:5000';
  userAPI: string        ='http://localhost:5000/user/';
  hospitalAPI:string     ='http://localhost:7000/hospital'; 
  orgnizationAPI:string  ='http://localhost:8000/org';

  constructor(private http: HttpClient, private router: Router){}

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  userlogin(userlogindata: any){
    return this.http.post<any>('http://localhost:5000/login', userlogindata);
  }


  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('userdata');
    localStorage.removeItem('user_id')
    this.router.navigate(['/sign-in']);
  }

  getUser(id: number): Observable<any>{
    return this.http.get<any>(this.userAPI+ id)
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