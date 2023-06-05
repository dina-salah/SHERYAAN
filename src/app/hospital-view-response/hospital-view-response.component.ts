import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { reqAdd } from '../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Blood } from '../model/hospitalstock';
import {Hospital} from '../model/signupinfo';

@Component({
  selector: 'app-hospital-view-response',
  templateUrl: './hospital-view-response.component.html',
  styleUrls: ['./hospital-view-response.component.css']
})
export class HospitalViewResponseComponent implements OnInit{

  id!: any;
  hospital?: Hospital[];

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['hospital_id'];
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));
  }
}
