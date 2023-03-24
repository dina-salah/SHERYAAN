import { Component, OnInit } from '@angular/core';
import { signupService } from '../services/signup.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  
  constructor(private builder: FormBuilder, private service: signupService, private toastr: ToastrService,
    private router: Router){}

  userdata: any;
    
  loginform=this.builder.group({
    ssn: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedlogin(){
    if(this.loginform.valid){
      this.service.GetUserbyId(this.loginform.value.ssn).subscribe(res => {
        this.userdata = res;
        console.log(this.userdata);
        if(this.userdata.password === this.loginform.value.password){
          sessionStorage.setItem('ssn', this.userdata.id);
          sessionStorage.setItem('userrole', this.userdata.role);
          this.router.navigate(['logged-in-bar']);
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    }
  }

}


