import { Component, OnInit } from '@angular/core';
// import { User } from '../model/signupinfo';
// import { Hospital } from '../model/signupinfo';
// import { Organization } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{
  // allusers: User[] = [];
  // allhospitals: Hospital[] = [];
  // isfetching: boolean = false;

  // onUserCreate(users: {fname: string;
  //   lname: string;
  //   ssn: number;
  //   gender: string;
  //   age: number;
  //   address: string;
  //   phone: string;
  //   email: string;
  //   city: string;
  //   bloodType: string;
  //   healthstatus: string;
  //   password: string;}){
  //   this.signupservice.createUser(users);
  // }
    // onHospitalCreate(hospitals: {hospitalName: string;
  //   address: string;
  //   phone: string;
  //   email: string;
  //   city: string;}){
  //     this.signupservice.createHospital(hospitals);
  //   }

  // onOrganizationCreate(organizations: {orgnizationName: string;
  //   address: string;
  //   phone: string;
  //   email: string;
  //   city: string;}){
  //     this.signupservice.createOrganization(organizations);
  //   }

  uDisplay:boolean =true;
  hDisplay:boolean =true;
  oDisplay:boolean =true;
  localapi: string = 'http://localhost:5000/user';

  constructor(private signupservice: signupService, private toastr: ToastrService ){}

  addUserForm =  new FormGroup({
    fname: new FormControl(null, Validators.required),
    lname: new FormControl(null, Validators.required),
    ssn: new FormControl(null,  Validators.required),
    gender: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    bloodType: new FormControl(null, Validators.required),
    healthstatus: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  addHospitalForm =  new FormGroup({
    name: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  addOrgnizationForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

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

  userSubmit(){
    console.log(this.addUserForm.value)

this.signupservice.createUser(this.addUserForm.value)
  .subscribe({
  next: (data) => {
  console.log(data)
  this.toastr.success('account created!');

  },
  error: (error) => {
    console.log(error)
  }
});
  }

  HospitalSubmit(){
    console.log(this.addHospitalForm.value)

    this.signupservice.createHospital(this.addHospitalForm.value)
      .subscribe({
      next: (data) => {
      console.log(data)
      this.toastr.success('account created!');

      },
      error: (error) => {
        console.log(error)
      }
    });
  }
  
  OrgnizationSubmit(){
    console.log(this.addOrgnizationForm.value)

    this.signupservice.createOrgnization(this.addOrgnizationForm.value)
      .subscribe({
      next: (data) => {
      console.log(data)
      this.toastr.success('account created!');

      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  onsignup() {
    this.toastr.success('account created!');
  }


}

