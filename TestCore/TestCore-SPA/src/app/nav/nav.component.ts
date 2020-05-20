import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login(){
    // used to do this...
    //console.log(this.model);
    // now passes the model to hte auth component for processing and handback
    this.authService.login(this.model).subscribe(next => {
        console.log('Logged in successfully');
      }, error => {
        console.log('Failed to log in');
      });
  }
  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }
  logOut(){
    localStorage.removeItem('token');
    console.log('Logged out');
  }

}
