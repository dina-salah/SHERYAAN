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
  status?: any;
  response?: Response[];
  hospital: Hospital[];
  req_id = {request_id: ''};
  addpoints = {response_id: '', responding_user: '', hospital_id: 0};
  response_id ={response_id: ''};
  quantitydata = {req_id: '', don_quantity: ''};
  hide: boolean = false;

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));
    this.id = this.route.snapshot.params['hospital_id'];
    this.fetch();
    
  }

  form = new FormGroup({
    don_quantity: new FormControl('', Validators.required),
  })

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
    this.addpoints.hospital_id = parseInt(this.id);
    this.addpoints.response_id = r.response_id;
    this.addpoints.responding_user = r.responding_user;
    this.response_id.response_id =r.response_id;
    console.log(this.addpoints)

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

    this.quantitydata.req_id = r.request_id;
    this.quantitydata.don_quantity = this.form.value.don_quantity;
    console.log(this.quantitydata);
    this.service.updatequantity(this.quantitydata).subscribe((res) => {
      console.log(res);
    })
    //window.location.reload();
    r.isEditing = false;
    
  }

  editItem(item : any) {
    item.isEditing = !item.isEditing;
   // console.log(item);
  }

  change(r: any){
    this.hide = true;
  }

  onclose(){
    window.location.reload();
  }

  // quantity(r: any){
  //   this.quantitydata.request_id = r.request_id;
  //   this.quantitydata.don_quantity = r.request_quantity;
  //   console.log(this.quantitydata);
  //   this.service.updatequantity(this.quantitydata).subscribe((res) => {
  //     console.log(res);
  //     r.isEditing = false;
  //   })
  // }

}
