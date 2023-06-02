import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { reqAdd } from '../model/request';
import { Router, ActivatedRoute } from '@angular/router';
import { Blood } from '../model/hospitalstock';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  display:boolean =true;
  donate:boolean =false;
  id:any;
  patients?: reqAdd[];
  blood: Blood[];
  bloodfilter: Blood[]

  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
  this.id = this.route.snapshot.params['user_id'];
  this. fetch();
  this.service.getblood().subscribe((res) => {
    this.bloodfilter= res.data;
    this.blood = res.data;
    console.log(res.data);
  })
  }

  bloodform = new FormGroup({
    // blood_type: new FormControl(null, Validators.required),
    blood_id:new FormControl(null, Validators.required),
  });

  private fetch(){

    this.service.retriveAllReq()
    .subscribe({
     next: (res)=>{
      
      this.patients = res.data;

      console.log(this.patients[0].blood_type)

      },error:(error)=>{
        console.log(error)
      }
    })
    
  }

  // addstock(){
  //   // this.stock.bid = this.form.value.blood_type;
  //   // this.stock.qty = this.form.value.blood_quantity;
  //   // this.stock.hid = this.id;
  //   // console.log(this.stock);
  //   // this.service.addstock(this.stock).subscribe(res => {
  //   //   console.log(res);
  //   // })

  // }
  

  filteredReqByBlood(id:any){
    // console.log(this.bloodform.value.blood_id)
    console.log(id)
  //   this.service.filterblood()
  //   .subscribe({
  //     next: (res)=>{
      
  //       this.patients = res.data;
  
  //       console.log(this.patients[0].blood_type)
  
  //       },error:(error)=>{
  //         console.log(error)
  //       }
  //   })
  }


  // showform(){
  //   if(this.display==true){
  //     this.display = false;
  //   }else{
  //     this.display=true;
  //   }
  // }
  // fuc. to hide user when click on donate
  // showreq(){
  //   this.donate=true
  // }



  


}