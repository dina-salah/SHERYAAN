import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import {ToastrService} from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.css']
})
export class HospitalProfileComponent {

  displays:boolean = false;
  displayd:boolean = true;

  showform(){
    this.displays = true;
    this.displayd = false;
  }
  showinfo(){
    this.displays = false;
    this.displayd = true;

    this.toastr.success('profile updated successfully!');
  }

  


  constructor(private toastr: ToastrService, private http: HttpClient){}



    hospital: {
    id: string;  
    name: string;
    address: string;
    phone: string;
    email: string;
    city: string;
    password: string
    }

    addHospitalForm =  new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
    ngOnInit(): void {

    }
    
  
   

    onDelete(id:any){
      id = this.hospital.id
      this.http.delete('')
    }

}
