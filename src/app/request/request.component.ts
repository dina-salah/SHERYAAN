import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  display:boolean =true;
  donate:boolean =false;

  patients: {receiver:string, pname:string, date:any ,bloodtype:string ,quantity:number,pcase:string,address:string}[]=[];
  constructor(private newReq:addRequestService){}

  ngOnInit(){
  this.patients = this.newReq.patient;
  }

  showform(){
    if(this.display==true){
      this.display = false;
    }else{
      this.display=true;
    }
  }
  // fuc. to hide user when click on donate
  showreq(){
    this.donate=true
  }

}
