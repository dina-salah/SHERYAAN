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
// couldnt solve it
  completed(r: any){
    this.req_id.request_id = r;
    this.service.updateDonarStatus(this.req_id)
    .subscribe((res)=>{
      // this.response = res.data[0];
      console.log(res);
      // console.log(this.response)
    },(error)=>{
      console.log(error)
  })

    // console.log(data)
    // data = 1;
    // NEED FUNC TO POST VALUECHANGE IN DB
  }

}
