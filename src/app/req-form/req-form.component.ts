import { Component } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
@Component({
  selector: 'app-req-form',
  templateUrl: './req-form.component.html',
  styleUrls: ['./req-form.component.css']
})
export class ReqFormComponent {
  
  receiver:string = '';
  pname:string= '';
  date:Date= new Date();
  bloodtype:string= '';
  quantity:number = 0 ;
  pcase:string ='';
  address:string= '';

  constructor(private newReq: addRequestService){

  }

  addrequest(){
    this.newReq.addR(this.receiver, this.pname, this.date, this.bloodtype,this.quantity, this.pcase, this.address);
    console.log(this.newReq.patient);
  }
}
