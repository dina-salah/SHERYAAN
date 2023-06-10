import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{

  id: any;
  data= {event_startDate: '', event_endDate: '', event_address: '', org_id: '', location_code: ''};
  locs: any[];

  constructor(private service:EventService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['organization_id']; 
    this.fetchlocs();
  }

  fetchlocs(){
    this.service.locations().subscribe((res) => {
      this.locs = res.data;
      console.log(res);
    })
  }

  form =  new FormGroup({
    event_startDate: new FormControl('', Validators.required),
    event_endDate: new FormControl('', Validators.required),
    event_address:new FormControl('', Validators.required),
    city:new FormControl('', Validators.required),
  })

  add(){
    this.data.org_id = this.id;
    this.data.event_startDate = this.form.value.event_startDate;
    this.data.event_endDate = this.form.value.event_endDate;
    this.data.event_address = this.form.value.event_address;
    this.data.location_code = this.form.value.city;
    this.service.newevent(this.data).subscribe((res) => {
      console.log(res);
      this.toastr.success('event added!'); 
    })
  
  }

  
}
