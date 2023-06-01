import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { reqAdd } from '../model/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  display:boolean =true;
  donate:boolean =false;

  patients?: reqAdd[];
  constructor(
    private http : HttpClient,
    private addReq:addRequestService){}

  ngOnInit(){
  this. fetch();


  }
  private fetch(){

    this.addReq.retriveAllReq()
    .subscribe({
     next: (res)=>{
      
      this.patients = res.data;

      console.log(this.patients[0].blood_type)

      },error:(error)=>{
        console.log(error)
      }
    })
    
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
