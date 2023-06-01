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

    constructor(private http: HttpClient, private router: Router){}
    
    
retriveAllReq(){
    return this.http.get<any>(`${requestAPI}/all-requests`)
}


// patient =[ {receiver: 'patient', pname:'dina', date:'02/12/2020',bloodtype:'O' ,quantity:9,pcase:'surgery',address:'MUST' }]

    // addR(receiver:string, pname:string, date:any ,bloodtype:string ,quantity:number,pcase:string,address:string) {
    // this.patient.push({receiver:receiver, pname:pname, date:date, bloodtype:bloodtype, quantity:quantity, pcase:pcase, address:address});
    // }
}