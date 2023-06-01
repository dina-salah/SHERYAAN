import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-req-form-hospital',
  templateUrl: './req-form-hospital.component.html',
  styleUrls: ['./req-form-hospital.component.css']
})
export class ReqFormHospitalComponent  implements OnInit  {
  // receiver:string = '';
  // pname:string= '';
  // date:Date= new Date();
  // bloodtype:string= '';
  // quantity:number =0;
  // pcase:string ='';
  // address:string= '';

  // constructor(private newReq: addRequestService, private http : HttpClient,private toastr: ToastrService, private _router: Router){

  // }

  ngOnInit(){
  

  }


  // addrequest(){
  //   this.newReq.addR(this.receiver, this.pname, this.date, this.bloodtype,this.quantity, this.pcase, this.address);
  //   console.log(this.newReq.patient);
  // }

  // onReqAdd(req:{receiver:string, name:string, date:Date, bloodtype:string, quantity:string, pcase:string, address:string }){
  //   this.http.post('https://sheryaanang-default-rtdb.firebaseio.com/products.json',req)
  //   .subscribe((res)=>{
  //     console.log(res)
  //   });

  //   this.toastr.success('Your request has been added!');

  //   this._router.navigate(['/request']);
    
  // }

}
