import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import {Observable, map } from 'rxjs';
import { reqAdd } from '../model/request'
import { Stock } from '../model/hospitalstock';
import { stockService } from '../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hospital-stock',
  templateUrl: './hospital-stock.component.html',
  styleUrls: ['./hospital-stock.component.css']
})
export class HospitalStockComponent {
  display:boolean =true;
  donate:boolean =false;
  stock?: Stock[];
  id!: number;
  onupdate: boolean = false;
  patients: reqAdd[]=[];

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
      const stockdata = res.data[0];
      if (stockdata) {
        localStorage.setItem('stockdata', JSON.stringify(stockdata));
      }
      console.log(res.data[0]);
  });

  }

  update(){
    this.onupdate = true;
  }

  onupdatestock(){
    console.log(this.stock[0]);
    this.service.updatestock(this.id, this.stock[0].blood_quantity).subscribe((res: any) => {
      console.log('updated successfully!');
      console.log(res);
    }) }

}
