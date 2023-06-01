import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { reqAdd } from '../model/request';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private service: addRequestService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
  this.id = this.route.snapshot.params['user_id'];
  this. fetch();


  }
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
