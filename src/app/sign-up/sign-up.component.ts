import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { signupuserService } from '../services/signupuser.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{
  allproducts: User[] = [];
  // isfetching: boolean = false;

  uDisplay:boolean =true;
  hDisplay:boolean =true;
  oDisplay:boolean =true;

  constructor(private userservice: signupuserService){}

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
    this.userservice.createUser(users);
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

  onsignup(){
    alert('account created!');
  }


}
