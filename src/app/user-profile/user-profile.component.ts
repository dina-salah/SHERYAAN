import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  
  displays:boolean=false;
  displayd:boolean=true;

  constructor(private toastr: ToastrService, private http: HttpClient){}

  user:  {fname: string;
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
    password: string}

    addUserForm =  new FormGroup({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      ssn: new FormControl(null,  Validators.required),
      age: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      bloodType: new FormControl(null, Validators.required),
      healthstatus: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  
  
    showform(){
      this.displays = true;
      this.displayd = false;
    }
    showinfo(){
      this.displays = false;
      this.displayd = true;

      this.toastr.success('profile updated successfully!');
    }

    onDelete(id:any){
      id = this.user.ssn
      this.http.delete('')
    }
}
