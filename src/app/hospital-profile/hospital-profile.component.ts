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
    hospitral_name: new FormControl('', Validators.required),
    hospitral_address: new FormControl('', Validators.required),
    hospitral_PhoneNo: new FormControl('', Validators.required),
    hospitral_Email: new FormControl('', Validators.required),
    hospitral_city: new FormControl('', Validators.required),
    hospitral_password: new FormControl('', Validators.required),
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

  gethospital(){
    this.isfetching = true;
    this.service.getHospital(this.id).subscribe((res) => {
        this.hospital = res;
        const hospitaldata = res.data;
        if (hospitaldata) {
          localStorage.setItem('hospitaldata', JSON.stringify(hospitaldata));
        }
        console.log(res);
        this.isfetching = false;

    });
      }   
  
   

    // onDelete(id:any){
    //   id = this.hospital.hospital_id
    //   this.http.delete('')
    // }

}
