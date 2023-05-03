import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospital-stock-form',
  templateUrl: './hospital-stock-form.component.html',
  styleUrls: ['./hospital-stock-form.component.css']
})
export class HospitalStockFormComponent {
  // receiver:string = '';
  // pname:string= '';
  // pcase:string ='';

  date:Date= new Date();
  bloodtype:string= '';
  quantity:number = 0 ;
  address:string= '';

  constructor(private newReq: addRequestService, private http : HttpClient,private toastr: ToastrService, private _router: Router){

  }

  ngOnInit(){
  

  }
addToStock(){

}

  // addrequest(){
  //   this.newReq.addR(this.receiver, this.pname, this.date, this.bloodtype,this.quantity, this.pcase, this.address);
  //   console.log(this.newReq.patient);
  // }

  onStockadd(stock:{ date:Date, bloodtype:string, quantity:string, address:string }){
    this.http.post('https://sheryaanang-default-rtdb.firebaseio.com/products.json',stock)
    .subscribe((res)=>{
      console.log(res)
    });

    this.toastr.success('Product has been added!');

    this._router.navigate(['/hospital-stock']);
    
  }

}
