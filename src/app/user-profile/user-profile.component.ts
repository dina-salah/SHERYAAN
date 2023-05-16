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
import { ActivatedRoute } from '@angular/router';

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

  constructor(private toastr: ToastrService, private http: HttpClient, private service: loginService, private updateservice: updateService, private router: ActivatedRoute){}

  ngOnInit(){ 
    this.getuser();
    this.user = JSON.parse(localStorage.getItem('userdata'));
  }

  ongetuser(){
    this.getuser;
  }

    dataFromLocalStorage = JSON.parse(localStorage.getItem('userdata'));
    
    addUserForm =  new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      ssn: new FormControl('',  Validators.required),
      age: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      bloodType: new FormControl('', Validators.required),
      healthstatus: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
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
      
      updateuser(userdata: any){
        this.updateservice.updateuser(userdata).subscribe((res) => {console.log(res);})
      }
      
      updatedata(){

      }
}

