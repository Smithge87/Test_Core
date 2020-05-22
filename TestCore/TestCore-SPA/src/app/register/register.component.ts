import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //catches input passed from parent component
  @Input() valuesFromHome: any;
  //sends outgoing info to parent component
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}
  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('Registration successful');
        this.alertify.success('Registration was successful');
      },
      (error) => {
        console.log(error);
        this.alertify.error(error);
      }
    );
  }
  cancel() {
    console.log('cancel was clicked');
    this.cancelRegister.emit(false);
  }
}
