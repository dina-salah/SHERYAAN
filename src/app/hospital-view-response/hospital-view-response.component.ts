import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blood } from '../model/hospitalstock';
import {Hospital} from '../model/signupinfo';
import { Response } from '../model/request';

@Component({
  selector: 'app-hospital-view-response',
  templateUrl: './hospital-view-response.component.html',
  styleUrls: ['./hospital-view-response.component.css']
})
export class HospitalViewResponseComponent implements OnInit{

  id!: any;
  response?: Response[];
  hospital: Hospital[];
  req_id = {request_id: ''};
  addpoints = {response_id: '', user_id: '', hospital_id: ''};
  response_id ={response_id: ''}

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));
    this.id = this.route.snapshot.params['hospital_id'];
    this.fetch();
    
  }

  fetch(){
    this.service.getresponse(this.id).subscribe((res: any) => {
      this.response = res.data;
      console.log(res.data);
    })
  }

  fullfill(r: any){
    this.req_id.request_id = r;
    this.service.updateDonarStatus(this.req_id)
    .subscribe((res)=>{
      console.log(res);
      window.location.reload();
    },(error)=>{
      console.log(error)
  })

  }

  complete(r: any){
    this.addpoints.hospital_id = this.id;
    this.addpoints.response_id = r.response_id;
    this.addpoints.user_id = r.user_id;
    this.response_id.response_id =r.response_id;
    console.log(this.response_id)

    this.service.addpoints(this.addpoints)
    .subscribe((res) => {
      console.log(res);
    },(error)=>{
      console.log(error)
  })
  this.service.pendingToConfermied(this.response_id)
  .subscribe((res) => {
    console.log(res);
    window.location.reload();
  },(error)=>{
    console.log(error)
})
  }

}
