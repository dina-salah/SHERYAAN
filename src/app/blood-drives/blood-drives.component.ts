import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/events.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { map, Observable, Subscription, Subscriber } from 'rxjs';


@Component({
  selector: 'app-blood-drives',
  templateUrl: './blood-drives.component.html',
  styleUrls: ['./blood-drives.component.css']
})
export class BloodDrivesComponent implements OnInit{

  blood_drives: any[];

  constructor(private service: EventService){}

  ngOnInit(){
    this.fetch();
  }

  fetch(){
    this.service.allevents().subscribe((res: any) => {
      this.blood_drives = res.data;
      console.log(res);
    })
  }
 

}
