import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blood } from '../model/hospitalstock';
import {Hospital} from '../model/signupinfo';

@Component({
  selector: 'app-patient-requests',
  templateUrl: './patient-requests.component.html',
  styleUrls: ['./patient-requests.component.css']
})
export class PatientRequestsComponent implements OnInit{
  id!: any;
  hospital?: Hospital[];
  req: reqAdd[];
  res_count: any[];

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this.fetch();
  }

  fetch(){
    
    this.service.filterhospital(this.id)
    .subscribe({
      next: (res)=>{
        this.req = res.data;
        // console.log(this.req);
        },error:(error)=>{
          console.log(error)
        }
    })
  }

  rescount(r: any){
    this.service.countresponses(r)
    .subscribe((r: any) => {
      // console.log(r);
      console.log('hiiii')
    })
  }

}
