import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../services/signup.service';
import { loginService } from '../services/login.service';
import { updateService } from '../services/update.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  
  displays:boolean=false;
  displayd:boolean=true;
  isfetching: boolean = false;
  errormessage: string = "error!";  
  user?: User[];
  dataFromLocalStorage?: any;

  constructor(private toastr: ToastrService, private http: HttpClient, private service: loginService, private updateservice: updateService){}

  ngOnInit(){ 
    this.getuser();
    this.user = JSON.parse(localStorage.getItem('userdata'));
  }

  ongetuser(){
    this.getuser;
  }

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

    getuser(){
      this.isfetching = true;
      this.service.getUser().subscribe((res) => {
          this.user = res;
          const userdata = res.data;
          if (userdata) {
            localStorage.setItem('userdata', JSON.stringify(userdata));
          }
          console.log(res);
          this.isfetching = false;
      });
        }     
      
      updateuser(id: any){
        id = JSON.parse(localStorage.getItem('user_national_ID'))
        this.updateservice.updateuser(id, this.user)
      }

}

