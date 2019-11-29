import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private mail = '' ;
  private password =''
  constructor(public router: Router) { }

  login(){
    if((this.mail == 'super@user.com') && (this.password == '0123456789')){
      this.router.navigate(['admin']);
    }
  }

  ngOnInit() {
  }

}
