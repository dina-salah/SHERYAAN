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

  constructor(private service:EventService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['organization_id']; 
  }

  form =  new FormGroup({
    event_startDate: new FormControl('', Validators.required),
    event_endDate: new FormControl('', Validators.required),
    event_address:new FormControl('', Validators.required),
  })

  add(){
    this.service.newevent(this.form.value).subscribe((res) => {
      console.log(res);
      this.toastr.success('event added!');
    })
  
  }

  
}
