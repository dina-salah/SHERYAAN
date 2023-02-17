import { Component, OnInit } from '@angular/core';
import { User } from '../model/signupinfo';
import { Hospital } from '../model/signupinfo';
import { Organization } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{
  allusers: User[] = [];
  allhospitals: Hospital[] = [];
  // isfetching: boolean = false;

  uDisplay:boolean =true;
  hDisplay:boolean =true;
  oDisplay:boolean =true;

  constructor(private signupservice: signupService, private toastr: ToastrService){}


  onUserCreate(users: {fname: string;
    lname: string;
    ssn: string;
    gender: string;
    age: string;
    address: string;
    phone: string;
    email: string;
    city: string;
    bloodType: string;
    healthstatus: string;
    password: string;}){
    this.signupservice.createUser(users);
  }

  onHospitalCreate(hospitals: {hospitalName: string;
    address: string;
    phone: string;
    email: string;
    city: string;}){
      this.signupservice.createHospital(hospitals);
    }

  onOrganizationCreate(organizations: {orgnizationName: string;
    address: string;
    phone: string;
    email: string;
    city: string;}){
      this.signupservice.createOrganization(organizations);
    }

  hospitalDisplay(){
    this.hDisplay =false
    this.uDisplay=true 
    this.oDisplay =true
  }

  userDisplay(){
    this.uDisplay=false
    this.hDisplay =true 
    this.oDisplay =true
  }
  
  orgnizationDisplay(){
    this.oDisplay =false
    this.uDisplay=true
    this.hDisplay =true 
  }

  userSubmit(signup:any){
console.log('account is created', signup)
  }

  onsignup() {
    this.toastr.success('account created!');
  }


}
