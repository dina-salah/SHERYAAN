
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class signupService{

  API: string = 'http://localhost:5000';
  userAPI: string        ='http://localhost:5000/user';
  hospitalAPI:string     ='http://localhost:7000/hospital'; 
  orgnizationAPI:string  ='http://localhost:8000/org';
    constructor(private http: HttpClient){}

      createUser(userdata:any): Observable<any>{
        return this.http.post<any>(this.userAPI, userdata);
      }
      createHospital(Hospitaldata:any): Observable<any>{
        return this.http.post<any>(this.hospitalAPI, Hospitaldata);
      }
      createOrgnization(Orgnizationdata:any): Observable<any>{
        return this.http.post<any>(this.orgnizationAPI, Orgnizationdata);
      }
      
      updateuser(id:any,inputdata:any){
        return this.http.put(this.API+'/:'+id,inputdata);
      }
  
      getcities(): Observable<any>{
        return this.http.get('http://localhost:8000/locs');
      }
      getcitiesUser(): Observable<any>{
        return this.http.get('http://localhost:5000/locations');
      }
      getcitiesHospital(): Observable<any>{
        return this.http.get('http://localhost:7000/locations');
      }
}