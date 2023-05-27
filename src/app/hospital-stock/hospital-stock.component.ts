import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import {Observable, map } from 'rxjs';
import { reqAdd } from '../model/request'
import { Stock } from '../model/hospitalstock';
import { Blood } from '../model/hospitalstock';
import { stockService } from '../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-stock',
  templateUrl: './hospital-stock.component.html',
  styleUrls: ['./hospital-stock.component.css']
})
export class HospitalStockComponent {
  display:boolean =true;
  donate:boolean =false;
  stock?: Stock[];
  id!: any;
  onupdate: boolean = false;
  deletedata = {bid: '', hid: ''};
  updatedata = {bid: '', hid: '', qty: ''};
 


  constructor(private http : HttpClient,
    private service: stockService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this. fetch();
    this.stock = JSON.parse(localStorage.getItem('stockdata'));
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

  fetch(){
    this.service.fetch(this.id).subscribe((res) => {
      this.stock = res.data;
      const stockdata = res.data;
      if (stockdata) {
        localStorage.setItem('stockdata', JSON.stringify(stockdata));
      }
      console.log(this.stock);
  });

}

  delete(d: any){
    this.deletedata.hid = this.id;
    this.deletedata.bid = d;
    console.log(this.deletedata);
    this.service.delete(this.deletedata).subscribe((res) => {
      console.log(res);
    })
  }

  update(){
    this.onupdate = true;
  }

  onupdatestock(u: any){
    console.log(this.stock);
    this.updatedata.hid = this.id;
    this.updatedata.bid = u;
    console.log(this.updatedata);
    this.service.updatestock(this.updatedata).subscribe((res: any) => {
      console.log(res);
    }) 
    this.onupdate = false;
  }


}
