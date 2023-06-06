import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City,reqAdd } from '../model/request';
import { addRequestService } from '../services/addRequest.service';

@Component({
  selector: 'app-donate-now',
  templateUrl: './donate-now.component.html',
  styleUrls: ['./donate-now.component.css']
})
export class DonateNowComponent implements OnInit{
  patients?: reqAdd[];



constructor(private service: addRequestService){}

ngOnInit(){

  this.service.retriveAllReq()
  .subscribe({
   next: (res)=>{
    this.patients = res.data;
    console.log(this.patients);
    },error:(error)=>{
      console.log(error)
    }
  })
}
  // onDonate(p: any){
  //   this.donatedata.request_id = p.request_id;
  //   this.donatedata.user_id = JSON.parse(this.id);
  //   console.log(this.donatedata)
  //   this.service.donate(this.donatedata).subscribe((res) => {
  //     console.log(res);
  //   })
  // }

}
