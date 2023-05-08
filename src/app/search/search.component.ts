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
hospitalList :any[]

constructor(private searchservice:search ){
}

ngOnInit(): void {
}


searchFunc(searchValue: string) {
this.searchservice.getStock(searchValue)
  .subscribe((res)=>{
    this.hospitalList = res.data;
    console.log(res)
  })
}
}
