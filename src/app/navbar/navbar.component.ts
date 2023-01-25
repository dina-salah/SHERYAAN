import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
