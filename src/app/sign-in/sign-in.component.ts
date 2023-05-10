import { Component, OnInit, Output,EventEmitter  } from '@angular/core';
import { signupService } from '../services/signup.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { loginService } from '../services/login.service';
import { loginHospitalService } from '../services/loginHospital.service';
import { loginOrgService } from '../services/loginOrg.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{
  
  
  constructor(private http: HttpClient, 
    private builder: FormBuilder,
    private service: loginService, 
    private toastr: ToastrService,
    private router: Router,
    private hospitalservice: loginHospitalService,
    private orgservice: loginOrgService){}

  uDisplay:boolean =true;
  hDisplay:boolean =true;
  oDisplay:boolean =true;
  aDisplay:boolean =true;
  userdata: any;

  hospitalDisplay(){
    this.hDisplay =false
    this.uDisplay=true 
    this.oDisplay =true
    this.aDisplay =true
  }

  userDisplay(){
    this.uDisplay=false
    this.hDisplay =true 
    this.oDisplay =true
    this.aDisplay =true
  }
  
  orgnizationDisplay(){
    this.oDisplay =false
    this.uDisplay=true
    this.hDisplay =true 
    this.aDisplay =true
  }
  adminDisplay(){
    this.aDisplay =false
    this.uDisplay=true
    this.hDisplay =true 
    this.oDisplay =true
  }
    
  userloginform=this.builder.group({
    user_national_ID: this.builder.control('', Validators.required),
    user_password: this.builder.control('', Validators.required)
  })

    hospitalloginform=this.builder.group({
    hospital_Email: this.builder.control('', Validators.required),
    hospital_password: this.builder.control('', Validators.required)
  })

  orgloginform=this.builder.group({
    organization_email: this.builder.control('', Validators.required),
    organization_password: this.builder.control('', Validators.required)
  })

  adminloginform=this.builder.group({
    admin_email: this.builder.control('', Validators.required),
    admin_password: this.builder.control('', Validators.required)
  })

  navigateToLogin() {
    this.router.navigateByUrl('/');
}

  //user  
  proceedloginuser(){
    console.log(this.userloginform.value)

  this.service.userlogin(this.userloginform.value)
  .subscribe({
  next: (data) => {
  console.log(data)
  this.navigateToLogin();
  this.service.loggedIn.next(true);
  this.toastr.success('logged in successfully!');
 }, 
  error: (error) => {
    console.log(error)
    this.toastr.warning('check your password!');

  }
  });
  }
  
  //hospital  
  proceedloginhospital(){
    console.log(this.hospitalloginform.value)

  this.hospitalservice.hospitallogin(this.hospitalloginform.value)
  .subscribe({
  next: (data) => {
  console.log(data)
  this.navigateToLogin();
  this.hospitalservice.loggedIn.next(true);
  this.toastr.success('logged in successfully!');

  },
  error: (error) => {
    console.log(error)
    this.toastr.warning('check your password!');
  }
  });
  }

  //orgnization
  proceedloginorg(){
    console.log(this.orgloginform.value)

  this.orgservice.orglogin(this.orgloginform.value)
  .subscribe({
  next: (data) => {
  console.log(data)
  this.navigateToLogin();
  this.orgservice.loggedIn.next(true);
  this.toastr.success('logged in successfully!');

  },
  error: (error) => {
    console.log(error)
    this.toastr.warning('check your password!');
  }
  });
  }
  

}


