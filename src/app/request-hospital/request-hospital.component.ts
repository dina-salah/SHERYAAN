import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blood } from '../model/hospitalstock';
import {Hospital} from '../model/signupinfo'

@Component({
  selector: 'app-request-hospital',
  templateUrl: './request-hospital.component.html',
  styleUrls: ['./request-hospital.component.css']
})
export class RequestHospitalComponent implements OnInit {
  displayCityFilter:boolean =true;
  displayBloodFilter:boolean =true;
  displayHospitalFilter:boolean =true;
  id:any;
  patients?: reqAdd[];
  blood: Blood[];
  bloodfilter: Blood[]
  hospitalfilter: Hospital[]

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
  this.id = this.route.snapshot.params['hospital_id'];
  this. fetch();

  this.service.gethospital()
  .subscribe((res) => {
    this.hospitalfilter= res.data;
    console.log(res.data);
  })

  this.service.getblood()
  .subscribe((res) => {
    this.bloodfilter= res.data;
    this.blood = res.data;
    console.log(res.data);
  })
  }

  bloodform = new FormGroup({
    blood_id:new FormControl(null, Validators.required),
  });
  
  hospitalform = new FormGroup({
    hospital_name:new FormControl(null, Validators.required)
  });

  Filters = new FormGroup({
    filterC :new FormControl(null, Validators.required),
    filterB :new FormControl(null, Validators.required),
    filterH :new FormControl(null, Validators.required),
  });

  private fetch(){

    this.service.retriveAllReq()
    .subscribe({
     next: (res)=>{
      this.patients = res.data;
      console.log(this.patients);
      },error:(error)=>{
        console.log(error)
      }
    })   
  }
//display filter
displayBloodfilter(){
  this.displayCityFilter=true;
  this.displayBloodFilter =false;
  this.displayHospitalFilter=true;
}
displayCityfilter(){
  this.displayCityFilter=false;
  this.displayBloodFilter =true;
  this.displayHospitalFilter=true;
} 

displayHositalfilter(){
  this.displayCityFilter=true;
  this.displayBloodFilter =true;
  this.displayHospitalFilter=false;
} 


//filter func  
  filteredReqByBlood(id:any){
    this.service.filterblood(id.blood_id)
    .subscribe({
      next: (res)=>{
        this.patients = res.data;
        },error:(error)=>{
          console.log(error)
        }
    })
  }

  filteredReqByHospital(id:any){
    console.log(id.hospital_id)
    this.service.filterhospital(id.hospital_id)
    .subscribe({
      next: (res)=>{
        this.patients = res.data;
        },error:(error)=>{
          console.log(error)
        }
    })
  }





}
