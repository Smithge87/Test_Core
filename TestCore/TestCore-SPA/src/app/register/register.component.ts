import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //catches input passed from parent component
  @Input() valuesFromHome: any;
  //sends outgoing info to parent component
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor() { }

  ngOnInit() {
  }
  register(){
    console.log(this.model);
  }
  cancel(){
    console.log('cancel was clicked');
    this.cancelRegister.emit(false);
  }
}
