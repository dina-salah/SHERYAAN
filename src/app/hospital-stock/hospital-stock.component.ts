import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import {Observable, map} from 'rxjs';
import { reqAdd } from '../model/request'
import { Stock } from '../model/hospitalstock';
import { stockService } from '../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {Hospital} from '../model/signupinfo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospital-stock',
  templateUrl: './hospital-stock.component.html',
  styleUrls: ['./hospital-stock.component.css']
})
export class HospitalStockComponent {

  stock?: any[];
  status?: any;
  id!: any;
  hospital?: Hospital[];
  deletedata = {bid: '', hid: ''};
  updatedata = {bid: '', hid: '', qty: ''}
 

  constructor(
    private toastr: ToastrService, 
    private http : HttpClient,
    private service: stockService,
    private router: Router,
    private route: ActivatedRoute
    ){}

    
  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this. fetch();
    this.stock = JSON.parse(localStorage.getItem('stockdata'));
    this.hospital = JSON.parse(localStorage.getItem('hospitaldata'));

  }


  fetch(){
    this.service.fetch(this.id).subscribe((res) => {
      this.stock = res.data.map(item => ({...item, isEditing: false}));

      const stockdata = res.data;
      if (stockdata) {
        localStorage.setItem('stockdata', JSON.stringify(stockdata));
      }
      console.log(this.stock);
  },
  (error) => {
    console.error(error); 
  });
}

editItem(item : any) {
  item.isEditing = !item.isEditing;
 // console.log(item);
}

updateItem(item: any) {
  this.updatedata.hid = item.hospital_id;
  this.updatedata.bid = item.blood_id;
  this.updatedata.qty = item.blood_quantity;
  console.log(this.updatedata);
  this.service.updatestock(this.updatedata)
 .subscribe(
   res => {
     console.log(res);
     item.isEditing = false;
     this.toastr.success('Update successeded!');
   },
   error => {
     console.log('Error occurred while updating item');
     console.log(error);
     this.toastr.warning('Error occurred while updating item');
     // Handle the error case as per your requirement
   }
 );
}


  delete(item: any){
    this.deletedata.hid = item.hospital_id;
    this.deletedata.bid = item.blood_id;
    console.log(this.deletedata);
    this.service.delete(this.deletedata)
    .subscribe(
      res => {
        console.log(res);
        item.isEditing = false;
        this.toastr.success('Item is deleted');
        window.location.reload();
      },
      error => {
        console.log(error);
        this.toastr.warning('Error occurred while deleting item');
        // Handle the error case as per your requirement
      }
    );
  }

}
