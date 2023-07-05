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
export class SignUpComponent implements OnInit{
  uDisplay:boolean =true;
  hDisplay:boolean =true;
  oDisplay:boolean =true;
  cityForHospital: any = [];
  cityForOrg : any = [];
  cityForUser : any = [];

  constructor(private signupservice: signupService, private toastr: ToastrService ){}

  ngOnInit(): void {
    this.getcitiesorg();
    this.getcitiesHospital();
    this.getcitiesUser();
  }
 
  addUserForm =  new FormGroup({
    user_Fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    user_Lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    user_national_ID: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    user_gender: new FormControl('', Validators.required),
    user_age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(60), Validators.pattern('^[0-9]+$')]),
    user_address: new FormControl('', Validators.required),
    user_phoneNo: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    user_Email: new FormControl('', Validators.required),
    location_code: new FormControl('', Validators.required),
    user_blood_type: new FormControl('', Validators.required),
    user_health_status: new FormControl('', Validators.required),
    user_password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+.{7,32}$$')]),
  })


get user_password() {
  return this.addUserForm.get('user_password');
}

get user_age() {
  return this.addUserForm.get('user_age');
}

get user_national_ID() {
  return this.addUserForm.get('user_national_ID');
}

  addHospitalForm =  new FormGroup({
    hospital_name: new FormControl('', Validators.required),
    hospital_address: new FormControl('', Validators.required),
    hospital_phoneNo: new FormControl('', Validators.required),
    hospital_Email: new FormControl('', Validators.required),
    location_code: new FormControl('', Validators.required),
    hospital_password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+.{7,32}$$')]),
  })

  get hospital_password() {
    return this.addHospitalForm.get('hospital_password');
  }


  addOrgnizationForm = new FormGroup({
    organization_name: new FormControl('', Validators.required),
    orgaization_city: new FormControl('', Validators.required),
    organization_address: new FormControl('', Validators.required),
    organization_phoneNo: new FormControl('', Validators.required),
    organization_email: new FormControl('', Validators.required),
    organization_password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+.{7,32}$$')]),
  })

  get organization_password() {
    return this.addOrgnizationForm.get('organization_password');
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


  userSubmit(){

    console.log(this.addUserForm.value)

    if(this.addUserForm.valid){
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
    else{
      this.addUserForm.markAllAsTouched();
      this.toastr.warning('check your info!');
    }

  }

  HospitalSubmit(){
    console.log(this.addHospitalForm.value)

    if(this.addHospitalForm.valid){
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
    });}
    else{
      this.addHospitalForm.markAllAsTouched();
      this.toastr.warning('check your info!');
    }
  }
  
  OrgnizationSubmit(){
    console.log(this.addOrgnizationForm.value)

    if(this.addOrgnizationForm.valid){
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
    });}
    else{
      this.addOrgnizationForm.markAllAsTouched();
      this.toastr.warning('check your info!');
    }

  }

  getcitiesorg(){
    this.signupservice.getcities()
    .subscribe((res) => {
      console.log(res);
      this.cityForOrg = res.data;
    })
  }
  getcitiesUser(){
    this.signupservice.getcitiesUser()
    .subscribe((res) => {
      console.log(res);
      this.cityForUser = res.data;
    })
  }
  getcitiesHospital(){
    this.signupservice.getcitiesHospital()
    .subscribe((res) => {
      console.log(res);
      this.cityForHospital = res.data;
    })
  }

}