import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import {Observable, map } from 'rxjs';
import { reqAdd } from '../model/request'
import { Stock } from '../model/hospitalstock';
import { stockService } from '../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-hospital-stock',
  templateUrl: './hospital-stock.component.html',
  styleUrls: ['./hospital-stock.component.css']
})
export class HospitalStockComponent {
  display:boolean =true;
  donate:boolean =false;

  enableEdit = false;
  enableEditIndex = null;
  stock?: Stock[];
  id!: any;
  onupdate: boolean = false;
  deletedata = {bid: '', hid: ''};
  updatedata = {bid: '', hid: '', qty: ''}
 


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

  form = new FormGroup({
    blood_type: new FormControl(null, Validators.required),
    blood_quantity: new FormControl(null, Validators.required),
    blood_id: new FormControl(null, Validators.required),
    hospital_id: new FormControl(null, Validators.required)
  });

  stockselected: Stock = {} as Stock;

  selectStock(stock: Stock){
    if(Object.keys(this.stockselected).length === 0) {
      this.stockselected = stock;
      this.form.patchValue({
        blood_quantity: stock.blood_quantity,
        blood_type: stock.blood_type,
        blood_id: stock.blood_id,
        hospital_id: stock.hospital_id
      })
    }
  }

  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }


  onupdatestock(){
    let index = this.stock.map(s => s.blood_id).indexOf(this.stockselected.blood_id);

    this.stock[index] = {
      blood_id: this.stockselected.blood_id,
      blood_type: this.stockselected.blood_type,
      blood_quantity: this.stockselected.blood_quantity,
      hospital_id: this.stockselected.hospital_id
    };

    console.log(this.stock[index]);

    this.service.updatestock(this.stock[index]).subscribe((res: any) => {
      console.log(res);
    }) 

    this.stockselected = {} as Stock;
    this.form.reset();

    this.updatedata.hid = this.id;
    this.updatedata.bid = this.form.value.blood_id;
    this.updatedata.qty = this.form.value.blood_quantity;



    this.enableEdit = false;
  }


  showform(){
    if(this.display==true){
      this.display = false;
    }else{
      this.display=true;
    }
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

  

}
