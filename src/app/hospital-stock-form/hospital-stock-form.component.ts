import { Component, OnInit } from '@angular/core';
import { addRequestService } from '../services/addRequest.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { stockService } from '../services/stock.service';
import { Stock } from '../model/hospitalstock';
import { Blood } from '../model/hospitalstock';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-hospital-stock-form',
  templateUrl: './hospital-stock-form.component.html',
  styleUrls: ['./hospital-stock-form.component.css']
})
export class HospitalStockFormComponent {
 
  blood: Blood[];
  id: any;
  stock = {bid: '', bquantity: '', hid: ''};

  constructor(private service: stockService, private http : HttpClient,private toastr: ToastrService, private _router: Router, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.id = this.route.snapshot.params['hospital_id'];
    this.service.getblood().subscribe((res) => {
      this.blood = res.data;
      console.log(res);
    })

  }


  form = new FormGroup({
    blood_type: new FormControl(null, Validators.required),
    blood_quantity: new FormControl(null, Validators.required),
  });

 

  addstock(){
    this.stock.bid = this.form.value.blood_type;
    this.stock.bquantity = this.form.value.blood_quantity;
    this.stock.hid = this.id;

    this.service.addstock(this.stock).subscribe(res => {
      console.log(res);
    })

  }
  


}
