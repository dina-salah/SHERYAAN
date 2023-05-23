import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Hospital } from '../model/signupinfo';
import { signupService } from '../services/signup.service';
import {ToastrService} from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginHospitalService } from '../services/loginHospital.service';
import { updateService } from '../services/update.service';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.css']
})
export class HospitalProfileComponent implements OnInit{

  displays:boolean = false;
  displayd:boolean = true;
  isfetching: boolean = false; 
  hospital?: Hospital[];
  id!: number;

  constructor(private toastr: ToastrService,
    private service: loginHospitalService,
    private updateservice: updateService, 
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(){ 
    this.id = this.route.snapshot.params['hospital_id'];
    this.gethospital();
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));
  }
  
  addHospitalForm =  new FormGroup({
    hospital_name: new FormControl(null, Validators.required),
    hospital_address: new FormControl(null, Validators.required),
    hospital_PhoneNo: new FormControl(null, Validators.required),
    hospital_Email: new FormControl(null, Validators.required),
    hospital_city: new FormControl(null, Validators.required),
    hospital_password: new FormControl(null, Validators.required),
  })
  
  get f(){
    return this.addHospitalForm.controls;
  }

  gethospital(){
    this.isfetching = true;
    this.service.getHospital(this.id).subscribe((res) => {
        this.hospital = res;
        const hospitaldata = res.data;
        if (hospitaldata) {
          localStorage.setItem('userdata', JSON.stringify(hospitaldata));
        }
        console.log(res);
        this.isfetching = false;

    });
      }

  showform(){
    this.displays = true;
    this.displayd = false;
  }
  showinfo(){
    this.displays = false;
    this.displayd = true;

    this.toastr.success('profile updated successfully!');
  }


    
  
   
}
