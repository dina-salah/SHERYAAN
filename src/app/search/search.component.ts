import { Component, Input, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { search } from '../services/search.service';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit{
@Input() display:any;

constructor(private searchservice:search ){
  this.searchservice.getStock('search')
  .subscribe((v)=>{
    console.log(v)
  }
  )
}
ngOnInit(): void {
}

searchform : FormGroup = new FormGroup ({
  search : new FormControl('')
})



public hospitalList : Array<any> =[]

// constructor(private searchservice:search ){
//   this.searchform.get('search').valueChanges
//   .pipe(
//     debounceTime(1000),
//     distinctUntilChanged(),
//     switchMap((v)=>this.searchservice.getStock(v)),
//   )
//   .subscribe(
//     (v)=>{
//       // hospital stock that value must be passed from html file
//       this.hospitalList= v?.hospitalstock;
//     }
//   )
// }

}
