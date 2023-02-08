import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  displaySearch:boolean= true

  clickSearch(){
    if(this.displaySearch != false){
      this.displaySearch =false
    }else{
      this.displaySearch =true
    }
    // console.log( this.displaySearch)
    return this.displaySearch
  }
}
