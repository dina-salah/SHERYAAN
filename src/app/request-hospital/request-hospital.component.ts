import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-request-hospital',
  templateUrl: './request-hospital.component.html',
  styleUrls: ['./request-hospital.component.css']
})
export class RequestHospitalComponent implements OnInit {
  donate:boolean =false;

  requests?: reqAdd[];
  id!: any;

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this.fetch();
    this.requests = JSON.parse(localStorage.getItem('reqdata'));
  }

  fetch(){
    this.service.retriveAllReq().subscribe((res) => {
      this.requests = res.data;
      const reqdata = res.data;
      if (reqdata) {
        localStorage.setItem('reqdata', JSON.stringify(reqdata));
      }
      console.log(this.requests);
  });

  }

  // fuc. to hide user when click on donate
  showreq(){
    this.donate=true
  }


}
