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

  constructor(private signupservice: signupService, private toastr: ToastrService ){}

  addUserForm =  new FormGroup({
    user_Fname: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    user_Lname: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    user_national_ID: new FormControl(null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    user_gender: new FormControl(null, Validators.required),
    user_age: new FormControl(null, Validators.required),
    user_address: new FormControl(null, Validators.required),
    user_phoneNo: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    user_Email: new FormControl(null, Validators.required),
    user_city: new FormControl(null, Validators.required),
    user_blood_type: new FormControl(null, Validators.required),
    user_health_status: new FormControl(null, Validators.required),
    user_password: new FormControl(null, Validators.required),
  })

  addHospitalForm =  new FormGroup({
    hospital_name: new FormControl(null, Validators.required),
    hospital_address: new FormControl(null, Validators.required),
    hospital_phoneNo: new FormControl(null, Validators.required),
    hospital_Email: new FormControl(null, Validators.required),
    hospital_city: new FormControl(null, Validators.required),
    hospital_password: new FormControl(null, Validators.required),
  })

  addOrgnizationForm = new FormGroup({
    organization_name: new FormControl(null, Validators.required),
    organization_city: new FormControl(null, Validators.required),
    organization_phoneNo: new FormControl(null, Validators.required),
    organization_email: new FormControl(null, Validators.required),
    organization_password: new FormControl(null, Validators.required)
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
    this.toastr.warning('check your info!');
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
        this.toastr.warning('check your info!');
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
        this.toastr.warning('check your info!');
      }
    });
  }

  // onsignup() {
  //   this.toastr.success('account created!');
  // }


}