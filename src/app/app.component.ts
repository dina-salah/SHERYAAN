import { Component, OnInit } from '@angular/core';
import { addRequestService } from './services/addRequest.service';
import { loginService } from './services/login.service';
import {Router} from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import { loginHospitalService } from './services/loginHospital.service';
import { loginOrgService } from './services/loginOrg.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[addRequestService]
})
export class AppComponent implements OnInit{
  title = 'SHERYAAN | شريان';


  constructor(public service: loginService, 
    private router: Router,
    private hospitalservice: loginHospitalService,
    private orgservice: loginOrgService){}

  isLoggedIn$: Observable<boolean>; 
  isLoggedInHospital: Observable<boolean>; 
  isLoggedInOrg: Observable<boolean>; 

  ngOnInit() {
    this.isLoggedIn$ = this.service.isLoggedIn;
    this.isLoggedInHospital =this.hospitalservice.isLoggedIn;
    this.isLoggedInOrg =this.orgservice.isLoggedIn;


  };

  
  onLogout() {
    this.service.logout();                      
  };


  // displayFunc(displayBar:boolean){
  //   // if (displayBar == false) {
  //   //     displayBar = true;
  //   // }else{
  //   //     displayBar=false;
  //   // }
  //   return this.display =displayBar;
  // }

  
}
