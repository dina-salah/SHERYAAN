import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { reqAdd } from '../model/request';

@Component({
  selector: 'app-request-hospital',
  templateUrl: './request-hospital.component.html',
  styleUrls: ['./request-hospital.component.css']
})
export class RequestHospitalComponent implements OnInit {
  display:boolean =true;
  donate:boolean =false;

  patients: reqAdd[]=[];
  constructor(private http : HttpClient){}

  ngOnInit(){
  this. fetch();
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

  private fetch(){
    this.http.get('https://sheryaanang-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res: {[key:string]:reqAdd})=>{
      const requestTable =[];
      for(const key in res){
        if(res.hasOwnProperty(key)){
        requestTable.push({...res[key],id:key})}
      }
    
    return requestTable;
  }
  )).subscribe((requestTable)=>
  {
    console.log(requestTable)
    this.patients=requestTable;
  })
  }

}
