import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService) { }
  ngOnInit() {
  }
  login(){
    // used to do this...
    //console.log(this.model);
    // now passes the model to hte auth component for processing and handback
    this.authService.login(this.model).subscribe(next => {
        console.log('Logged in successfully');
        this.alertify.success('Logged in Successfully');
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  logOut(){
    localStorage.removeItem('token');
    console.log('Logged out');
    this.alertify.message('Logged out Successfully');
  }

}
